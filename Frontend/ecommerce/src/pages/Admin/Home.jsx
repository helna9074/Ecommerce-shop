import React from 'react'
import AdminNav from '../../Components/Navbar/AdminNav'
import AdminMenu from '../../Components/Navbar/AdminMenu'
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
