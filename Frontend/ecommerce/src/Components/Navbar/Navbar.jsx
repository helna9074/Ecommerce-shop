import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SeachBar from '../Inputs/SeachBar'
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
const Navbar = ({setToggle,toggle}) => {
     
  return (
   
    <div className='w-screen lg:px-9 px-4 pt-3 lg:pt-7 pb-2 text-black/95 text-sm  border-b border-gray-400/50 flex items-center lg:justify-around justify-between fixed '>
              <div className='flex items-center'>
                <button className='lg:hidden block p-2 lg:mx-2' onClick={()=>setToggle(!toggle)}>
                    <CiMenuBurger className=" text-black  text-sm md:text-2xl"/>
                </button>
                  <h2 className='lg:font-bold lg:text-2xl text-xs me-2 lg:me-0'>Exclusive</h2>
                </div> 
          <div className='lg:flex hidden  items-center gap-10'>
                   <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="About">About</Link>
            <Link to ="/signup">Signup</Link>
                </div>
             
                
            
      
        <div className='flex items-center lg:gap-3 gap-1  mx-auto lg:mx-0'>
             
               <div className='lg:me-0'>
                  <SeachBar/>
               </div> 
                <div className='flex ms-10 lg:ms-0'>
                    <CiHeart className='font-semibold' size={25} />
            <IoCartOutline className='font-semibold' size={25}/>
                    </div>  
            

        </div>
      
                
     
    </div>
  )
}

export default Navbar
