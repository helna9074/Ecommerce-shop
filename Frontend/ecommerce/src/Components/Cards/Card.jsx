import React, { useRef } from 'react'

import CardLayout from '../Layouts/CardLayout'
import ProductCard from './ProductCard'
import { useNavigate } from 'react-router-dom'
const Card = ({Products=[]}) => {
  const navigate=useNavigate()
  if(!Array.isArray(Products)) return null;
  const slideRef=useRef(null)
  
  return (
  
       <CardLayout type='Todays' title='Flash Sales' isflashsale={true} showarrow={true} onLeft={()=>slideRef.current?.scrollLeft()} onRight={()=>slideRef.current?.scrollRight()}>
       <ProductCard scroll=" overflow-x-auto  scroll-smooth whitespace-nowrap gap-2 md:gap-8" Products={Products} ref={slideRef} />
       <button className='btn-secondary  px-9 mx-auto my-10 flex justify-center' type='button' onClick={()=>navigate("/view-All?flash=true")}>View All Products</button>
      </CardLayout>
     
  )
}

export default Card
