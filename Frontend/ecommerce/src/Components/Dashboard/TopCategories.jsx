import React from 'react'
import { Link } from 'react-router-dom'

const TopCategories = ({categories}) => {
  return (
    <div className='bg-white p-3 shadow w-1/3 rounded-2xl flex flex-col '>
      <div className='flex justify-between '>
<h1 className='font-bold p-2 mb-2 '>Top Categories</h1>
<Link to="/admin/category" className='text-blue-400 text-sm'>View All</Link>
      </div>
       {categories?.map((item,index)=>(
   <div key={index} className='flex  justify-between items-center'>
    <div className="flex  items-center gap-5  justify-center">
      <div className="w-20 h-20  rounded-2xl mb-2">
        <img src={item?.topProduct?.image.url} alt="" className='w-full h-full object-contain'/>


      </div>
      <div className="flex flex-col text-xs text-slate-400">
        <p className='text-black font-semibold line-clamp-2 text-lg'>{item?.categoryName}</p>
        <div className='flex gap-2'>
 <p>{item?.productCount}products</p>
        
        </div>
       

      </div>
    </div>
   </div>
   ))}
    </div>
  )
}

export default TopCategories
