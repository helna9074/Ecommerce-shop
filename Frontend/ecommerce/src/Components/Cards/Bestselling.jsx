import React from 'react'
import CardLayout from '../Layouts/CardLayout'
import Card from './Card'
import Cimg from '../../../Assets/Cards/Cimg.png'
import ProductCard from './ProductCard'
const Bestselling = () => {
  return (
   <CardLayout type='This month' title='Best Selling Products'>
    <div className='my-10'>
         <ProductCard margin='lg:mx-38 mx-12' scroll='flex-wrap justify-between items-center '/>
    </div>
  
           
   </CardLayout>
      
    
  )
}

export default Bestselling
