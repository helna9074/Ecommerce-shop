import React, { useEffect, useRef } from 'react'

import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/Apipaths';
import Input from '../../Components/Inputs/Admininput';
import useCartStore from '../../Store/Cartstore';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import useAuthstore from '../../Store/Authstore';
import cartImg from '../../../Assets/Cards/cartimg.webp'
import { getFinalPrice, Shipping } from '../../Utils/helper';


const Cart=()=>{
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);


const cartItems = useCartStore((s) => s.cartItems);
  const setCart = useCartStore((s) => s.setCart);
  const addToCart = useCartStore((s) => s.addToCart);
  const decreaseQty = useCartStore((s) => s.decreaseQty);
  const cartCount =cartItems.length;
  const {isAuthenticated}=useAuthstore()

  
const navigate=useNavigate()
const hasFetchedRef = useRef(false);
  // debounce timer ref
 
  const debounceRef = useRef(null);

  /* ---------------- GET CART (DB → ZUSTAND) ---------------- */
  const FetchCartItems = async () => {
    console.log(isAuthenticated)
      if(!isAuthenticated) return;
    try {
      const { data } = await axiosInstance.get(API_PATHS.Cart.getItems);

     console.log(data.items,'this is the normalized')
      setCart(data.items);
     hasFetchedRef.current = true; 
     
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(!isAuthenticated) return;
    FetchCartItems();
  }, []);

  /* ---------------- DEBOUNCED SYNC (ZUSTAND → DB) ---------------- */
  useEffect(() => {
     if(!hasFetchedRef.current) return;
   
  

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        await axiosInstance.patch(API_PATHS.Cart.updateItems, {
          cartItems,
        });
        console.log("Cart synced to DB");
      } catch (err) {
        console.log(err);
      }
    }, 500); // 500ms debounce
  }, [cartItems]);
  const RemoveCart=async(productId,size)=>{
    try{
    const{data}=await axiosInstance.delete(API_PATHS.Cart.removeItem(productId),{data:{size}})
    if(data){
      useCartStore.getState().removeFromCart(productId,size)
    }
  }catch(err){
    console.log(err)
  }

  }
 let subtotalBeforeDiscount = 0;
let subtotalAfterDiscount = 0;
let totalDiscount = 0;

cartItems.forEach((i) => {
  const { finalPrice, discount } = getFinalPrice(i.product);

  subtotalBeforeDiscount += i.product.amount * i.quantity;
  subtotalAfterDiscount += finalPrice * i.quantity;
  totalDiscount += discount * i.quantity;
});

const shippingCharge = Shipping(cartItems, subtotalAfterDiscount);

  return (
    
    <div className='w-full'>
      {!isAuthenticated&&(
        <div className='flex flex-col gap-3 p-8 text-center justify-center items-center'>
          <img src={cartImg} alt="Empty cart" className='w-32 h-32 object-contain'/>
          
            <div className='flex flex-col gap-5'>
              <p>Missing Cart Items?</p>
           <p className='text-sm'>Login to see the items you added previeously</p>
           <button className='btn-secondary w-20 mx-auto' onClick={()=>navigate('/login')} >Login</button>
              </div>
              </div>
          )}
          {cartCount===0&&isAuthenticated&&(
             <div className='flex flex-col gap-3 p-8 text-center justify-center items-center'>
          <img src={cartImg} alt="Empty cart" className='w-32 h-32 object-contain'/>
            <div className='flex flex-col gap-5'>
            <p>Cart is Empty</p>
            <p>Add more Items into Carts</p>
            <button className='btn-secondary'>Shops</button>
            </div>
            </div>
          )}
          
           
          
           
          
      {cartCount!==0&&isAuthenticated&&(
<div className='my-9 w-full '>
        <p className=' text-xs font-light text-slate-300 gap-2 my-10  lg:mx-45 mx-10'>Home / <span className='text-black'>Cart</span></p>
           <div className=' text-sm w-[75%] mx-auto flex flex-col gap-3 '>
           <div className='grid grid-cols-4  py-3 border-b text-sm'>
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p className='text-right'>Subtotal</p>
           </div>
              {cartItems.map((i,index)=>(
           <div key={`${i.productId}-${i.size}`} className='grid grid-cols-4   text-sm py-3 border-b'>
            <div className='flex gap-1 items-center relative'>
                  <img src={i.product?.img?.[0]?.url} alt="product-img" className='w-10 h-10'/>
                    <p className='truncate w-32'>{i.product?.name||"Loading...."}</p>
                    <IoMdClose className='absolute -top-2 -left-2  rounded-full bg-red-500' onClick={()=>RemoveCart(i.productId,i.size)}/>
            </div>
               <p className='text-center flex'>{i.product?.amount??0}</p>
               <div className='flex items-center lg:gap:3 gap-1 lg:w-15 w-10 h-10 lg:p-2 p-1 border border-gray-400'>
                <p>{i.quantity}</p>
               <div className="flex flex-col">
    {/* INCREASE */}
  <button
  disabled={i.quantity >= i.maxStock}
  onClick={() =>
    addToCart({
      productId: i.productId,
      product: i.product,
      size: i.size,
      quantity: 1,
      maxStock: i.maxStock,
    })
  }
  className="disabled:opacity-40"
>
  <FaAngleUp />
</button>


    {/* DECREASE */}
    <button
      type="button"
     
       onClick={() => decreaseQty(i.productId, i.size)}
                  disabled={i.quantity === 1}
                  className="disabled:opacity-40"
                >
        
      <FaAngleDown className="lg:text-sm text-xs" />
    </button>
  </div>
                 
               </div>
               <p className='text-right'>₹{(i.product?.amount??0) * i.quantity}</p>
           </div>
            ))} 
           
           <div className='flex justify-between w-full'>
            <button type='button' className='btn-normal' onClick={()=>navigate('/')}>Return to Shop</button>
            <button type="button" className='btn-normal'>Update Cart</button>
           </div>
       
        
       
      
      <div className='flex  w-full lg:flex-row flex-col gap-2'>
        
          <div className='flex  h-15 '>
             <Input type='text' className='px-6 border h-10 w-48 border-black' placeholder="Coupon Code">Coupon Code</Input>
            <button type="button" className='px-4 w-44 h-10 border btn-secondary rounded-sm '>Apply Coupon</button>
          </div>
             
          <div className='p-5 border lg:w-1/3 w-full border-black ms-auto '>
            <div className='flex gap-3 flex-col'>
               <h5 className='text-2xl'>Cart Total</h5> 
               <div className='flex justify-between'>
                <p>Subtotal</p>
               <p>${subtotalBeforeDiscount}</p> 
              
               </div>
               {totalDiscount > 0 && (
                <div className="flex justify-between border-b border-green-400 p-2 text-green-600">
                  <p>Discount</p>
                  <p>- ₹{totalDiscount}</p>
                </div>
              )}
               <div className='flex justify-between'>
                <p>Shipping</p>
               <p>{shippingCharge === 0 ? "Free" : `₹${shippingCharge}`}</p>
               </div>
               <div className='flex justify-between'>
                <p>Total</p>
               <p>{subtotalAfterDiscount}</p>
               </div>
               <button onClick={()=>navigate("/checkout?source=CART")} type="button" className='btn-secondary rounded-sm'>Procees to checkout</button>
            </div>
          </div>
          </div>
          </div>
      </div>
      )}
        
      
          
    
    </div>
  )

}
export default Cart
