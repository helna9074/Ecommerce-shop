
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Menus from '../../Components/Accounts/Menus'
import useAuthstore from '../../Store/Authstore'



const Account = () => {
  const [Active,setActive]=useState('myprofile')
  const username=useAuthstore(s=>s.username)
 const handleActive=(active)=>{
  setActive(active)
 }
  return (
    <div className='w-full flex justify-center flex-col items-center  '>
           <div className=' flex justify-between lg:w-7xl p-5 w-full items-center'>
 <p className='text-gray-500 flex text-xs lg:text-sm'>Home<span className='text-black'>/My Account</span></p>
 <p className='text-xs lg:text-sm'>Welcome<span className='text-red-400 ms-3 '>{username}</span></p>
           </div>
      <div className=' flex lg:flex-row flex-col justify-center lg:w-7xl w-full gap-9 cursor-pointer '>
        <Menus
        Active={Active} />
       
     
      
          <Outlet context={{handleActive}}/>
        </div>
        
 </div>
    
  )
}

export default Account
