import React from 'react'
import { Outlet, replace, Navigate } from 'react-router-dom'
const ProtectedRouter = () => {
    const token=localStorage.getItem("admintoken")
  return token? <Outlet/>:<Navigate to="/admin/login"/>
    
        
 
}

export default ProtectedRouter
