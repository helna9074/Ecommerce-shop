import React from 'react'
import { IoPersonSharp } from "react-icons/io5";
import { FaLocationPin } from "react-icons/fa6";
import { FaTags } from "react-icons/fa";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { formatDate } from '../../Utils/helper';
const ViewCustomer = ({order}) => {
  return (
    <div className='flex flex-col gap-3 p-2'>

        <div className='flex border-b p-5 gap-7 border-slate-300 '>
           <div className='w-12 h-12 rounded-full p-3 bg-slate-100 text-center  items-center justify-center'>
           <IoPersonSharp size={25} className=''/>
           </div>
           <div className='flex flex-col gap-2'>
            <p>{order?.address?.firstName} {order?.address?.lastName}</p>
            <p>{order?.address?.email}</p>

           </div>
        </div>
        <div className="flex flex-col gap-3 border-b p-2">
      <h2 calssName='font-bold text-2xl'>Address</h2>
      <div className='flex items-center gap-2 border rounded-sm p-3'>
         <FaLocationPin size={25} className=''/>
         <p>
              {order.address?.street},{" "}
              {order.address?.city},{" "}
              {order.address?.apartment},
              {order.address?.companyName},
               {order.address?.phone},
            {order.address?.email}
            </p>
      </div>
        </div>
        <div className='flex flex-col gap-4'>
            <h3>Order Info</h3>
            <div className='flex items-center gap-2 text-gray-400'>
                <FaTags size={25} className=''/>
              <p>Order ID</p>
              <p className="text-sm text-black ">#{order._id}</p>
            </div>
            <div className='flex items-center gap-2 text-gray-400'>
                <MdOutlineCalendarMonth size={25} className=''/>
              <p>Order Date</p>
              <p className="text-sm text-black ">{order.statusDate&&formatDate(order.statusDate)}</p>
              </div>
              <div className='flex items-center gap-2 text-gray-400'>
                <FaRegCreditCard size={25} className=''/>
              <p>Order Date</p>
              <p className="text-sm text-black ">{order.payment?.method}</p>
              </div>
        </div>
    </div>
  )
}

export default ViewCustomer
