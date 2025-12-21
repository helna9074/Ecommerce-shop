import React from 'react'
import { FaEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const ProductList = ({Products,HandleEdit,DeleteProduct,ViewProduct}) => {
  
  return (
      <div>

      
      <div className='p-3 shdow-xs  grid grid-cols-5 text-xs  font-bold lg:text-xl text-center w-full'>
        <p>No.</p> 
        
        
        <p >Produt</p>
        <p>Amount</p>
        <p>Category</p>
         <p>Action</p>
      </div>
       {Products.map((item,index)=>(
      
               <div key={index} className='lg:p-3 p-2 shdow-xs text-xs lg:text-sm grid grid-cols-5 text-center  justify-center items-center'>
           
        <p>{index+1}</p>
        <div className='flex gap-1  justify-center items-center'>
          <p className='line-clamp-2'>{item.name}</p>
          {/* {item.img.map((Image,index)=>(
             <img key={index} src={Image.url} alt="" className='w-full'/>
          )

         ) } */}
        
        </div>
        <p>{item.amount}</p>
        
           <p>{item?.category?.name || "No Category"}</p>
           
          
            <div className='flex gap-2 justify-center'>
                <MdModeEditOutline size={20} onClick={()=>HandleEdit(item)}/>
                <FaEye size={20} onClick={()=>ViewProduct(item._id)}/>
                <MdDelete size={20} onClick={()=>DeleteProduct(item._id)}/>
            </div>
       
       
        </div>
            ))}
         
       {/* <div className='flex gap-2 justify-center items-center'>
       
       </div> */}
      
      
     
       </div>
  

  )
}

export default ProductList
