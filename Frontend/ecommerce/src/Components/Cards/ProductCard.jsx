import React, { useState } from 'react'
import Cimg from '../../../Assets/Cards/Cimg.png'
import { useNavigate } from 'react-router-dom'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
const ProductCard = ({scroll,margin}) => {
   const[Btn,setBtn]=useState(false)
const navigate=useNavigate()
  return (
    <div className={` ${margin? margin:' lg:ms-38 ms-12'}`}>
         <div className={`mt-8 w-full flex ${scroll} hide-scrollbar`}>
          <div className='flex flex-col w-64  h-70 shrink-0' >
             <div className='md:w-full w-[75%] h-[75%] relative group'>
              <img src={Cimg} alt="game" className='w-full h-full object-cover'onClick={()=>navigate('/product-view')}/>
              <div className='group-hover:opacity-100 opacity-0 bg-white rounded-full w-10 h-10 absolute top-1 right-2 flex items-center justify-center' onClick={()=>setBtn(!Btn)}>
               {Btn?(
                    <IoIosHeartEmpty size={20} className=''/>
               ):(
                  <IoIosHeart size={20} className=''/>
               )}
              
              </div>
              
             </div>
             <div className='flex flex-col gap-2'>
              <p>Gampad</p>
              <p>$123</p>
              <p>*****</p>
             </div>
          </div>
          <div className='flex flex-col w-64 h-70 shrink-0 '>
             <div className='md:w-full w-[75%] h-[75%]'>
              <img src={Cimg} alt="game" className='w-full h-full object-cover'/>

             </div>
             <div className='flex flex-col gap-2'>
              <p>Gampad</p>
              <p>$123</p>
              <p>*****</p>
             </div>
          </div>
          <div className='flex flex-col w-64 h-70 shrink-0 '>
             <div className='md:w-full w-[75%] h-[75%]'>
              <img src={Cimg} alt="game" className='w-full h-full object-cover'/>
             </div>
             <div className='flex flex-col gap-2'>
              <p>Gampad</p>
              <p>$123</p>
              <p>*****</p>
             </div>
          </div>
          <div className='flex flex-col w-64 h-70 shrink-0 '>
             <div className='md:w-full w-[75%] h-[75%]'>
              <img src={Cimg} alt="game" className='w-full h-full object-cover'/>
             </div>
             <div className='flex flex-col gap-2'>
              <p>Gampad</p>
              <p>$123</p>
              <p>*****</p>
             </div>
          </div>
          <div className='flex flex-col w-64 h-70 shrink-0 '>
             <div className='w-full h-[75%]'>
              <img src={Cimg} alt="game" className='w-full h-full object-cover'/>
             </div>
             <div className='flex flex-col gap-2'>
              <p>Gampad</p>
              <p>$123</p>
              <p>*****</p>
             </div>
          </div>
          <div className='flex flex-col w-64 h-70 shrink-0 '>
             <div className='w-full h-[75%]'>
              <img src={Cimg} alt="game" className='w-full h-full object-cover'/>
             </div>
             <div className='flex flex-col gap-2'>
              <p>Gampad</p>
              <p>$123</p>
              <p>*****</p>
             </div>
          </div>
          <div className='flex flex-col w-64 h-70 shrink-0 '>
             <div className='w-full h-[75%]'>
              <img src={Cimg} alt="game" className='w-full h-full object-cover'/>
             </div>
             <div className='flex flex-col gap-2'>
              <p>Gampad</p>
              <p>$123</p>
              <p>*****</p>
             </div>
          </div>
           <div className='flex flex-col w-64 h-70 shrink-0 '>
             <div className='w-full h-[75%]'>
              <img src={Cimg} alt="game" className='w-full h-full object-cover'/>
             </div>
             <div className='flex flex-col gap-2'>
              <p>Gampad</p>
              <p>$123</p>
              <p>*****</p>
             </div>
          </div>
          
        </div>
        
    </div>
   
  )
}

export default ProductCard
