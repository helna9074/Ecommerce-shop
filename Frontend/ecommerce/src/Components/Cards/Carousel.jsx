import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"
import { useNavigate } from 'react-router-dom';




const Carousel = ({Images}) => {
  console.log(Images)
 const navigate=useNavigate()

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={1}
      speed={600}
      autoplay={false}
      pagination={{ clickable: true }}
      className="w-full h-full"
      style={{
            "--swiper-pagination-color": "#ffffff",
             "--swiper-pagination-bullet-inactive-color": "#ffffff"
      }

      }
    >
      {Images&&Images.length>0?
      Images.map((item, index) => (
        <SwiperSlide key={index}>
           <div className='w-full h-full bg-black flex flex-col md:flex-row items-center justify-between px-10 lg:py-16 py-5 rounded'>
           <div className='md:w-1/2  text-center lg:text-left lg:space-y-4 space-y-0.5'>
          <h1 className='text-xl md:text-5xl font-bold text-white'>
            {item.title}
           </h1>
            <p className=' text-gray-600'>
              {item.paragraph}
            </p>
             <button className="mt-4 bg-black text-white px-6 lg:py-3 rounded-full">
          Shop Now
          </button>
           </div>
           <div className='md:w-1/2  mt-10 lg:mt-0 flex justify-center' onClick={()=>navigate(`${item.paths}`)}>

                  <img
            src={item.img?.[0]?.url}
            alt="banner"
            className="w-[280] lg:w-[420px] object-contain"
          />
           </div>
                
           
         </div>
        </SwiperSlide>
      )):(
        <div className='w-full h-full bg-black flex flex-col md:flex-row items-center justify-between px-10 lg:py-16 py-5 rounded'>NO Banners</div>
      )}
    </Swiper>
  );
};

export default Carousel;
