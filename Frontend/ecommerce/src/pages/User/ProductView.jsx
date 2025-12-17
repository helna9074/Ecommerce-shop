import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Cimg from '../../../Assets/Cards/Cimg.png'

import { FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from 'react-icons/tb';
import ProductCart from '../../Components/Cards/ProductCard'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom';
const ProductView = () => {
  return (
    <div className='w-full h-full '>
       
        <p className='flex text-xs font-light text-slate-300 gap-2 my-10  lg:mx-45 mx-10  '>Account / Gaming<span className='text-black'>Havic HV G-92 Gamepad</span></p>
     <div className="flex flex-col lg:flex-row lg:my-20 my-10 lg:h-[450px] h-auto w-full justify-center lg:p-0 p-5 md:gap-5">
      
       <div className="lg:flex hidden lg:flex-col flex-row gap-4 lg:gap-5 w-full lg:w-auto justify-between items-center h-full">
  <img src={Cimg} className="w-25 h-20 object-cover" />
  <img src={Cimg} className="w-25 h-20 object-cover" />
  <img src={Cimg} className="w-25 h-20 object-cover" />
  <img src={Cimg} className="w-25 h-20 object-cover" />
</div>
        <div className="flex  justify-center items-center lg:w-[30%] w-full  h-full">
  <img src={Cimg} className="w-full max-w-[450px] h-full object-cover" />
</div>
   <div className="lg:hidden flex my-10  gap-4 w-full justify-center items-center">

  <img src={Cimg} className="w-20 h-20 object-cover" />
  <img src={Cimg} className="w-20 h-20 object-cover" />
  <img src={Cimg} className="w-20 h-20 object-cover" />
  <img src={Cimg} className="w-20 h-20 object-cover" />
</div>
       <div className="flex flex-col lg:w-[35%] w-full gap-2">
            <h2>somehtietoiht</h2>
            <div className='flex gap-5'>
            <FaRegStar size={10}/>
            <p className='text-xs font-light bg-slate-200  border-b border-slate-200'>(150 Reviews)</p>
            <p className='text-green-300 text-xs font-light'>In Stock</p>
            </div>
            <p className='text-2xl'>$ 192.00</p>
            <p className='text-sm mb-3 border-b border-slate-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum expedita minima eaque modi, quas, quaerat aspernatur pariatur, a incidunt vel veritatis explicabo nesciunt eveniet temporibus delectus sit nulla deserunt totam!</p>
            <div className='flex'>
                <p>Colours:</p>
                <p>0</p>
                <p>0</p>
            </div>
            <div className='flex items-center gap-2'>
                <p>Size:</p>
                <div className='flex gap-2'>
                 <button className='p-2 bg-white text-black border border-slate-400'>Xs</button>
                  <button className='p-2 bg-white text-black border border-slate-400'>Xs</button>
                   <button className='p-2 bg-white text-black border border-slate-400'>Xs</button>
                </div>
               <Link to='/Signup' type="button" className='bg-black text-white px-5 py-2'>Add To Cart</Link>
            </div>
            <div className='flex gap-5 w-full  items-center'>
                <div className='flex justify-center items-center gap-5  border-slate-400 h-8 border'>
            
                <button className='bg-white text-black h-full border-r border-r-black'>-</button>
                <p>2</p>
                <button className='bg-red-500 text-white h-full'>+</button>
             
                </div>
                <button className='btn-primary px-10'>Buy Now</button>
               <div className='border border-slate-400 p-3'>
                S
               </div>
            </div>
            <div className='flex flex-col border border-slate-400'>
            <div className='flex   gap-5 items-center justify-center border-b border-slate-400 '> 
                         <TbTruckDelivery className='' size={20}/>
                         <div>
                          <h2 className='lg:text-xl text-sm font-semibold mb-2 '>FREE AND FAST DELIVERY</h2>
                          <p className='lg:text-sm text-xs underline'>Free delivery for all order over $ 140</p>
                         </div>
                      </div>
                      <div className='flex   gap-3 items-center justify-center '> 
                         <TbTruckDelivery className='' size={20}/>
                         <div>
                          <h2 className='lg:text-xl text-sm font-semibold mb-2'>FREE AND FAST DELIVERY</h2>
                          <p className='lg:text-sm text-xs underline'>Free delivery for all order over $ 140</p>
                         </div>
                      </div>
                      </div>
        </div>
      </div>
      <div className='my-10'>
         <div className='flex items-center gap-3 lg:ms-40 ms-10'>
            <div className='w-4 h-10 bg-[#DB4444] rounded'></div>
        <h4 className='text-[#DB4444] text-xs font-semibold'>Related items</h4>
        </div>
        <ProductCart/>
      </div>
      
       
      </div>
  
  )
}

export default ProductView
