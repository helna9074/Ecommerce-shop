import React from 'react'
import { FaLocationPin, FaRegCreditCard, FaTags } from 'react-icons/fa6'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import { formatDate } from '../../Utils/helper'
import StarRating from '../UI/StarRating'
const ViewProduct = ({order,Activebtn}) => {
  return (
    <div className='flex flex-col gap-3 p-2'>
    
            
                {order?.items?.map((i,indext)=>(
<div key={indext} className='flex border p-5 gap-7 border-slate-300 justify-between'>
 <div className='flex gap-3'>
               <div className='w-32  p-3 bg-slate-100 text-center  items-center justify-center'>
              <img src={i.image} alt="product-img" className='w-full h-full '/>
               </div>
               <div className='flex flex-col gap-2'>
                <p className='font-bold '>{i.name} </p>
               <div className='flex items-center gap-2 '>
                  
                  <p>size</p>
                  <p className="text-sm font-semibold ">{i.size}</p>
                  </div>
                 <div className='flex items-center gap-2 '>
                  
                  <p>Qty</p>
                  <p className="text-sm font-semibold ">{i.quantity}</p>
                  
                  </div>
     <StarRating status={Activebtn} initialRating={i.rating?.rating} reviewWritten={i.rating?.review}  readOnly/>
               </div>
               </div>
               <p>Price:{i.price}</p>
            </div>
                ))}
               
           <div className='p-5 border-t border-slate-400 flex flex-col gap-3 w-full items-end justify-end text-gray-600'>
             <div className='flex items-center gap-2  '>
                  
                  <p>subtotal:</p>
                  <p className="text-sm font-semibold text-black ">{order.subtotal}</p>
                  </div>
                   <div className='flex items-center gap-2 '>
                  
                  <p>Shipping:</p>
                  <p className="text-sm font-semibold text-black">{order.shipping}</p>
                  </div>
                  
                  {order.discount.length>0&&(
                     <div className='flex items-center gap-2 '>
                        <p>Qty</p>

                  <p className="text-sm font-semibold text-black">{order.discount}</p>
                  </div> 
                  )}
                 
                   <div className='flex items-center justify-center gap-2 text-center border-t w-32 p-2  border-slate-400'>
                  
                  <p className='font-semibold text-black'>Total</p>
                  <p className="text-sm font-semibold text-black">{order.total}</p>
                  </div>

           </div>
        </div>
  )
}

export default ViewProduct
