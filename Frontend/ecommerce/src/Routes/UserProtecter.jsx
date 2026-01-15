import React from 'react'
import { Outlet, replace, Navigate } from 'react-router-dom'
import useAuthstore from '../Store/Authstore'
const ProtectedRouter = () => {
    const token=useAuthstore
  return token? <Outlet/>:<Navigate to="/login"/>
    
        
 
}

export default ProtectedRouter
