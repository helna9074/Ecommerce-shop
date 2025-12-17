import React from 'react'
import CardLayout from '../Layouts/CardLayout'
import ProductCard from './ProductCard'

const ExploreProduct = () => {
  return (
   <CardLayout title='Explore Our Products' type='Our Products'>
    <ProductCard margin='lg:mx-38 mx-12' scroll='flex-wrap justify-between'/>
    
    <button className='btn-primary px-9 mx-auto my-10 flex justify-center' type='button'>View All Products</button>

   
   </CardLayout>
  )
}

export default ExploreProduct
