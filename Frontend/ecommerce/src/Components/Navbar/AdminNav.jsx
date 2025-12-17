
import { useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { IoMdPerson } from "react-icons/io";
import AdminMenu from './AdminMenu'
import { IoMdSettings } from "react-icons/io";

import { IoIosNotifications } from "react-icons/io";
const AdminNav = ({activeMenu}) => {
 
  const [openSideMenu,setSideMenu]=useState(false)
  return (
    <div className='p-5 flex gap-5 items-center justify-center  sticky top-0 z-30'>
       
      <div className='flex  justify-between w-full gap-2'>
        <div className='flex items-center'>
<button className='lg:hidden block p-2 lg:mx-2 '>
                            <CiMenuBurger className=" text-black  md:text-2xl" onClick={()=>setSideMenu(!openSideMenu)}/>
                        </button>
        <h2 className='lg:text-sm text-xs font-semibold text-black/70'>{`pages/${activeMenu}`}</h2>
        </div>
          
        <div className='flex gap-5'>
          <div className='flex items-center justify-center gap-2 lg:me-3'>
             <IoMdPerson className='text-gray-600 lg:text-xl text-sm'/>
             <div className='text-xs flex flex-col '>
              <p>Hashim</p>
            <p className='whitespace-nowrap'>Company Admin</p>
             </div>
            

            
          </div>
 <IoMdSettings className='lg:text-xl text-sm '/>
         <IoIosNotifications className='lg:text-xl text-sm'/>
         

        </div>
        </div>       
       
       {openSideMenu&&
        <div className='fixed top-[70px]  lg:hidden block left-0 bg-white mt-5'>
         <AdminMenu activeMenu={activeMenu} setSideMenu={setSideMenu}/>

        </div>

       }
    </div>
  )
}

export default AdminNav
