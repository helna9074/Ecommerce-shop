import React, { useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { formatDate, getOrderStatusDate } from '../../Utils/helper';
import StarRating from '../UI/StarRating';
import { useNavigate } from 'react-router-dom';

const Orderproduct = ({products=[]}) => {
    
  if(!products) return
  const navigate=useNavigate()

  return (
    <div className='w-full flex flex-col gap-5 bg-white'>
      {products.map((i,index)=>{
        const isSingle = i.items.length === 1;
        return(
<div key={index} className='flex flex-col  gap-2  p-5  bg-slate-50'>
  {!isSingle&&(
     <h3 className={`${i.orderStatus==="CANCELLED"?"text-red-500":"text-green-600"} font-semibold`}>{i.orderStatus},{formatDate(getOrderStatusDate(i))}</h3>
  )}
 
          {i.items.map((item,index)=>(
            <div key={index} className='flex gap-2 w-full  items-center'>
              
              <div>
              <img className='lg:w-24 lg:h-24 w-12 h-12 object-contain' src={item.image} alt="" />
              </div>
              <div className='flex gap-3 flex-col '>
               {isSingle&&(
                <h3 className={`${i.orderStatus==="CANCELLED"?"text-red-500":"text-green-600"} font-semibold flex  me-auto`}>{i.orderStatus},{formatDate(getOrderStatusDate(i))}</h3>
               )} 
 <p className='text-sm'>{item.name}</p>
 <div className="flex justify-start">

 <StarRating productId={item.product._id} initialRating={item.rating.rating}  reviewWritten={item.rating.reviewWritten} status={i.orderStatus}/>
 </div>
 
              </div>
             <IoIosArrowForward size={20} className='flex ms-auto' onClick={()=>navigate(`/account/orderDetails/${i._id}`)}/>
            
              </div>
          ))}  
        </div>
      )})}
       
    </div>
  )
}

export default Orderproduct
