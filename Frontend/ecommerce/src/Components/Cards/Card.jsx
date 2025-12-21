import React from 'react'

import CardLayout from '../Layouts/CardLayout'
import ProductCard from './ProductCard'
const Card = ({Products=[]}) => {
  if(!Array.isArray(Products)) return null;
  
  return (
  
       <CardLayout type='Todays' title='Flash Sales' timer={true}>
       <ProductCard scroll=" overflow-x-auto  scroll-smooth whitespace-nowrap gap-2 md:gap-8" Products={Products}/>
       <button className='btn-primary px-9 mx-auto my-10 flex justify-center' type='button'>View All Products</button>
      </CardLayout>
     
  )
}

export default Card
