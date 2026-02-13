import React from 'react'
import { Link } from 'react-router-dom'
import Table from '../UI/Table'
import {getOrderStatusDate,StatusBadge} from "../../Utils/helper"
const RecentOrder = ({orders}) => {
    if(!orders)return null
   const colums = [
  { key: "No", label: "Id", width: "w-[8%]" },
  { key: "customer", label: "Customer", width: "w-[20%]" },
  { key: "date", label: "Date", width: "w-[18%]" },
  { key: "total", label: "Amount", width: "w-[18%]" },
  { key: "orderstatus", label: "Status", width: "w-[20%]" },
];

   
   const tableData=orders.map((order,index)=>({
    id:order._id,
    No:String(index+1).padStart(2,"0"),
    customer:order.user.firstname,
    date:new Date(getOrderStatusDate(order)).toLocaleDateString(),
    total:order.total,
    orderstatus:(
      <span
      className={`px-3 py-1 text-xs font-semibold rounded-full  ${
        StatusBadge(order?.orderStatus) || "bg-gray-100 text-gray-600"
      }`}
    >{order.orderStatus}</span>
    ) 
   }))
  return (
   <div className='bg-white p-3  w-1/3  overflow-hidden shadow rounded-2xl flex flex-col  '>
    <div className='flex justify-between '>
<h1 className='font-bold p-2 mb-2 '>Recent Orders</h1>
<Link to="/admin/orders" className='text-blue-400 text-sm'>View All</Link>
    </div>
      <Table colums={colums} data={tableData} className=" text-xs" headStyle='bg-slate-200 p-2 border border-slate-300 shadow' />
      {/* <div className='flex flex-col gap-3 py-8 items-center justify-center '>
      <div className=' w-full  text-slate-800 bg-slate-300 grid grid-cols-5'>
        {colums.map((col,index)=>(<p key={index} className='p-2'>{col.label}</p>))}

      </div>

      <div className='flex justify-between flex-col w-full gap-3'>
      {tableData.map((row, rowIndex) => (
  <div
    key={rowIndex}
    className=" border-b last:border-b-0 grid grid-cols-5 "
  >
    {colums.map((col) => (
      <p key={col.key} className="p-2">
        {row[col.key]}
      </p>
    ))}
  </div>
))}
</div>

      </div> */}
    </div>
  )
}

export default RecentOrder
