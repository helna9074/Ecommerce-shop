import React from 'react'

import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

const ListCategory = ({categories,DeleteCategory,EditHandler}) => {
  return (
      <div className='grid grid-cols-1 gap-3  w-full'>

      
      <div className=' p-3 shdow-xs  grid grid-cols-3  font-bold text-xl text-center'>
        <p className=' '>No.</p> 
        <p className=''>Name</p>
         <p>Action</p>
      </div>
       { categories.map((item,index)=>(
          <div key={item._id} className='p-3 shdow-xs grid grid-cols-3 text-center'>
        <p>{index+1}</p>
        <p>{item.name}</p>
       <div className='flex gap-2 justify-center items-center'>
        {/* <button className='bg-green-800 text-white p-3 rounded-sm' onClick={()=>EditHandler(item)}>Edit</button>
        <button className='btn-primary' onClick={()=>DeleteCategory(item._id)}>Delete</button> */}
 <MdModeEditOutline size={20} onClick={()=>EditHandler(item)}/>
                        <MdDelete size={20} onClick={()=>DeleteCategory(item._id)}/>
       </div>
      </div>
       ))

       }
     
       </div>
  )
}

export default ListCategory
