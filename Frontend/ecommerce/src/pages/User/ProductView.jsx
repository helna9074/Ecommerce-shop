import React, { useEffect, useState } from 'react'
import Cimg from '../../../Assets/Cards/Cimg.png'
import { FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from 'react-icons/tb';
import ProductCart from '../../Components/Cards/ProductCard'
import { HiMiniArrowPath } from "react-icons/hi2";
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/Apipaths';
const ProductView = () => {
   const{id}=useParams()
   const[Product,setProduct]=useState(null)
   const[Quantity,setQuantity]=useState(1)
   const[selectedSize,setSelectedSize]=useState(null)
   useEffect(()=>{
      FetchProduct()
      
   },[])
   const FetchProduct=async()=>{
      try{
         const {data}=await axiosInstance.get(API_PATHS.Authuser.getOneProduct(id))
         console.log(data)
        if(data){
         setProduct(data.Product)
        }
      }catch(error){
        console.log(error)
      }
   }
   const Increase=()=>{
      if(!selectedSize) return
      if(Quantity<selectedSize.qty){
         setQuantity((prev)=>prev+1)
      }
   }
    const Decrease=()=>{
      if(Quantity>1){
         setQuantity((prev)=>prev-1)
      }
   }
  return (
   <div>
  {Product&&
<div className="w-full h-full">

      {/* Breadcrumb */}
      <p className="flex text-xs font-light text-slate-300 gap-2 my-10 lg:mx-40 mx-10">
        Account / Gaming
        <span className="text-black">{Product.name}</span>
      </p>

      {/* ================= GRID LAYOUT ================= */}
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[120px_1fr_1fr]
          gap-6
          lg:mx-40 mx-5
          min-h-[500px]
        "
      >
        {/* ===== LEFT: Thumbnails (Desktop) ===== */}
        <div className="hidden lg:flex flex-col justify-between h-full">
          {Product.img.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt=""
              className="w-full h-24 object-contain cursor-pointer"
            />
          ))}
        </div>

        {/* ===== CENTER: Main Image ===== */}
        <div className="flex items-center justify-center h-full">
          <img
            src={Product.img[0]?.url}
            alt=""
            className="max-h-[500px] w-full object-contain"
          />
        </div>
          {/* ===== Mobile Thumbnails ===== */}
      <div className="lg:hidden flex gap-4 my-6 mx-5 overflow-x-scroll">
        {Product.img.map((img, index) => (
          <img
            key={index}
            src={img.url}
            className="w-20 h-20 object-contain "
          />
        ))}
      </div>

        {/* ===== RIGHT: Product Details ===== */}
        <div className="flex flex-col justify-between h-full gap-4">

          <div>
            <h2 className="text-xl font-semibold">{Product.name}</h2>

            <div className="flex items-center gap-3 mt-2">
              <FaRegStar size={12} />
              <p className="text-xs text-slate-400">(150 Reviews)</p>
              <p className="text-xs text-green-500">In Stock</p>
            </div>

            <p className="text-2xl font-semibold my-3">${Product.amount}</p>

            <p className="text-sm border-b pb-3 text-slate-600">
              {Product.description}
            </p>

            {/* Colors */}
            <div className="flex items-center gap-2 mt-4">
              <p className="font-medium">Colours:</p>
              {Product.colors.map((color, i) => (
                <span key={i}>{color}</span>
              ))}
            </div>

            {/* Sizes */}
            <div className="flex items-center gap-3 mt-4">
              <p className="font-medium">Size:</p>
              <div className="flex gap-2 flex-wrap">
                {Product.sizes.map((size) => (
                  <button
                    key={size._id}
                    onClick={() => {
                      setSelectedSize(size);
                      setQuantity(1);
                    }}
                    className={`px-3 py-1 border text-sm
                      ${
                        selectedSize?.value === size.value
                          ? "bg-black text-white"
                          : "bg-white text-black border-slate-400"
                      }
                    `}
                  >
                    {size.value}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity + Actions */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-5">
              <div className="flex justify-between items-center w-32 h-8 border">
                <button
                  className="w-1/4 h-full border-r"
                  disabled={Quantity === 1}
                  onClick={Decrease}
                >
                  -
                </button>

                <p>{Quantity}</p>

                <button
                  className="w-1/4 h-full bg-red-500 text-white"
                  disabled={!selectedSize || Quantity === selectedSize?.qty}
                  onClick={Increase}
                >
                  +
                </button>
              </div>

              <button className="btn-primary px-10">Buy Now</button>
            </div>

            <Link
              to="/Signup"
              className="bg-black text-white px-5 py-2 text-center w-fit"
            >
              Add To Cart
            </Link>

            {/* Delivery */}
            <div className="flex flex-col items-start gap-4 mt-3">
               <div className='flex items-center gap-2'>
              <TbTruckDelivery size={22} />
              <div>
                <h3 className="font-semibold">
                  {Product.delivery?.freedelivery
                    ? "Free Delivery"
                    : "Cash Delivery Only"}
                </h3>
                <p className="text-xs underline">
                  Free delivery for orders over $140
                </p>
               
              </div>
              </div>
               <div className='flex items-start' >
                  {Product.delivery?.availreturn ?<div className='flex gap-2 text-sm'> <HiMiniArrowPath size={20}/><p>30days Return </p></div>:"NO Return"}
                </div>
            </div>
          </div>
        </div>
      </div>

    

      {/* Related Items */}
      <div className="my-10">
        <div className="flex items-center gap-3 lg:ms-40 ms-10">
          <div className="w-4 h-10 bg-[#DB4444] rounded"></div>
          <h4 className="text-[#DB4444] text-xs font-semibold">
            Related items
          </h4>
        </div>
        <ProductCart />
      </div>
    </div>
  }
  </div>
  )
}

export default ProductView
