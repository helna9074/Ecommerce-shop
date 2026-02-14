import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideMenu from '../Navbar/SideMenu'
import Footer from '../UI/Footer'
import { useState } from 'react'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/Apipaths'
import useCartStore from '../../Store/Cartstore'
import useWishliststore from '../../Store/Wishliststore'
import useAuthstore from '../../Store/Authstore'
const  HomeLayout = () => {
    const {isAuthenticated}=useAuthstore()
   
  const hasHydrated = useAuthstore((state) => state.hasHydrated);

 

  useEffect(() => {
    
  const loadInitialData = async () => {
    if(!isAuthenticated||!hasHydrated) return;
    try {
      const cartRes = await axiosInstance.get(API_PATHS.Cart.getItems);
     useCartStore.getState().setCart(cartRes.data.items);
      
        
      const wishRes = await axiosInstance.get(API_PATHS.WishList.getItems);
      useWishliststore.getState().setItems(wishRes.data.items);
    } catch (err) {
      console.log(err);
    }
    
  };

  loadInitialData();

}, [isAuthenticated]);

  // const[cartCount,setCartCount]=useState(0)
  // const[wishCount,setWishCount]=useState(0)
  

  const [toggle,setToggle]=useState(false)
  return (
    <div className='w-screen '>
      <div className='flex h-12'>
        <Navbar setToggle={setToggle} toggle={toggle}/>
      </div>
         
      <div>
          {/* <SideMenu toggle={toggle}/> */}
        </div>
      <div className='w-full mt-5'>
         
        
         <Outlet/>
         
      
      
      </div>
     <div className='mt-12'>
            <Footer/>
         </div>
    </div>
  )
}

export default HomeLayout
