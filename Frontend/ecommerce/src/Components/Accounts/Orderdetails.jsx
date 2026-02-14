import React, { useEffect, useState } from 'react'
import { HiOutlineCheck } from "react-icons/hi";
import { useParams } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/Apipaths';
import { formatDate } from '../../Utils/helper';
import { GoHome } from 'react-icons/go';
import { BiDownload } from "react-icons/bi";
import { CiTrophy } from "react-icons/ci";
import useDeleteModal from '../../hooks/useDeleteModal';
import DeleteModal from '../UI/DeleteModal'
import toast from 'react-hot-toast';
import {getOrderStatusDate} from '../../Utils/helper'
const Orderdetails = () => {
    const {orderId}=useParams()
    const [order,setOrder]=useState(null)
    const { modal, openDelete, closeDelete, confirmDelete } = useDeleteModal();
    useEffect(()=>{
    FetchOrder()
    },
    [])
    const FetchOrder=async()=>{
        try{
            console.log('called here')
            const {data}=await axiosInstance.get(API_PATHS.Order.getProduct(orderId))
            setOrder(data.order)
            console.log(data)
        }catch(err){
            console.log(err)
        }   
    }
    const isCancellationFlow = ["CANCEL_REQUESTED", "CANCELLED"].includes(
  order?.orderStatus
);
const steps = 
   isCancellationFlow? [
       {key:"CANCEL_REQUESTED",label:"Requested"},
        {key:"CANCELLED",label:"Cancelled"}
    ]:[
          { key: "PLACED", label: "Order Placed" },
  { key: "CONFIRMED", label: "Confirmed" },
  { key: "SHIPPED", label: "Shipped"},
  { key: "DELIVERED", label: "Delivered" }
    ]
       
  

    

 
  const currentstep=steps.findIndex(
    (step) => step.key === order?.orderStatus
  )
const downloadInvoice=async()=>{
    try{
         const response = await axiosInstance.get(
      API_PATHS.Invoice.generateInvoice(order._id),
      { responseType: "blob" }
    );
            const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice-${order._id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();


    }catch(err){
        console.log(err)
        toast.error("failed to download invoice")
    }
}

  return (
    <div className="lg:w-5xl m-5 p-8 relative">
        {order?.items?.map((item,index)=>(
<div key={index} className='w-full p-5 flex gap-4 mb-6 items-center bg-slate-100 rounded-3xl '>
       
        <div className='w-32'>
            <img src={item.image} alt="image"  className='w-full h-full object-cover'/>   
        </div>
        <div className='flex flex-col gap-2'>
            <div className='line-clamp-1'>{item.name}</div>
            {item.size&&(
                <div classNaame="text-xs text-gray-400">size:{item.size}</div> 
            )}
           
        </div>
       {["PLACED", "CONFIRMED"].includes(order?.orderStatus) && (
  <button className="btn-secondary flex ms-auto" onClick={()=>openDelete(order._id)}>
    Cancel
  </button>
)}

       
 
      </div>
        ))}
      <div className='flex gap-3 items-center mt-5'>
     <div className='text-sm'>OrderId</div>
     <div className='text-sm text-blue-400'>#{order?._id}</div>
      </div>
     

      <div className='w-full p-5 border border-blue-400 rounded-2xl'>
        <div className='flex justify-between'>
            <h1 className='text-green-800 font-semibold'>{order?.orderStatus} {order&&formatDate(getOrderStatusDate(order))}</h1>
           
            {order?.orderStatus==="DELIVERED"?(
                <div className="w-5 h-5 rounded bg-green-600 text-white">
                    <HiOutlineCheck className='text-xl'/>
                </div>
            ):(
                <p>{order?.orderStatus||"OnTime"}</p>

            )}
            
        </div>
        <p className='my-5'>Date left from facility</p>
        <div className='flex items-center justify-center' >
            {steps.map((step,index)=>{
                const isCompleted=index<=currentstep;
                const isLast=index===steps.length-1;
                return(
                    <div key={step.key} className="flex w-full flex-col ">
 <div className='flex w-full items-center' >
             <div className={`w-5 h-5 rounded-full  flex justify-center items-center ${isCompleted?"bg-green-600 text-white":"bg-gray-300 text-gray-500"}`}>
             {isCompleted&&<HiOutlineCheck className='text-xs'/>} 
               </div>
               {!isLast && (
          <div
            className={`flex-1 h-1 mx-2 rounded
            ${isCompleted ? "bg-green-600" : "bg-gray-300"}`}
          />
        )}
            
            </div>
              <p className="text-xs mt-2">{step.label}</p>
           
            </div>
            )
            })}
            
            </div>
             {order?.payment?.method!=="COD"&&(
                <p className='font-bold mt'>{order?.payment?.status}</p>
            )}
            </div>
           <div className='mt-8 w-full'>
            <h2 className='text-xl font-semibold my-3'>Price details</h2>
         
            <div className='flex flex-col gap-3 text-xs p-5 bg-slate-100'>
                <div className='w-full flex justify-between'>
                    <p>Subtotal</p>
                <p>${order?.subtotal}</p>
                </div>
                <div className='w-full flex justify-between'>
                    <p>shipping charge</p>
                <p>${order?.shipping}</p>
                </div>
                <div className='w-full flex justify-between border-dashed border-t mt-2'>
                    <p className='font-semibold mt-2'>Total amount</p>
                <p>${order?.total}</p>
                </div>
                <div className="p-3 border border-slate-200 flex justify-between">
                    <p>Payment method</p>
                    <p>{order?.payment?.method}</p>
                </div>
               {order?.orderStatus==="DELIVERED"&&(
                     <div className="flex items-center gap-2 justify-center p-3 bg-white" onClick={downloadInvoice}>
                    <BiDownload size={20}/>
                    <p >Download Invoice</p>
                 </div>
               )}
              

              

            </div>
            </div>
           
          <DeleteModal
            isOpen={modal.open}
            onCancel={closeDelete}
            title="Cancel Order"
            message="Are you Sure you want to cancel this order?"
            onConfirm={()=>confirmDelete({deleteApi:(id)=> axiosInstance.post(API_PATHS.Order.cancelOrder(id)),
                onSuccess:()=>{
                    toast.success("Order cancelled successfully"),
                    FetchOrder()
                }
                
            },
           
            )} />

           
      
        
      
    
    </div>
  )
}

export default Orderdetails
