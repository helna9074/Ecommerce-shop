import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/Cards/ProductCard'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/Apipaths'
import useWishliststore from '../../Store/Wishliststore'
import useAuthstore from '../../Store/Authstore'
import useCartStore from '../../Store/Cartstore'
import cartImg from '../../../Assets/Cards/cartimg.webp'
import { useNavigate } from 'react-router-dom'



const WhishList = () => {
   useEffect(()=>{
    FetchWishItems()
    SuggestedProducts()
   },[])
   const setItems=useWishliststore((s)=>s.setItems)
   const wishItems=useWishliststore((s)=>s.wishItems)
    const {isAuthenticated}=useAuthstore()
    const wishCount=wishItems.length;
    const [products,setProducts]=useState([])
    const navigate=useNavigate()
   const FetchWishItems=async()=>{
    try{
        const {data}=await axiosInstance.get(API_PATHS.WishList.getItems)
        console.log(data)
        if(data){
            setItems(data.items)
        }
      
    }catch(err){
  console.log(err)
    }
   }
   const handleAddToCart=async(Product)=>{
        if(!isAuthenticated){
         navigate('/signup')
       return;
       }
     
     try{
       const payload={
         productId:Product._id,
         size:null,
         quantity:1,
       }
       console.log("this is the payload",payload)
       const {data}= await axiosInstance.post(API_PATHS.Cart.addItem,payload)
       console.log(data)
       useCartStore.getState().setCart(data)
    alert("added to cart successfully")
     }catch(err){
     console.log(err)
     }
    }

     const SuggestedProducts=async()=>{
      try{
      const {data}=await axiosInstance.get(API_PATHS.Authuser.suggetedProducts)
      console.log(data)
      if(data){
        setProducts(data.products)
      }
      }catch(err){
       console.log(err)
      }
     }
   
     
     
       
      
     
  return (
    <div className='w-full h-full lg:px-40 px-10 py-7'>
     {!isAuthenticated&&(
             <div className='flex flex-col gap-3 p-8 text-center justify-center items-center'>
               <img src={cartImg} alt="Empty cart" className='w-32 h-32 object-contain'/>
               
                 <div className='flex flex-col gap-5'>
                   <p>Missing Cart Items?</p>
                <p className='text-sm'>Login to see the items you added previeously</p>
                <button className='btn-secondary w-20 mx-auto' onClick={()=>navigate('/login')} >Login</button>
                   </div>
                   </div>
               )}
               {wishCount===0&&isAuthenticated&&(
                  <div className='flex flex-col gap-3 p-8 text-center justify-center items-center'>
               <img src={cartImg} alt="Empty cart" className='w-32 h-32 object-contain'/>
                 <div className='flex flex-col gap-5'>
                 <p>Whishlist  is Empty</p>
                 <p>Add more Items into Whishlist</p>
                 <button className='btn-secondary' onClick={()=>navigate('/view-All')}>Shops</button>
                 </div>
                 </div>
               )}
                {wishCount!==0&&isAuthenticated&&(
<div>
      <div className='flex  items-start'>
       <h5>Whishlist({wishCount})</h5>
       
      </div>
      <div className='mt-10 lg:-mx-38 -mx-12'>
       <ProductCard Products={wishItems} showAddToCart={true} onAddToCart={handleAddToCart} scroll='flex-wrap'/>
      </div>
      <div className='mt-9'>
          <div className='flex items-center gap-3 '>
            <div className='head-box'></div>
        <h4 className='text-[#DB4444] text-xs font-semibold'>For you</h4>
        </div>
        <ProductCard Products={products} margin='lg:m-0'/>
         </div>
         </div>
           )}
    </div>
              
  )
}

export default WhishList
