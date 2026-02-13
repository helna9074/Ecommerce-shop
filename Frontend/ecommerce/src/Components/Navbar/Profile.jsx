import React from 'react'
import { Fragment } from "react";
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { IoPersonOutline } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";
import useAuthstore from '../../Store/Authstore';
import toast from 'react-hot-toast';

const Profile = ({logout}) => {
    const navigate = useNavigate();
   const {isAuthenticated}=useAuthstore()

  return (
   <Menu as="div" className="relative">
  {/* Menu Button */}
  <MenuButton className="focus:outline-none">
    <CgProfile size={25} className="hover:text-red-500 cursor-pointer" />
  </MenuButton>
   <Transition
        as={Fragment}
        enter="transition ease-out duration-600"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >

  {/* Menu Items */}
  <MenuItems className="absolute right-0 mt-2 text-white w-44 rounded-lg bg-[#000000]/50 shadow-lg focus:outline-none z-150">
    <div className="py-1 ">
      <MenuItem>
        {({ active }) => (
          <button
            onClick={() => navigate("/account/myprofile")}
            className={`${
              active ? "bg-gray-500" : ""
            } w-full px-4 py-2 text-left text-sm flex gap-3 items-center`}
          >
        <IoPersonOutline size={20}/>Profile
          </button>
          
        )}
        
      </MenuItem>

      <MenuItem>
        {({ active }) => (
          <button
            onClick={() => navigate("/account/myorders")}
            className={`${
              active ? "bg-gray-500" : ""
            } w-full px-4 py-2 text-left text-sm flex gap-3 items-center`}
          >
          <FiShoppingBag size={20}/> My Orders
          </button>
        )}
      </MenuItem>

     
      <hr className="my-1" />

      <MenuItem>
        {({ active }) => 
      isAuthenticated?(
          <button
            onClick={() => {
              // logout logic here
              logout()
              toast.success("Logout successfully")
            }}
            className={`${
              active ? "bg-red-500" : ""
            } w-full px-4 py-2 text-left text-sm flex gap-3 items-center `}
          >
          <HiOutlineArrowLeftStartOnRectangle size={20}/> Logout
          </button>
        ):(
          <button
            onClick={() => {
              // logout logic here
              navigate('/login')
            }}
            className={`${
              active ? "bg-red-500" : ""
            } w-full px-4 py-2 text-left text-sm flex gap-3 items-center `}
          >
          <HiOutlineArrowLeftStartOnRectangle size={20}/> Login
          </button>
        )
          
        }
      </MenuItem>
    </div>
  </MenuItems>
  </Transition>
</Menu>

  )
}

export default Profile
