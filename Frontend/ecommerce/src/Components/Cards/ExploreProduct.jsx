import React from 'react'
import CardLayout from '../Layouts/CardLayout'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'

const ExploreProduct = ({Products}) => {
  return (
   <CardLayout title='Explore Our Products' type='Our Products' showarrow={true}>
    <ProductCard margin='lg:mx-38 mx-12' scroll='flex-wrap justify-between' Products={Products}/>
    
    <Link to="/view-All?flash=false" className='btn-secondary rounded-sm px-9 mx-auto my-10 flex w-xs justify-center' type='button' >View All Products</Link>

   
   </CardLayout>
  )
}

export default ExploreProduct
