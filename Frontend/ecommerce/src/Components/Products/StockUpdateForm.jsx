import React, { useEffect, useState } from 'react'
import API from '../../Utils/adminAxios'
import { API_PATHS } from '../../Utils/Apipaths'
import toast from 'react-hot-toast'
import Addbtn from '../UI/Addbtn'
const StockUpdateForm = ({productId,setIsOpen,fetchNotifications}) => {
    console.log("this is the productId",productId)
    const [stockData,setStockData]=useState(null)
    const [value,setValue]=useState(0)
    const [loading,setLoading]=useState(false)
    useEffect(() => {
       GetStock()
      
    },[productId])
    const GetStock=async()=>{
        try{
 const {data}=await API.get(`${API_PATHS.Authadmin.Products.getStock(productId)}`)
       setStockData(data)
      setValue(data.totalStock)
       console.log(data)
        }catch(err){
            console.log(err)
        } 
    }
    const SubmitStock=async(e)=>{
        try{
          setLoading(true)
          if(!value) return alert("add stock")
          if(value<stockData.totalStock) return alert("add more not less stock")
            
            
            const {data}=await API.put(API_PATHS.Authadmin.Products.updateStock(productId),{stock:value})
            console.log(data)
            setLoading(false)
            toast.success("stock updated Successfully")
            setIsOpen(false)
    
           fetchNotifications()
        }catch(err){
            console.log(err)
            toast.error("something went wrong")
        }finally{
          setLoading(false)
        }
    }
     if (!stockData) return <p>Loading stock...</p>;
  return (
    <div className="space-y-2 flex flex-col">
      <h3 className="font-semibold">{stockData?.name}</h3>

      <p>Total stock: {stockData?.totalStock}</p>
      <div className='w-1/3 flex flex-col gap-3'>
      <input className= "rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none shadow-sm transition" type="number"  value={value} onChange={(e)=>setValue(Number(e.target.value))} min={0} onKeyDown={(e)=>{
      if(e.key==="Enter")
      SubmitStock()}}/>
      
    </div>
    <Addbtn isedit={false} loading={loading} onClick={SubmitStock} />

    </div>
  )
}

export default StockUpdateForm

