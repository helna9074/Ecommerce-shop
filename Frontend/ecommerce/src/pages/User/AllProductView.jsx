import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/Cards/ProductCard'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/Apipaths'
import Pagination from '../../Components/UI/Pagination'
import { useSearchParams } from 'react-router-dom'

const AllProductView = () => {
  const[products,setProducts]=useState([])
  const[currentPage,setCurrentPage]=useState(1)
  const[totalPages,setTotalPages]=useState(1)
  const [searchParams]=useSearchParams()
  const flash=searchParams.get('flash')

    useEffect(()=>{
       getFlashProducts(currentPage)
    },[currentPage,flash])
    const getFlashProducts=async(page=1)=>{
        try{
          const {data}=await axiosInstance.get(`${API_PATHS.Products.getProducts}?flash=${flash}&page=${page}`)
          console.log(data)
          setProducts(data.products)
setCurrentPage(data.pagination.currentPage)
setTotalPages(data.pagination.totalPages)
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className='mt-20'>
      <ProductCard margin='lg:mx-38 mx-12' scroll='flex-wrap justify-between' Products={products}/>
      <Pagination
       currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}/>
    </div>
  )
}

export default AllProductView
