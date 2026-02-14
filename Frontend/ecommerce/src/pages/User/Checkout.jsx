import React, { useEffect, useState } from "react";
import Input from "../../Components/Inputs/Admininput";
import { LiaStarOfLifeSolid } from "react-icons/lia";
import Img1 from "../../../Assets/Cards/Newp1.png";
import BankImg from "../../../Assets/Cards/bank.png";
import Radiobtn from "../../Components/UI/Radiobtn";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/Apipaths";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useCartStore from "../../Store/Cartstore";
import * as yup from "yup";
 import { useMemo } from "react";
import {
  getFinalPrice,
  loadRazorpay,
  Shipping,
} from "../../Utils/helper";
import Addressform from "../../Components/UI/Addressform";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";



const Checkout = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);


const addressSchema = useMemo(() => {
  return yup.object({
    paymentMethod: yup
      .string()
      .required("Please select a payment method"),

    firstname: yup.string().when("$showAddressForm", {
      is: true,
      then: (schema) => schema.required("First name required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    street: yup.string().when("$showAddressForm", {
      is: true,
      then: (schema) => schema.required("Street required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    city: yup.string().when("$showAddressForm", {
      is: true,
      then: (schema) => schema.required("City required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    phone: yup.string().when("$showAddressForm", {
      is: true,
      then: (schema) =>
        schema
          .required("Phone number is required")
          .matches(/^[6-9]\d{9}$/, "Enter a valid phone number"),
      otherwise: (schema) => schema.notRequired(),
    }),

    email: yup.string().when("$showAddressForm", {
      is: true,
      then: (schema) =>
        schema.email("Invalid email").required("Email required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
}, [showAddressForm]);

  const [items, setItems] = useState([]);
  const form=useForm({resolver:yupResolver(addressSchema),context:{showAddressForm}});
  const { register, handleSubmit,formState:{errors} } =form;
 const [addresses, setAddresses] = useState([]);
const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [showAllAddresses, setShowAllAddresses] = useState(false);

  const clearCart = useCartStore((s) => s.clearCart);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (source) {
      GetcheckoutItem();
      fetchAddress();
    }
   
    console.log(selectedAddressId,"this is the selected address id");
  }, [source]);
  

  const GetcheckoutItem = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${API_PATHS.Cart.checkoutItem}?source=${source}`
      );
      console.log(data);
      if (data) {
        setItems(data.items);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAddress = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.Address.getAddress);
      console.log(data,"this is the address data")
      const list=data.addressess||[]
        setAddresses(list)
        if (list.length === 0) {
      // New user → show form
      setShowAddressForm(true);
    } else {
      // Existing user → show saved addresses
      setShowAddressForm(false);
    }
        const defaultAddr=data.addressess?.find(a=>a.isDefault)
        if(defaultAddr){
          setSelectedAddressId(defaultAddr._id)
        }
      
    } catch (err) {
      console.log(err);
    }
  };

  let subtotalBeforeDiscount = 0;
  let totalDiscount = 0;
  let subtotalAfterDiscount = 0;

  items.forEach((i) => {
    const { finalPrice, discount } = getFinalPrice(i.product);

    subtotalBeforeDiscount += i.product.amount * i.quantity;
    totalDiscount += discount * i.quantity;
    subtotalAfterDiscount += finalPrice * i.quantity;
  });

  const shippingCharge = Shipping(items, subtotalAfterDiscount);
  const finalTotal = subtotalAfterDiscount + shippingCharge;

   const selectedAddress = addresses.find(
  a => a._id === selectedAddressId
);
  const onSubmit = async (formData) => {
    console.log("getted here")
    console.log("this is the address",formData)
  
   

    console.log(formData);

    const orderpayload = {
      paymentMethod: formData.paymentMethod,
  saveAddress: formData.issaveaddress,
  addressId: !showAddressForm ? selectedAddressId : null,
  address: showAddressForm
     ?{
        firstName: formData.firstname,
        lastName: formData.lastname,
        companyName: formData.companyname,
        street: formData.street,
        apartment: formData.apartment,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
      }:
      null
     
    };
    try {
      if (formData.paymentMethod === "COD") {
        const { data } = await axiosInstance.post(
          API_PATHS.Order.placeorder,
          orderpayload
        );
         if (data.order) {
        
    toast.success("Order placed successfully");
   
    if (source === "CART") {
      clearCart();
      localStorage.removeItem("cart-storage");
    } else {
      const cartRes = await axiosInstance.get(API_PATHS.Cart.getItems);
      useCartStore.getState().setCart(cartRes.data.items);
    }
  
    navigate("/account/myorders",{replace:true});
        return;
  }
      }

      if (formData.paymentMethod === "BANK") {
        const { data } = await axiosInstance.post(API_PATHS.Order.onlineOrder);
        const options = {
          key: data.key,
          amount: data.amount,
          currency: "INR",
          name: "Exclusive",
          description: "Pay for you Order",
          order_id: data.razorpayOrderId,
          handler: async function (response) {
            try {
              const orderRes = await axiosInstance.post(
                API_PATHS.Order.placeorder,
                {
                  ...orderpayload,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }
              );
              toast.success("Order placed successfully");
              console.log(orderRes)
              if (source === "CART") {
                clearCart();
                localStorage.removeItem("cart-storage");
              } else {
                const cartRes = await axiosInstance.get(
                  API_PATHS.Cart.getItems
                );
                useCartStore.getState().setCart(cartRes.data.items);
              }

              navigate("/account/myorders",{replace:true});
            } catch (err) {
              console.log(err);
              alert("order placement failed");
            }
          },
         prefill: {
  name: showAddressForm
    ? formData.name
    : selectedAddress?.address.firstName,
  email: showAddressForm
    ? formData.email
    : selectedAddress?.address.email,
  contact: showAddressForm
    ? formData.phonenumber
    : selectedAddress?.address.phone,
},


          theme: { color: "#000" },
        };
        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
          alert("Razorpay SDK failed to load");
          return;
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
        return;
      }
    } catch (err) {
      console.log(err);
      alert("something went wrong");
    }
  };
 const visibleAddresses = showAllAddresses
    ? addresses
    : addresses.slice(0, 1);

   

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="w-[82%] p-5 ">
        <p className="text-slate-400 my-5 text-sm">view Cart/Checkout</p>
        <h2 className="text-4xl  mb-5 text-start">Billing Details</h2>
       
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex justify-between"
        >
           <div className="w-sm">

            {/* ===== SAVED ADDRESSES ===== */}
            {addresses.length > 0 && !showAddressForm && (
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">Select Address</h3>

                {visibleAddresses.map((addr) => (
                  <div
                    key={addr._id}
                    className={`border p-3 cursor-pointer ${
                      selectedAddressId === addr._id
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedAddressId(addr._id)}
                  >
                    {addresses.length > 1 && (
                  <button
                    type="button"
                    className="text-xs flex ms-auto text-blue-400"
                    onClick={(e) =>{
                      e.stopPropagation();
                       setShowAllAddresses(!showAllAddresses)}}
                  >
                    {showAllAddresses ? "Hide addresses" : "see more"}
                  </button>
                )}
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        
                        checked={selectedAddressId === addr._id}
                        onChange={() => setSelectedAddressId(addr._id)}
                      />
                      <div className="text-sm">
                        <p className="font-medium">
                          {addr.address.firstName}
                        </p>
                        <p>{addr.address.street}</p>
                        <p>{addr.address.city}</p>
                        <p>{addr.address.phone}</p>
                      </div>
                    </div>

                  </div>
                ))}

                

                <button
                  type="button"
                  className="btn-secondary w-fit"
                  onClick={() => {setShowAddressForm(true);setSelectedAddressId(null)}}
                >
                  + Add New Address
                </button>
              </div>
            )}
            {(addresses.length === 0 || showAddressForm) && (
              <div className="flex flex-col justify-center  gap-3">
                 <button
                    type="button"
                    className="text-xs flex ms-auto text-blue-400"
                    onClick={() => {setShowAddressForm(false) ;
                      if(addresses.length > 0){
                        setSelectedAddressId(addresses[0]._id)
                      }
                    }}
                  >
                  go back
                  </button>
              <Addressform
                register={register}
                isrequired={showAddressForm}
                errors={errors}
                showAddressForm={true}
              />
            </div>

            )}

            </div>

         
         
          <div className="flex w-xl flex-col gap-3 items-center justify-start mt-15 ">
            {items.map((i, index) => (
              <div
                key={index}
                className="flex gap-10  items-center w-sm me-auto justify-between"
              >
                <div className="flex gap-3  items-center">
                  <img
                    src={i.product?.img?.[0]?.url}
                    alt="product-img"
                    className="w-10 h-10"
                  />
                  <p className="truncate w-32">{i.product?.name}</p>
                </div>
                <p>${i.product?.amount * i.quantity}</p>
              </div>
            ))}

            <div className="flex gap-3 flex-col w-sm me-auto justify-between">
              <div className="flex justify-between border-b border-slate-400 p-2">
                <p>Subtotal</p>
                <p>${subtotalBeforeDiscount}</p>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between border-b border-green-400 p-2 text-green-600">
                  <p>Discount</p>
                  <p>- ₹{totalDiscount}</p>
                </div>
              )}

              <div className="flex justify-between border-b border-slate-400 p-2">
                <p>Shipping</p>
                <p>
                  {shippingCharge === 0 ? "Free delivery" : `${shippingCharge}`}
                </p>
              </div>
              <div className="flex justify-between p-2">
                <p>Total :</p>
                <p>{finalTotal}</p>
              </div>

              
              <div className="flex  p-2 justify-between">
                <Radiobtn
                  label="Bank"
                  register={register}
                  name="paymentMethod"
                  value="BANK"
                />
                <img
                  src={BankImg}
                  alt="banks"
                  className="w-1/2 object-contain"
                />
              </div>
              <div className="p-2">
                <Radiobtn
                  label="Cash on delivery"
                  register={register}
                  name="paymentMethod"
                  value="COD"
                />
              </div>
              {errors.paymentMethod&&(
                <p className="text-red-500 text-xs">{errors.paymentMethod.message}</p>)}
              {/* <div className="flex  h-15  p-2">
                <Input
                  type="text"
                  className="px-6 border h-10 w-48 border-black"
                  placeholder="Coupon Code"
                >
                  Coupon Code
                </Input>
                <button
                  type="button"
                  className="px-4 w-44 h-10 border btn-secondary rounded-sm "
                >
                  Apply Coupon
                </button>
              </div> */}
              <div className="p-2">
               

                <button
                  type="submit"
                  className="px-4 w-32 h-10 border btn-secondary rounded-sm "
                  disabled={!showAddressForm && !selectedAddressId}
                >
                  
                  Place Order
                </button>
              </div>
            </div>
          </div>
         
        </form>
      </div>
    </div>
  );
};

export default Checkout;
