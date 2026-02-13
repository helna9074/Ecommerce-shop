import React, { useEffect, useState } from 'react'
import { Outlet, replace, Navigate } from 'react-router-dom'
import useAuthstore from '../Store/Authstore'


const ProtectedRouter = () => {
    const {isAuthenticated}=useAuthstore()
   
  return isAuthenticated? <Outlet/>:<Navigate to="/login" replace/>
    
        
 
}

export default ProtectedRouter
