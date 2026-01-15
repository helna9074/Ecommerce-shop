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
        element: <UserProtector />,
        children: [
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "favourite",
            element: <WhishList />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
          {
            path: "view-All",
            element: <AllProductView />,
          },
          {
            path: "account",
            element: <Account/>,
            children:[
                {index:true,element:<Profile/>},
                {path:'profile',element:<Profile/>},
                {path:'myaddress',element:<Address/>}
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
          },
          {
            path: "Banner",
            element: <Banner />,
          },
        ],
      },
    ],
  },
]);

export default router;
