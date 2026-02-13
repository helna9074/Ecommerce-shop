import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/Cards/ProductCard'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/Apipaths'
import Pagination from '../../Components/UI/Pagination'
import { useSearchParams } from 'react-router-dom'
import { set } from 'date-fns'
import { PaginationSkeleton } from '../../Components/UI/shadcnUI/SkeletonPagination'

const AllProductView = () => {
  const[products,setProducts]=useState([])
  const[currentPage,setCurrentPage]=useState(1)
  const[totalPages,setTotalPages]=useState(1)
  const [searchParams]=useSearchParams()
 const[loading,setLoading]=useState(false)
  const flash=searchParams.get('flash')
   const type=searchParams.get('type')
const query=searchParams.get('q')
useEffect(()=>{
window.scrollTo({
  top: 0, // navbar height
  behavior: "smooth",
});

},[currentPage])
    useEffect(()=>{
      if(query){
        fetchSearchProducts(currentPage)
      }
     else if(type==='best-selling'){
        FetchBestSellings(currentPage)
      }else {
        getFlashProducts(currentPage)
      }
    
    },[currentPage,flash,type,query])
    const fetchSearchProducts = async (page) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(`${API_PATHS.Search.getSearchProducts}?q=${query}&page=${page}`);

    setProducts(data.products);
    console.log("searched data", data);
    setTotalPages(data.pagination.totalPages);
  } catch (err) {
    console.log("search error", err);
  } finally {
    setLoading(false);
  }
};
    const getFlashProducts=async(page=1)=>{
        try{
          setLoading(true)
          const {data}=await axiosInstance.get(`${API_PATHS.Products.getProducts}?flash=${flash}&page=${page}`)
          console.log(data)
          setProducts(data.products)
setCurrentPage(data.pagination.currentPage)
setTotalPages(data.pagination.totalPages)
        }catch(err){
            console.log(err)
        }finally{
          setLoading(false)
        }
    }
    
      const FetchBestSellings=async()=>{
        try{
          setLoading(true)
          console.log("call getted here")
          const {data}=await axiosInstance.get(API_PATHS.Products.getBestSellings)
         console.log("this is the all bestsellings",data)
          setProducts(data.products)
        }catch(err){
          console.log(err)
      
      }finally{
        setLoading(false)
      }
    }
  return (
    <div className='mt-20'>
      {products.length===0?<h1 className='text-center text-2xl font-bold'>No products found</h1>:null}
      <ProductCard margin='lg:mx-38 mx-12' scroll='flex-wrap justify-center' Products={products} isLoading={loading}/>
      {loading?<PaginationSkeleton/>:(
<Pagination
       currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}/>
      )}
      
    </div>
  )
}

export default AllProductView
