import React from 'react'
import ProductCard from '../Cards/ProductCard'
import { useEffect } from 'react';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/Apipaths';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import Orderproduct from '../Cards/Orderproduct';
import Pagination from '../UI/Pagination';
import SearchField from '../Inputs/SearchField';
import emptyOrderbox from '../../../Assets/emptyorderbox.jpg'
import Spinner from '../UI/Spinner';

const Orders = () => {
  const {handleActive}=useOutletContext();
  const[Orders,setOrders]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const[search,setSearch]=useState('')
  const[totalPages,setTotalPages]=useState(1) 
  const navigate=useNavigate()
  const [hasFetched, setHasFetched] = useState(false);
  const[loader,setLoader]=useState(false)
  useEffect (()=>{
    handleActive('Orders')
   
  },[])
  useEffect(()=>{
    const delay=setTimeout(()=>{
      FetchOrders(currentPage)
    },400)
    return ()=>clearTimeout(delay)
   
  },[currentPage,search])
  const FetchOrders=async(page=1)=>{
    try{
      setLoader(true)
        const{data}=await axiosInstance.get(`${API_PATHS.Order.getOrders}?page=${page}&search=${search}`)
        console.log(data)
        setTotalPages(data.pagination.totalPages)
        setCurrentPage(data.pagination.currentPage)
        
          setOrders(data.orders)
         setHasFetched(true)
        
    }catch(err){
console.log(err)
    }finally{
     setTimeout(() => setLoader(false), 300);
    }
  }

  return (
   <div className='lg:w-5xl'>
    
      {loader ? (
      <Spinner />
    ) : (
      <>
        {hasFetched && Orders.length === 0 && !search && (
          <div className="flex flex-col items-center text-center lg:w-full bg-white ">
            <h1 className="text-xl font-bold text-green-700">
              NO Order Found
            </h1>
            <img
              src={emptyOrderbox}
              className="w-1/2 object-contain"
              alt=""
            />
            <button
              className="btn-primary"
              onClick={() => navigate("/view-All")}
            >
              Shop Now
            </button>
          </div>
        )}
        </>
    )}
        {!loader && Orders.length === 0 &&hasFetched&& search && (
          
    <div className="text-gray-500  py-10 flex  flex-col justify-between items-center font-semibold mb-5 ">
      <SearchField value={search} onChange={(e)=>{setSearch(e.target.value); setCurrentPage(1)}} width="lg:w-1/2 w-full"/>
     <p className='mt-10'>No orders match your search</p>  
    </div>
  )}
     
  {!loader && Orders.length > 0 && (
      <div className='flex flex-col gap-4 rounded-2xl lg:w-5xl bg-white items-center'>
      <SearchField value={search} onChange={(e)=>{setSearch(e.target.value); setCurrentPage(1)}} width="w-1/2" />
      <div className='lg:w-full'>
      <Orderproduct products={Orders}/>
      </div>
       <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
    </div>
      )} 
    
 </div>
  )
}

export default Orders
