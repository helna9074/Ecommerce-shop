import React, { useEffect, useState } from 'react'
import { GoHome } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/Apipaths';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
const Address = () => {
    const[address,setAddress]=useState([])
    const[activeMenu,setActiveMenu]=useState(null) 
    useEffect(()=>{
        FetchAddress()
    },[])
    const FetchAddress=async()=>{
        try{
            const {data}=await axiosInstance.get(API_PATHS.Address.getAddress)
            console.log(data)
            setAddress(data.addressess)
        }catch(err){
            console.log(err)
        }
    }
    const HandleEdit=(id)=>{
        console.log(id)
        try{
           const {data}=axiosInstance.put(API_PATHS.Address.editAddress(id),{addressId:id})
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className='flex flex-col w-1/2 gap-2 mx-auto p-5 bg-slate-50 shadow-sm rounded-2xl h-1/2'>
        {address.map((add,index)=>(
             <div key={index} className='flex flex-col gap-2 items-center justify-center w-full p-3'>
                <div className='flex gap-2 me-auto'>
  <GoHome size={20}/> 
    <h6>{add.address.firstName}</h6>
                </div>
           
  <div className='flex justify-between w-full relative'>
    <div className='flex'>
 <p>
              {add.address?.street},{" "}
              {add.address?.city},{" "}
              {add.address?.apartment}
            </p>

            <p>{add.address?.phone}</p>
            <p>{add.address?.email}</p>
            </div>
            <button  onClick={()=>setActiveMenu(activeMenu===index?null:index)}>
<HiDotsHorizontal size={20}/>
            </button>

    {activeMenu===index&&(
        <div className='absolute top-8 right-0 bg-slate-100 flex flex-col gap-3  shadow-sm p-3 rounded-2xl '>
            <div className='flex gap-2 items-center'>
                <FaPencilAlt size={15} onClick={()=>HandleEdit(add.address._id)}/>
                 <p>edit</p>
            </div>
       
           <div className='flex gap-2 items-center'>
                <FaTrashAlt size={15}/>
                 <p>delete</p>
           </div>
           </div>
           
         
    )}
  </div>
        </div>
        ))}
       
      
      
    </div>
  )
}

export default Address
