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
    const[bestSellingProducts,setBestSellingProducts]=useState([])
    
    useEffect(()=>{
     Fetchbanners()
     FetchAllProducts()
   },[])
   useEffect(()=>{
     
     console.log("this is the gpBanners",Gpbanners)
   },[Gpbanners])
       const FetchAllProducts=async()=>{
         try{
            console.log('called')
          const {data}=await axiosInstance.get(API_PATHS.Products.getAllData)
          console.log("this is the home data",data)
           
            
      setExplore(data.exploreProducts)
            setProducts(data.flashProducts)
setBestSellingProducts(data.bestSellingProducts)
         }catch(error){
             console.log(error)
         }
       }
 
     
  const Fetchbanners=async()=>{
    try{
       console.log('called')
     const {data}=await axiosInstance.get(API_PATHS.Products.getbanners)
     console.log("this is the home data",data)
      
          setCarousel(data.carousel)
           setSingleBanner(
     data.singleBanner ? [data.singleBanner] : []
   );
          setGpBanners(data.gpBanners)
        console.log("this is the gpBanners",Gpbanners)
   
    }catch(error){
        console.log(error)
    }
  }
      
       
  
 
   
  const category=["Women's Fashion","Men's Fashion","Electronics","Baby's & Toys","Home & Lifestyle","Sports & outdoor"]
  return (
    
       <div className='w-full '> 
        <div className='text-black text-sm  flex  justify-center items-center gap-8 '>
        
      
       
       <div className='md:p-8 p-4 flex-1 overflow-hidden min-w-0  h-[390px]'>
           <Carousel Images={Carousels} clickable={false}/>
       </div>
       </div>
        <div className=' mt-9 '>
          <Card Products={Products}/>
        </div>
         <div className='mt-9'>
          <Category/>
         </div>
         <div className='mt-9'>
         <Bestselling Products={bestSellingProducts}/>
         </div>
         <div className='mt-9 md:mx-38 mx-12'>
            <Carousel Images={SinglBanner} clickable={true}/>
         </div>
         <div className='mt-9'>
          <ExploreProduct Products={ExploreProducts} />
         </div>
         <div className='mt-9  md:ms-38 md:me-38 ms-12 me-12'>
          <NewProducts Images={Gpbanners} clickable={true}/>
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
