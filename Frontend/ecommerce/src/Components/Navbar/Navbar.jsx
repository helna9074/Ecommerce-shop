import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SeachBar from "../Inputs/SeachBar";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import useCartStore from "../../Store/Cartstore";
import useWishliststore from "../../Store/Wishliststore";
import { CgProfile } from "react-icons/cg";

import Profile from "./Profile";
import useAuthstore from "../../Store/Authstore";
const Navbar = ({ setToggle, toggle}) => {
  const navigate = useNavigate();
  const cartCount = useCartStore((s) => s.cartItems.length);

  const wishCount = useWishliststore((s) => s.wishlistCount());
  console.log('this is the the cartcount',cartCount)
   const logout=()=>{
      console.log('call getted in logout')
       useAuthstore.getState().logout()
      useCartStore.getState().clearCart();
  useWishliststore.getState().clearWishlist();
 
  
    }
  return (
    <div className="w-screen lg:px-9  pt-3 lg:pt-7 pb-2 text-black/95 text-sm bg-white border-b border-gray-400/50 flex items-center lg:justify-around justify-between fixed z-100">
      <div className="flex items-center">
        <button
          className="lg:hidden block p-2 lg:mx-2"
          onClick={() => setToggle(!toggle)}
        >
          <CiMenuBurger className=" text-black  text-sm md:text-2xl" />
        </button>
        <h2 className="lg:font-bold lg:text-2xl text-xs me-2 lg:me-0">
          Exclusive
        </h2>
      </div>
      <div className="lg:flex hidden  items-center gap-10">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/signup">Signup</Link>
      </div>

      <div className="flex items-center lg:gap-3 gap-1  mx-auto lg:mx-0">
        <div className="lg:me-0">
          <SeachBar />
        </div>
        <div className="flex ms-10 lg:ms-0 gap-3">
          <div className="relative cursor-pointer">
            <CiHeart
              className="font-semibold"
              size={25}
              onClick={() => navigate("/favourite")}
            />
            {wishCount > 0 && (
              <span
                className="
        absolute -top-2 -right-3
        bg-red-500 text-white
        text-[10px]
        w-4 h-4
         p-2
        flex items-center justify-center
        rounded-full
      "
              >
                {wishCount}
              </span>
            )}
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <IoCartOutline size={25} />

            {cartCount > 0 && (
              <span
                className="
        absolute -top-2 -right-3
        bg-red-500 text-white
        text-[10px]
        w-4 h-4
         p-2
        flex items-center justify-center
        rounded-full
      "
              >
                {cartCount}
              </span>
            )}
          </div>
         
 <Profile logout={logout}/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
