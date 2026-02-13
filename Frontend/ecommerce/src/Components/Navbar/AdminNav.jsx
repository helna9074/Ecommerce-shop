
import { useEffect, useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { IoMdPerson } from "react-icons/io";
import AdminMenu from './AdminMenu'
import { IoMdSettings } from "react-icons/io";

import { IoIosNotifications } from "react-icons/io";
import useAdminStore from '../../Store/Adminstore';
import { useNavigate } from 'react-router-dom';

const AdminNav = ({activeMenu,Notify}) => {
  const {admin}=useAdminStore.getState();
  const {logout}=useAdminStore.getState()
  const [openSideMenu,setSideMenu]=useState(false)
  const [isOpen,setIsOpen]=useState(false)
  const navigate=useNavigate()
  useEffect(() => {
    console.log(Notify)
  },[])
  return (
    <div className='p-5 flex gap-5 items-center justify-center bg-white z-50  sticky top-0  border-b border-slate-500'>
       
      <div className='flex  justify-between w-full gap-2'>
        <div className='flex items-center'>
<button className='lg:hidden block p-2 lg:mx-2 '>
                            <CiMenuBurger className=" text-black  md:text-2xl" onClick={()=>setSideMenu(!openSideMenu)}/>
                        </button>
        <h2 className='lg:text-sm text-xs font-semibold text-black/70'>{`pages/${activeMenu}`}</h2>
        </div>
          
        <div className='flex gap-5 items-center'>
          <div className='flex items-center justify-center gap-2 lg:me-3'>
             <IoMdPerson className='text-gray-600 lg:text-xl text-sm'/>
             <div className='text-xs flex flex-col '>
              <p>{admin}</p>
            <p className='whitespace-nowrap'>Company Admin</p>
             </div>
            

            
          </div>
          <div className='relative'>
           <IoMdSettings className='lg:text-xl text-sm ' onClick={()=>setIsOpen(!isOpen)}/> 
            {isOpen&&(
               <div className="absolute bg-slate-200 top-8 right-0 w-32 p-2 text-center rounded-md  text-red-500" onClick={logout}> 
              <p>Logout</p>
              </div>
            )}
           
          </div>
<div className='relative w-15 ' onClick={()=>navigate('/admin/notifications')}> 
  <IoIosNotifications className='lg:text-xl text-sm'/>
  {Number(Notify)>0&&(
    <div className='absolute top-[-5px] left-[-5px] flex justify-center items-center text-xs p-2 bg-red-500 w-2.5 h-2.5 rounded-full text-white'>
        {Notify? Notify:null}
       </div>
  )}
      
       
</div>
    
         

        </div>
        </div>       
    {/* Side Menu of small devices */}
       {openSideMenu&&
        <div className='fixed top-[70px]  lg:hidden block left-0 bg-white mt-1'>
         <AdminMenu activeMenu={activeMenu} setSideMenu={setSideMenu}/>

        </div>

       }
    </div>
  )
}

export default AdminNav
