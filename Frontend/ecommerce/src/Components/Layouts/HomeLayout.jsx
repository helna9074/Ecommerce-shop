import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideMenu from '../Navbar/SideMenu'
import Footer from '../Footer'
import { useState } from 'react'
const  HomeLayout = () => {
  const [toggle,setToggle]=useState(false)
  return (
    <div className='w-screen '>
      <div className='flex h-12'>
        <Navbar setToggle={setToggle} toggle={toggle}/>
      </div>
         
      <div>
          <SideMenu toggle={toggle}/>
        </div>
      <div className='w-full mt-5'>
         
        
         <Outlet/>
         
      
      
      </div>
     <div className='mt-9'>
            <Footer/>
         </div>
    </div>
  )
}

export default HomeLayout
