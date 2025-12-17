import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Cimg from '../../Assets/Cards/Cimg.png'
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import Footer from '../Components/Footer';
import axiosInstance from '../Utils/axiosInstance';
import { API_PATHS } from '../Utils/Apipaths';
const Cart = () => {
  useEffect(()=>{
   const {data}= axiosInstance.get(API_PATHS.Authuser.Details)
   console.log(data)
  })
  return (
    <div className='h-full w-full'>
        
      <div className='my-9 w-full'>
        <p className=' text-xs font-light text-slate-300 gap-2 my-10  lg:mx-45 mx-10'>Home / <span className='text-black'>Cart</span></p>
           <div className=' text-sm w-[75%] mx-auto flex flex-col gap-3 '>
           <div className='grid grid-cols-4  py-3 border-b text-sm'>
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p className='text-right'>Subtotal</p>
           </div>
           <div className='grid grid-cols-4   text-sm py-3 border-b'>
            <div className='flex gap-1 items-center flex-wrap'>
                  <img src={Cimg} alt="product-img" className='w-10 h-10'/>
                    <p>something</p>
            </div>
               <p className='text-center'>$650</p>
               <div className='flex items-center lg:gap:3 gap-1 lg:w-15 w-10 h-10 lg:p-2 p-1 border border-gray-400'>
                <p>01</p>
                <div>
                     <FaAngleUp className='lg:text-sm text-xs'/>
                 <FaAngleDown className='lg:text-sm text-xs'/>
                </div>
                 
               </div>
               <p className='text-right'>$650</p>
           </div>
            <div className='grid grid-cols-4   text-sm py-3 border-b flex-wrap'>
            <div className='flex gap-1  items-center'>
                  <img src={Cimg} alt="product-img" className='w-10 h-10'/>

            </div>
               <p className='text-center'>$650</p>
               <div className='flex items-center lg:gap-3 gap-1 lg:w-15 w-10 h-10 lg:p-2 p-1 border border-gray-400'>
                <p className=''>01</p>
                <div>
                     <FaAngleUp className='lg:text-sm text-xs'/>
                 <FaAngleDown className='lg:text-sm text-xs'/>
                </div>
               </div>
               <p className='text-right'>$650</p>
           </div>
           <div className='flex justify-between w-full'>
            <button type='button' className='p-4 border border-black'>Return to Shop</button>
            <button type="button" className='p-4 border border-black'>Update Cart</button>
           </div>
       
        
       
      
      <div className='flex  w-full lg:flex-row flex-col gap-2'>
        
          <div className='flex gap-1 h-15 flex-wrap'>
             <button type='button' className='p-4 border border-black'>Return to Shop</button>
            <button type="button" className='p-4 border border-black'>Update Cart</button>
          </div>
             
          <div className='p-5 border lg:w-1/3 w-full border-black ms-auto '>
            <div className='flex gap-3 flex-col'>
               <h5>Cart Total</h5>
               <div className='flex justify-between'>
                <p>Subtotal</p>
               <p>$170</p>
               </div>
               <div className='flex justify-between'>
                <p>Subtotal</p>
               <p>$170</p>
               </div>
               <div className='flex justify-between'>
                <p>Subtotal</p>
               <p>$170</p>
               </div>
               <button type="button" className='btn-primary'>Procees to checkout</button>
            </div>
          </div>
          </div>
          </div>
      </div>
    
    </div>
  )
}

export default Cart
