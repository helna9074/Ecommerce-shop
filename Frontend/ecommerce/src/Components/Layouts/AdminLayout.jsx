import React, { useEffect, useRef } from 'react'
import AdminNav from '../Navbar/AdminNav'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AdminMenu from '../Navbar/AdminMenu'
import socket from '../../socket.js'
import LowStockToast from '../UI/useLowStockToast'
import toast from 'react-hot-toast'
import API from '../../Utils/adminAxios'
import { API_PATHS } from '../../Utils/Apipaths'
import useNotifyStore from '../../Store/Notifications'
const AdminLayout = () => {
    const [activeMenu,setActiveMenu]=useState(null)
    const navigate=useNavigate()
  
    const handleActive=(data)=>{
          setActiveMenu(data)
    }
   
      
    const {setNotification,count}=useNotifyStore()

  
  /* ===============================
     📥 FETCH EXISTING ALERTS (API)
     =============================== */

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const { data } = await API.get(
          `${API_PATHS.Authadmin.Notifications.getAlerts}?seen=false`
        );
        setNotification(data.notifications);

        console.log("this are the notifications you  have",data.notifications)
        data.notifications.forEach((n) => {
          toast.custom((t)=>(
            <LowStockToast
              t={t}
              message={n.message}
              onNavigate={() => navigate("/admin/notifications")}
            />
          ))
          
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlerts(); 
  }, []);
 
  // const Fetchnotifictions=async()=>{
  //   try{
  //     const {data}=await API.get(API_PATHS.Authadmin.Notifications.getAlerts)
  //     console.log(data.notifications,'this are the notifications you  have')
  //     setNotification(data.notifications.length)
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  return (
      <div className='w-screen gap-6'>
        {/* Navbar */}
      <AdminNav activeMenu={activeMenu} Notify={count}/>
      <div className='flex'>
      <div className='max-[1080px]:hidden md:w-52 '>
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
