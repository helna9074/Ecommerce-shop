import React, { useState } from 'react'
import CardLayout from '../Layouts/CardLayout'
import Card from './Card'
import Cimg from '../../../Assets/Cards/Cimg.png'
import ProductCard from './ProductCard'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/Apipaths'
const Bestselling = ({Products}) => {
  
  return (
   <CardLayout type='This month' title='Best Selling Products' showarrow={false} >
    <div className='my-10'>
         <ProductCard margin='lg:mx-38 mx-12' scroll='flex-wrap justify-between items-center ' Products={Products}/>
    </div>
  
           
   </CardLayout>
      
    
  )
}

export default Bestselling
