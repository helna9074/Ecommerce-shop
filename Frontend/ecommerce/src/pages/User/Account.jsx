import React from 'react'
import { Link, Outlet } from 'react-router-dom'



const Account = () => {
  const Active="Profile";
  return (
    <div className='w-full flex justify-center flex-col items-center '>
           <div className=' flex justify-between w-7xl p-5'>
 <p className='text-gray-500 flex '>Home<span className='text-black'>/My Account</span></p>
 <p className=''>Welcome<span className='text-red-400'>Md Rimel</span></p>
           </div>
      <div className='w-7xl flex justify-between ms-5'>
       
       
          <div className='flex flex-col gap-3 text-sm  text-gray-500'>
            
            <h6 className='font-bold text-black'>Manage My Account</h6>
            <a className=' hover:text-red-400' href='#myprofile'>My Profile</a>
            <Link to='myaddress' className=' hover:text-red-400' href='#myprofile' >Address Book</Link>
           
             <h6 className='font-bold text-black'>My Orders</h6>
            <a className=' hover:text-red-400' href='#myprofile'>Orders</a>
            <a className=' hover:text-red-400' href='#myprofile'>My Cancellations</a>
           <a className=' hover:text-red-400' href='#myprofile'>Reviews</a>
            <h6 className='font-bold text-black'>MY wishlist</h6>
          </div>
        <Outlet Active={Active}/>
 </div>
    </div>
  )
}

export default Account
