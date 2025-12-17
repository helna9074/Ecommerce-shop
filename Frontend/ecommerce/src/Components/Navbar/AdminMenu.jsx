import React, { useEffect } from 'react'
import { SIDE_MENU_DATA } from '../../Utils/data'
import { useNavigate } from 'react-router-dom'

const AdminMenu = ({activeMenu,setSideMenu}) => {
  
    const navigate=useNavigate()
    const handleClick=(route)=>{
       
        if(route==='Logout'){
            handleLogout();
        } 
        navigate(route)
     setSideMenu(false)
    }
       
     const  handleLogout=()=>{
        localStorage.clear();
        navigate('/login')
        
       }
    
  return (
    <div className='w-full p-4 bg-gray-50 drop-shadow  mt-2 lg:rounded-2xl lg:ml-5'>
    <div className='flex flex-col  gap-3 items-center w-full '>
        {SIDE_MENU_DATA.map(item=>(
            <button className={`p-3 w-full overflow-y-auto   ${activeMenu===item.label?"bg-[#DB4444] text-white rounded-xl":" "}`} type="button" key={item.id} onClick={()=>handleClick(item.path)}>{item.label}</button>
            
        ))}
      
    </div>
   
    
    </div>
  )
}

export default AdminMenu
