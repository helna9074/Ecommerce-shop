import React from 'react'
import { Outlet, replace, Navigate } from 'react-router-dom'
import useAdminStore from '../Store/Adminstore'
const ProtectedRouter = () => {
   const {isAuthenticated}=useAdminStore();
  return isAuthenticated? <Outlet/>:<Navigate to="/admin/login"/>
    
        
 
}

export default ProtectedRouter
