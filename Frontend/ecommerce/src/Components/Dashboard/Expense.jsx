import React from 'react'
import { useNavigate } from 'react-router-dom'

const Expense = ({expenses}) => {
    const navigate=useNavigate()
  return (
     <div className='bg-white p-3  w-1/2  overflow-hidden shadow rounded-2xl flex flex-col  '>
    <div className='flex justify-between '>
<h1 className='font-bold p-2 mb-2 '>Recent Expenses</h1>
<button className='text-blue-300 text-sm' onClick={()=>navigate('/admin/expense')}>View all</button>
      </div>
      {expenses.map((item,index)=>(
         <div className='flex   items-center gap-3 p-5'>
       <p>{item.title}</p> 
       <p className='text-slate-300 text-sm'>{item.amount}</p>
        </div>  
      ))}
     
    </div>
  )
}

export default Expense
