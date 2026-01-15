import React from 'react'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

const Home = () => {
const {handleActive}=useOutletContext();
  useEffect(()=>{
    handleActive('Dashboard')
  },[])
  return (
  <div>
     
  </div>
  )
}

export default Home
