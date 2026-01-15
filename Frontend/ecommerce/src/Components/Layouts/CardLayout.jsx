import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const CardLayout = ({children,type,title,isflashsale,showarrow,onLeft,onRight}) => {
  const [time, setTime] = useState({
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
});

  useEffect(()=>{
    const interval = setInterval(() => {
    const now = new Date();

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const diff = endOfDay - now;
   if (diff <= 0) {
      window.location.reload();
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setTime({
      days: "00",
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    });
  }, 1000);

  return () => clearInterval(interval);
  },[])
  return (
     <div className='lg:mx-38 mx-12  flex flex-col gap-5 border-b border-gray-400/50 '>
        <div className='flex items-center gap-3 '>
            <div className='head-box'></div>
        <h4 className='text-[#DB4444] text-xs font-semibold'>{type}</h4>
        </div>
         <div className='flex lg:gap-30 '>
           <div className=' flex w-full justify-between  me-10'>
                  <p className='lg:text-3xl text-sm font-semibold '>{title}</p>
                  
          {isflashsale&&
               <div className='lg:flex md:gap-10 hidden  gap-3'>
            <div>
              <p className='text-xs font-semibold'>Days</p>
              <p className='lg:text-2xl font-bold text-sm'>{time.days}</p>
              
            </div>
            <span className='text-center lg:text-2xl text-sm'>:</span>
            <div >
              <p  className='text-xs font-semibold'>hour</p>
              <p  className='lg:text-2xl font-bold text-sm'>{time.hours}</p>
            </div>
              <span className='text-center lg:text-2xl'>:</span>
            <div>
              <p  className='text-xs font-semibold'>Minute</p>
              <p  className='lg:text-2xl font-bold text-sm'>{time.minutes}</p>
            </div>
              <span className='text-center lg:text-2xl'>:</span>
            <div>
              <p  className='text-xs font-semibold'>Seconds</p>
              <p className='lg:text-2xl font-bold text-sm'>{time.seconds}</p>
            </div>
          </div>
          }       
         {
          showarrow?(
                    <div className='md:flex gap-3 hidden'>
                    <button className='bg-[#F5F5F5] rounded-full p-3' onClick={onLeft}><FaArrowLeft/></button>
                    <button className='bg-[#F5F5F5] rounded-full p-3'onClick={onRight}><FaArrowRight/></button>
                  </div>
                  ):(<button className='btn-secondary'>view All</button>)
         }
          
           </div>
        </div>
        <div className='lg:-mx-38 -mx-12'>
           {children}
        </div>
           
        </div>
  )
}

export default CardLayout
