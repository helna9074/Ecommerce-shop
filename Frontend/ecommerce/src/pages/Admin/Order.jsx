import React, { useEffect, useState } from 'react'
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
import Table from '../../Components/UI/Table'
import API from '../../Utils/adminAxios';
import { API_PATHS } from '../../Utils/Apipaths';
import { useOutletContext } from 'react-router-dom';
import Pagination from '../../Components/UI/Pagination';
import SearchField from '../../Components/Inputs/SearchField';
import { formatDate } from '../../Utils/helper';
import { MdOutlineLocalShipping } from "react-icons/md";
import { TiInputCheckedOutline } from "react-icons/ti";
import {  } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { BsPersonBoundingBox } from "react-icons/bs";
import { BsBox2 } from "react-icons/bs";
import { Orderbtn } from '../../Utils/data';
import toast from 'react-hot-toast';
import {getOrderStatusDate} from '../../Utils/helper'
import Modal from '../../Components/UI/Modal';
import ViewCustomer from '../../Components/Order/ViewCustomer';
import ViewProduct from '../../Components/Order/ViewProduct';
import { PaginationSkeleton } from '../../Components/UI/shadcnUI/SkeletonPagination';
const Order = () => {
    const {handleActive}=useOutletContext();
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
 const[orders,setOrders]=useState([])
 const[search,setSearch]=useState('')
 const[openMenuId,setOpenMenuId]=useState(null)
 const[Activebtn,setActivebtn]=useState('All')
 const [startDate,setStartDate]=useState(null)
 const [endDate,setEndDate]=useState(null)
 const[loading,setLoading]=useState(false)
 const [showCustomer,setshowCustomer]=useState({
    isshow:false,
    selectedOrder:null
 })
 const[showProduct,setShowProduct]=useState({
    isShow:false,
    selectedProduct:null
 })
    const status=[
        {id:1,title:"Total Revenue"},
        {id:2,title:"Total customers"},
        {id:3,title:"Total transactions"},
        {id:4,title:"Total products"}
    ]
    const colums=[
        {key:"No",label:"Order Id"},
        {key:"customer",label:"Customer"},
        {key:"date",label:"Date"},
        {key:"item",label:"Item"},
        {key:"total",label:"Total"},
        {key:"status",label:"PaymentStatus"},
        
        ...(Activebtn==="All"?[{key:"orderstatus",label:"OrderStatus"}]:[]),
        {key:"menu",label:"Action"},

    ]
    const actionConfig={
        PLACED:{label:"CONFIRM",nextStatus:"CONFIRMED"},
        CONFIRMED:{label:"SHIP",nextStatus:"SHIPPED"},
        SHIPPED:{label:"DELIVER",nextStatus:"DELIVERED"},
       CANCEL_REQUESTED: { label: "APPROVE", nextStatus: "CANCELLED" },
        
 } 
useEffect(()=>{
    handleActive("Orders");
    
},[])
    useEffect(()=>{
      
        FetchOrders(currentPage)
    },[currentPage,Activebtn])
    useEffect(() => {
  const handleClickOutside = () => {
    setOpenMenuId(null);
  };

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);
useEffect(()=>{
 const timer=setTimeout(() => {
    setCurrentPage(1)
   FetchOrders(1)
 },500)
 return()=>clearTimeout(timer)
},[search,startDate,endDate])
const FetchOrders=async(page=1)=>{
    try{
        setLoading(true)
        const params={
            limit:10,
            page,
        };
        if(search.trim()) params.search=search;
      if(Activebtn!=="All") params.status=Activebtn;
      if(startDate) params.startDate=startDate;
      if(endDate) params.endDate=endDate
        const {data}=await API.get(API_PATHS.Authadmin.Orders.AllOrders,{params})
          const normalizedOrders = data.orders.map(order => ({
    ...order,
    statusDate: getOrderStatusDate(order),
  }));
        console.log(data)
         setCurrentPage(data.pagination.currentPage)
         setTotalPages(data.pagination.totalPages)
         setOrders(normalizedOrders)
    }catch(err){
        console.log(err)
    }finally{
        setLoading(false)
    }
}
const PAGE_SIZE=10;
const handleOrderAction=async(id,nextStatus)=>{
    try{
        const {data}=await API.put(API_PATHS.Authadmin.Orders.updateOrder(id),{
            status:nextStatus
        })
        if(data.success){
            toast.success(data.message)
            FetchOrders(currentPage)
        }
        console.log(data)
        
    }catch(err){
        console.log(err)
    }
}
const handleRefund=async(id)=>{
    try{
        const {data}=await API.post(API_PATHS.Authadmin.Orders.refundOrder(id))
        if(data.success){
            toast.success(data.message) 
            FetchOrders(currentPage)
        }
       
        
        console.log(data)
        
    }catch(err){
        console.log(err)
    }
}
const tableData=orders.map((order,index)=>({

    id:order._id,
    No:String((currentPage - 1) * PAGE_SIZE + index + 1).padStart(3, "0"),

    customer:order.user.firstname,
   date: order.statusDate ? formatDate(order.statusDate) : "-",

    item:order.items.length,
    total:order.total,
    status:(
        
        <div className={`${order.payment.status==="PENDING"?'text-red-800 bg-red-400 ':'bg-white text-green-500 '} w-1/3 text-center rounded-sm my-3 shadow-sm`}>
             <p>{order.payment.status}</p>
        </div>
    ),
   ...(Activebtn==="All"&&{
    orderstatus:(
       
            <div className="flex gap-2 items-center bg-slate-50 w-1/2 shadow-sm p-2 rounded-sm my-2">
          
            {order.orderStatus==="SHIPPED"&&<MdOutlineLocalShipping size={20} color="green"/>}
           {["PLACED", "CONFIRMED", "DELIVERED"].includes(order.orderStatus) && (
  <TiInputCheckedOutline size={20} className="text-green-600" />
)}

            <p>{order.orderStatus}</p>
        </div>
      
    ),
}),
    menu:(
        <div className="relative my-2">
            
     {Activebtn === "CANCELLED" &&
  order.payment.method !== "COD" &&
  order.payment.status === "REFUND_INITIATED" ? (
    <button
      onClick={() => handleRefund(order._id)}
      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
    >
      REFUND
    </button>


      
 ):(
 <div className="flex w-full gap-2">
       
            {Activebtn!=="All"&&actionConfig[Activebtn]&&(
                 <button
        onClick={() =>
          handleOrderAction(order._id, actionConfig[Activebtn].nextStatus)
        }
        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
      >
        {actionConfig[Activebtn].label}
      </button>
            )}
             <BsThreeDots size={20} className="flex  cursor-pointer" onClick={(e)=>{setOpenMenuId(prev=>prev===order._id?null:order._id); e.stopPropagation()}}/>
            </div>
  )}
        
           
           
            {openMenuId===order._id&&(
               <div className="absolute right-4 top-4 z-50">

      <div className="w-44 bg-white border rounded-md shadow-lg">
        <div className='w-full px-4 py-2 text-left hover:bg-gray-100 flex gap-2 whitespace-nowrap'onClick={()=>setshowCustomer({isshow:true,selectedOrder:order})}>
        
          <BsPersonBoundingBox size={25} color='blue'/> 
          <p>Customer Details</p>
       
        </div>
       <div className='w-full px-4 py-2 text-left hover:bg-gray-100 flex gap-2 whitespace-nowrap' onClick={()=>setShowProduct({isShow:true,selectedProduct:order})}>
        
          <BsBox2 size={20} className='text-yellow-600'/> 
          <p>Product Details</p>
       
        </div>
       
      </div>

    </div>

            )}
    </div>       
           
    )



}))
  return (
    <div className='w-full p-3 flex flex-col gap-5'>
       
        <div className='w-full flex gap-3 p-3 bg-slate-100 '>
            {Orderbtn.map((btn)=>(
                <button key={btn.id} className={`${Activebtn===btn.label?"order-box":"bg-slate-200 p-3 rounded"}`} onClick={()=>{setActivebtn(btn.label);setCurrentPage(1)}}>{btn.label}</button>
            ))}
          
         
        </div>
          <div className='flex gap-3 items-center'>
            <SearchField value={search} onChange={(e)=>{setSearch(e.target.value);setCurrentPage(1)}} width="w-1/5"/> 
                <div className='flex mt-3 gap-5'>
             
                   
                <input type="date" className='rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none shadow-sm transition ' onChange={(e)=>setStartDate(e.target.value)}/>
             
                
                
                <input type="date" className=' rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none shadow-sm transition' onChange={(e)=>setEndDate(e.target.value)}/>
            
                </div>
          </div>
       <Table colums={colums} data={tableData} isLoading={loading}/>
       {loading?<PaginationSkeleton/>:(
<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page)=>setCurrentPage(page)}/>
       )}
       
        <Modal modalIsOpen={showCustomer.isshow} onClose={()=>setshowCustomer({isshow:false,selectedOrder:null})} title="Customer Details" width="w-1/2">
            <ViewCustomer order={showCustomer.selectedOrder} />
            </Modal>
            <Modal modalIsOpen={showProduct.isShow} onClose={()=>setShowProduct({isShow:false,selectedProduct:null})} title="Product Details" width="w-1/2">
            <ViewProduct order={showProduct.selectedProduct} Activebtn={Activebtn} />
            </Modal>
    </div>
   
  )
}

export default Order
