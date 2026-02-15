import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import useWishliststore from '../../Store/Wishliststore';
import { forwardRef,useImperativeHandle,useRef } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { isOfferActive } from '../../Utils/helper';
import useAuthstore from '../../Store/Authstore';
import StarRating from '../UI/StarRating';
import ProductCardSkeleton from '../UI/shadcnUI/ProductcardSkeleton';

const ProductCard =forwardRef(({scroll,margin,Products=[],showAddToCart,onAddToCart,isLoading},ref) => {
   
   const {isAuthenticated}=useAuthstore()
  const navigate=useNavigate()
   const toggleWishlist=useWishliststore((s)=>s.toggleWishlist)
   const wishItems=useWishliststore(s=>s.wishItems)

  const isWhishlisted=(productId)=>
       wishItems.some((i)=>String(i._id)===String(productId))
  const containerRef=useRef(null)
  useImperativeHandle(ref,()=>({
    scrollLeft(){
      containerRef.current?.scrollBy({left:-300,behavior:'smooth'})
    },
    scrollRight(){
      containerRef.current?.scrollBy({
        left:300,
        behavior:'smooth'
      })
    }
  }))
  
    
  return (
    <div className={` ${margin? margin:' lg:ms-38 ms-12'}`}>
    {isLoading?<ProductCardSkeleton count={10}/>:(
 <div className={`mt-8 w-full flex ${scroll} hide-scrollbar gap-2 overflow-y-hidden relative `} ref={containerRef}>
            {Products.map((item)=>{
              const showOffer =  isOfferActive(item.offer);
              return(
                <div key={item._id}  className='flex flex-col lg:w-64 w-32 h-70 shrink-0 cursor-pointer'>
             <div className='md:w-full lg:w-[75%] h-[75%] relative  bg-slate-100 '>
              <img src={`${item?.img?.[0]?.url}?w=400&c_limit&q_auto&f_auto`} loading='lazy' alt="game" className='w-full h-full object-contain'onClick={()=>navigate(`/product-view/${item._id}`)}/>
              {showAddToCart?(
                <button className='bg-slate-100 rounded-full w-10 h-10 absolute top-1 right-2 flex items-center justify-center text-red-500' onClick={()=>toggleWishlist(item._id)}>
                  <FaTrashAlt size={15}/>
                </button>
              ):(<button className='bg-slate-100 rounded-full w-10 h-10 absolute top-1 right-2 flex items-center justify-center' onClick={()=>{isAuthenticated?toggleWishlist(item._id):navigate('/login')}}>
               {isWhishlisted(item._id)?(
                   <IoIosHeart size={20} className='' />
               ):(
                   <IoIosHeartEmpty size={20} className=''/>
                  
               )}
              
              </button>)}
              {showOffer&&
             <button className='absolute top-3 left-3 btn-secondary w-15 h-5  text-xs flex items-center justify-center text-white font-semibold '>{item.offer.Percentage}%OFF</button>
             }
           
              {showAddToCart&&(
                <button
                  onClick={()=>onAddToCart?.(item)}
                  className="bg-black text-white absolute bottom-0 py-1 text-center w-full  "
                >
                  Add To Cart
                </button>
              )}
             </div>
             <div className='flex flex-col gap-2 text-xs  w-full  '>
               <div className=''>
                   <p className='truncate'>{item.name}</p>
               </div>
             
              <p>{item.amount}</p>
              <div className='flex gap-2 items-center'>
 <StarRating initialRating={item.avgRating} readOnly />
 <p className='font-semibold text-green-400 text-sm'>{item.avgRating}</p>
              </div>
            
             </div>
             
           
          </div>
              )
          
})}
      </div>
    )}
          
         
         
        
        
    </div>
  
  )

}
)

export default ProductCard
