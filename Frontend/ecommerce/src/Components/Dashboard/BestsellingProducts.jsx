import React from 'react'
import { MdBarChart } from "react-icons/md";
const BestsellingProducts = ({data}) => {
    if(!data)return null
  return (
    <div className='bg-white p-3 shadow w-1/3 rounded-2xl flex flex-col '>
      <h1 className='font-bold p-2 mb-2'>BestSelling Products</h1>
        {data?.map((item,index)=>(
   <div key={index} className='flex  justify-between items-center gap-3'>
    <div className="flex gap-2 items-center">
      <div className="w-20 h-20  rounded-2xl">
        <img src={item?.product?.img[0].url} alt="" className='w-full h-full object-contain'/>


      </div>
      <div className="flex flex-col text-xs text-slate-400">
        <p className='text-black font-semibold line-clamp-2'>{item?.product?.name}</p>
        <div className='flex gap-2'>
 <p>{item?.sold}</p>
        <p>Sales:{item?.revenue}</p>
        </div>
       

      </div>
    </div>
    <div className="flex gap-5 items-center ">
      <div>
<p>{item?.sold}</p>
       <p className='text-sm text-slate-500'>${item?.revenue}</p>
      </div>
      <div className='flex gap-1'>
      <div className='flex flex-col text-xs text-green-500'>
        <p>{item?.percent}%</p>
        <p>{item?.diff}</p>
      </div>
      <div className="bg-blue-200">
      <MdBarChart className='text-3xl text-blue-500 w-6'/>
      </div>
      </div>
    </div>
   </div>
        ))}
 
      
    </div>
  )
}

export default BestsellingProducts
