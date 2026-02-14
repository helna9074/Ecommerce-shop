import React from 'react'
import StarRating from '../UI/StarRating'

const TopRated = ({products=[]}) => {
  return (
     <div className='bg-white p-3  w-1/2  overflow-hidden shadow rounded-2xl flex flex-col  '>
    <div className='flex justify-between '>
<h1 className='font-bold p-2 mb-2 '>Top Rated</h1>
      </div>
      {products?.map((item,index)=>(
           <div key={index} className='flex  justify-between items-center gap-3'>
          <div className="flex gap-2 items-center">
            <div className="w-20 h-20  rounded-2xl">
              <img src={item?.image?.url} alt="" className='w-full h-full object-contain'/>
      
      
            </div>
            <div className='flex flex-col gap-1'>
 <p>{item?.name}</p>
 
           <StarRating initialRating={item.avgRating} readOnly />
           <p className='text-sm text-slate-600'>totalRatings:{item.totalRatings}</p>
            </div>
          
          </div>
        
         </div>
      ))}
     
    </div>
  )
}

export default TopRated

