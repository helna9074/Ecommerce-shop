import React from 'react'
import { CiSearch } from "react-icons/ci";
const SeachBar = () => {
  return (
    <div className='flex justify-between items-center lg:px-3 p-1  lg:py-1.5 text-gray-400  font-light bg-[#F5F5F5] w-[150px] md:w-[250px]'>
      <input className='lg:text-sm text-xs text-black outline-none w-full' type='text' id="search" name="search" placeholder='What are you looking for?'/>
      <CiSearch className='text-black font-semibold' size={20}/>
    </div>
  )
}

export default SeachBar
