import React, { useEffect } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Carousel from '../../Components/Cards/Carousel'
import Card from '../../Components/Cards/Card'
import Category from '../../Components/Cards/Category'
import Bestselling from '../../Components/Cards/Bestselling'
import ExploreProduct from '../../Components/Cards/ExploreProduct'
import NewProducts from '../../Components/Cards/NewProducts'
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { SiAdguard } from "react-icons/si";
import { API_PATHS } from '../../Utils/Apipaths'
import axiosInstance from '../../Utils/axiosInstance'
import { useState } from 'react'
const Home = () => {
   
    const [Carousels,setCarousel]=useState([])
    const[SinglBanner,setSingleBanner]=useState([])
    const[Gpbanners,setGpBanners]=useState([])
    const[Products,setProducts]=useState([])
    const[ExploreProducts,setExplore]=useState([])
    useEffect(()=>{
      FetchBanner()
      FetchProducts()
      FetchExplore()

   },[])
       const FetchBanner=async()=>{
         try{
            console.log('called')
          const {data}=await axiosInstance.get(API_PATHS.Authuser.getBanner)
          console.log(data)
            if(data){
               setCarousel(data.carousel)
                setSingleBanner(
    data.Singlebanner ? [data.Singlebanner] : []
  );
               setGpBanners(data.Gpbanner)
            }
      
         }catch(error){
             console.log(error)
         }
       }

      const FetchProducts=async()=>{
         try{
            console.log('called')
          const {data}=await axiosInstance.get(`${API_PATHS.Products.getProducts}?flash=true`)
          console.log(data)
           if(data){
            console.log(data.products)
           setProducts(data.products.slice(0,10))
             
           }
           console.log(Products)
      
         }catch(error){
             console.log(error)
         }
       }
   const FetchExplore=async()=>{
         try{
            console.log('called')
          const {data}=await axiosInstance.get(`${API_PATHS.Products.getProducts}?flash=false`)
          console.log(data)
           if(data){
            console.log(data.products)
           setExplore(data.products.slice(0,8))
             
           }
         
      
         }catch(error){
             console.log(error)
         }
       }
      
       
  
 
   
  const category=["Women's Fashion","Men's Fashion","Electronics","Baby's & Toys","Home & Lifestyle","Sports & outdoor"]
  return (
    
       <div className='w-full '> 
        <div className='text-black text-sm  flex  gap-8 max-h-[420px]'>
        <div className='  max-[1080px]:hidden  w-1/4 h-full  '>
           <ul className=' flex flex-col gap-5 p-5 whitespace-nowrap ms-35  border-r   border-gray-300'>
        
        <li className='flex items-center'>Women's Fashion <MdOutlineKeyboardArrowRight className=' ms-10' size={15}/></li>
          <li className='flex items-center'>Men's Fashion<MdOutlineKeyboardArrowRight className=' ms-15' size={15}/></li>
          <li>Electronics</li>
          <li>Baby's & Toys</li>
          <li>Home & Lifestyle</li>
          <li>Sports & outdoor</li>
          <li>Health & Beauty</li>
          <li>Medicine</li>
          <li>Groceries & Pets</li>
          
       </ul>
          
        </div>
      
       
       <div className='md:p-8 p-4 flex-1 overflow-hidden min-w-0 '>
           <Carousel Images={Carousels}/>
       </div>
       </div>
        <div className=' mt-9 '>
          <Card Products={Products}/>
        </div>
         <div className='mt-9'>
          <Category/>
         </div>
         <div className='mt-9'>
         <Bestselling/>
         </div>
         <div className='mt-9 md:mx-38 mx-12'>
            <Carousel Images={SinglBanner}/>
         </div>
         <div className='mt-9'>
          <ExploreProduct Products={ExploreProducts} />
         </div>
         <div className='mt-9  md:ms-38 md:me-38 ms-12 me-12'>
          <NewProducts Images={Gpbanners}/>
         </div>
         <div className='my-9 flex justify-center lg:gap-30 gap-5 text-center '>
          <div className='flex flex-col lg:gap-5 gap-3 items-center justify-center'> 
             <TbTruckDelivery className='icon' size={20}/>
             <div>
              <h2 className='lg:text-xl text-sm font-semibold mb-2'>FREE AND FAST DELIVERY</h2>
              <p className='lg:text-sm text-xs'>Free delivery for all order over $ 140</p>
             </div>
          </div>
          <div className='flex flex-col  gap-3 lg:gap-5 items-center justify-center'> 
          <MdOutlineHeadsetMic className='icon' size={20}/>
          <div>
              <h2 className='lg:text-xl  text-sm font-semibold mb-2'>24/7 CUSTOMER SERVICE</h2>
              <p className='lg:text-sm text-xs'>Friendly 24/7 customer support</p>
             </div>
          </div>
           <div className='flex flex-col lg:gap-5 gap-3 items-center justify-center'>
          <SiAdguard className='icon' size={20}/>
          <div>
              <h2 className='lg:text-xl text-sm font-semibold mb-2'>MONEY BACK GUARANTEE</h2>
              <p className='lg:text-sm text-xs'>We return money within 30 days</p>
             </div>
          </div>
         </div>
         
       </div>
     

  )
}

export default Home
