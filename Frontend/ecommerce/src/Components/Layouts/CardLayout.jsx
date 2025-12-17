import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const CardLayout = ({children,type,title,timer}) => {
  return (
     <div className='lg:mx-38 mx-12  flex flex-col gap-5 border-b border-gray-400/50 '>
        <div className='flex items-center gap-3 '>
            <div className='w-4 h-10 bg-[#DB4444] rounded'></div>
        <h4 className='text-[#DB4444] text-xs font-semibold'>{type}</h4>
        </div>
         <div className='flex lg:gap-30 '>
           <div className=' flex w-full justify-between  me-10'>
                  <p className='lg:text-3xl text-sm font-semibold '>{title}</p>
                  
          {timer&&
               <div className='lg:flex md:gap-10 hidden  gap-3'>
            <div>
              <p className='text-xs font-semibold'>Days</p>
              <p className='lg:text-2xl font-bold text-sm'>03</p>
              
            </div>
            <span className='text-center lg:text-2xl text-sm'>:</span>
            <div >
              <p  className='text-xs font-semibold'>hour</p>
              <p  className='lg:text-2xl font-bold text-sm'>03</p>
            </div>
              <span className='text-center lg:text-2xl'>:</span>
            <div>
              <p  className='text-xs font-semibold'>Minute</p>
              <p  className='lg:text-2xl font-bold text-sm'>03</p>
            </div>
              <span className='text-center lg:text-2xl'>:</span>
            <div>
              <p  className='text-xs font-semibold'>Seconds</p>
              <p className='lg:text-2xl font-bold text-sm'>03</p>
            </div>
          </div>
          }       
         
          <div className='md:flex gap-3 hidden'>
                    <button className='bg-[#F5F5F5] rounded-full p-3'><FaArrowLeft/></button>
                    <button className='bg-[#F5F5F5] rounded-full p-3'><FaArrowRight/></button>
                  </div>
           </div>
        </div>
        <div className='lg:-mx-38 -mx-12'>
           {children}
        </div>
           
        </div>
  )
}

export default CardLayout
