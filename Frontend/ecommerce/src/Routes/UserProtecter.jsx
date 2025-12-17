import React from 'react'
import { Outlet, replace, Navigate } from 'react-router-dom'
const ProtectedRouter = () => {
    const token=localStorage.getItem("usertoken")
  return token? <Outlet/>:<Navigate to="/login"/>
    
        
 
}

export default ProtectedRouter
