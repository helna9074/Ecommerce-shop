import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import AdminHome from '../pages/Admin/Home'
import HomeLayout from '../Components/Layouts/HomeLayout'
import Home from '../pages/User/Home'
import UserLogin from '../pages/User/UserLogin'
import AdminLayout from '../Components/Layouts/AdminLayout'
import Category from '../pages/Admin/Category'
import ProductView from '../pages/User/ProductView'
import UserSignup from '../pages/User/Signup'
import AdminLogin from '../pages/Admin/AdminLogin'
import ProtectedRouter from './AdminProtector'
import Cart from '../pages/Cart'
import Products from '../pages/Admin/Products'
import Banner from '../pages/Admin/Banner'


    const router=createBrowserRouter([
        
        {
        path:"/",
        element:<HomeLayout/>,
        children:[
            {
            index:true,
            element:<Home/>,
            },{
       path:'/product-view',
        
        element:<ProductView/>

                

      

    },{
        path:'/cart',
        element:<Cart/>
    },{
        path:'/login',
        element:<UserLogin/>
    },{
        path:'/signup',
        element:<UserSignup/>
    },
]  
    },
    {
       path:"/admin/login",
       element:<AdminLogin/>
    },{ 
        path:'/admin',
        element:<ProtectedRouter/>,
        children:[
           {
            path:"",
        element:<AdminLayout/>,
        children:[{
              index:true,
        element:<AdminHome/>
        },{
            path:'category',
            element:<Category/>
        },{
            path:'products',
            element:<Products/>
        },{
            path:'Banner',
            element:<Banner/>
        }

        ]
      
    }
           
        ]
    }
       
   
])



export default router
