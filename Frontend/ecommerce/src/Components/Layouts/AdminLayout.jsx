import React from 'react'
import AdminNav from '../Navbar/AdminNav'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import AdminMenu from '../Navbar/AdminMenu'

const AdminLayout = () => {
    const [activeMenu,setActiveMenu]=useState(null)
    const handleActive=(data)=>{
          setActiveMenu(data)
    }
  return (
      <div className='w-screen gap-6'>
        {/* Navbar */}
      <AdminNav activeMenu={activeMenu}/>
      <div className='flex'>
      <div className='max-[1080px]:hidden md:w-64 '>
      <AdminMenu activeMenu={activeMenu}/>
      </div>

      <div className=' p-4 max-[1080px]:ml-0 flex-1 flex-col'>
        
        <Outlet context={{handleActive}}/>
      </div>
      </div>
    </div>
  )
}

export default AdminLayout
