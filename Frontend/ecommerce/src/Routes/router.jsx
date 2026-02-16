import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminHome from "../pages/Admin/Home";
import HomeLayout from "../Components/Layouts/HomeLayout";
import Home from "../pages/User/Home";
import UserLogin from "../pages/User/UserLogin";
import AdminLayout from "../Components/Layouts/AdminLayout";
import Category from "../pages/Admin/Category";
import ProductView from "../pages/User/ProductView";
import UserSignup from "../pages/User/Signup";
import AdminLogin from "../pages/Admin/AdminLogin";
import ProtectedRouter from "./AdminProtector";
import UserProtector from "./UserProtecter";
import Cart from "../pages/User/Cart";
import Products from "../pages/Admin/Products";
import Banner from "../pages/Admin/Banner";
import WhishList from "../pages/User/WhishList";
import Checkout from "../pages/User/Checkout";
import AllProductView from "../pages/User/AllProductView";
import Account from "../pages/User/Account";
import Profile from "../Components/Accounts/Profile";
import Address from "../Components/Accounts/Address";
import AllOrder from "../pages/Admin/Order";
import Orderdetails from "../Components/Accounts/Orderdetails";
import Orders from "../Components/Accounts/Orders";
import Users from "../pages/Admin/Users";
import Expense from "../pages/Admin/Expense";
import Notifications from "../pages/Admin/Notifications";
import Report from "../pages/Admin/Report";
import About from "../pages/User/About";
import NotFound from "../pages/User/NotFound";
import  Contact from "../pages/User/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product-view/:id",

        element: <ProductView />,
      },
      {
            path: "cart",
            element: <Cart />,
          },
          {
            path:'about',
            element:<About/>
          },
          {
            path:'*',
            element:<NotFound/>
          },
          {
            path:"contact",
            element:<Contact/>
          },
           {
            path: "view-All",
            element: <AllProductView />,
          },
      {
        element: <UserProtector />,
        children: [
          
          {
            path: "favourite",
            element: <WhishList />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
         
          {
            path: "account",
            element: <Account/>,
            children:[
              {index:true,element:<Profile/>},
                {path:'myprofile',element:<Profile/>},
                {path:'myaddress',element:<Address/>},
                {path:'myorders',element:<Orders/>},
                {path:'orderDetails/:orderId',element:<Orderdetails/>}
            ]
          },
        ],
      },
      {
        path: "login",
        element: <UserLogin />,
      },
      {
        path: "signup",
        element: <UserSignup />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
   
    element: <ProtectedRouter />,
    children: [
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminHome />,
          },
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "products",
            element: <Products />,
          },{
            path:'Banner',
            element:<Banner/>
          },
          {
            path: "Banner/:id",
            element: <Banner />,
          },{
            path:"orders",
            element:<AllOrder/>
          },{
            path:"users",
            element:<Users/>
          },{
            path:"expense",
            element:<Expense/>
          },{
            path:"notifications",
            element:<Notifications/>
          },{
            path:'reports',
            element:<Report/>
          }
        ],
      },
    ],
  },
]);

export default router;
