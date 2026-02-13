import React, { useEffect } from 'react'
import { IoPersonSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Customers = ({Datas}) => {
  const dataLength=Datas?.length-1;
  useEffect(()=>{
    console.log("this is the length",Datas?.length)
  },[])
  return (
    <div className='bg-white p-3 shadow w-1/4  rounded-2xl flex flex-col '>
    <div className='flex items-center justify-between w-full border-b p-2'>
    <h1 className='font-bold whitespace-nowrap '>Top Customers</h1>
    <Link to={'/admin/users'} className='w-full flex items-center justify-end text-blue-400'>View All</Link>
    </div>
     {
      Datas?.map((user,index)=>(
        <div className={`${index===dataLength?'border-b-0':'border-b'} flex w-full py-2  items-center  justify-center  border-slate-200`} key={index}>
          <div className='w-12 h-12 bg-slate-200 flex items-center justify-center rounded-full p-3'>
            <IoPersonSharp className='w-full h-full text-lg '/>
          </div>
          <span className='ms-2'>{user?._id?.firstname}</span>
          <div className="flex ms-auto  bg-green-700 text-white rounded-full text-xs px-3">${user?.totalSpent}</div>
        </div>
         
      ))
     }
    </div>
  )
}

export default Customers

