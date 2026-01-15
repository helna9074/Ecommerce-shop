import React from 'react'
import { IoCartOutline } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { TbDeviceWatchStats } from "react-icons/tb";
import { CiHeadphones } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { VscGame } from "react-icons/vsc";
import CardLayout from '../../Components/Layouts/CardLayout'
const Categorycard = () => {
  return (
    
         <CardLayout title="Browse by Categories" type='Categories'showarrow={true}>

        
        <div className='mt-15   flex  lg:gap-18 md:gap-10 gap-2  flex-wrap mb-20 md:mx-38 mx-12'>
                  <div className='md:w-35 w-full h-25 p-7  shrink-0 flex text-center border border-gray-400'>
                       <MdOutlinePhoneIphone className='mx-auto ' size={40}/>
                  </div>
                   <div className='md:w-35 w-full  h-25  p-7  shrink-0 flex text-center border border-gray-400'>
                       <HiOutlineComputerDesktop className='mx-auto ' size={40}/>
                  </div>
                   <div className='md:w-35 w-full  h-25  p-7  shrink-0 flex text-center border border-gray-400'>
                       <TbDeviceWatchStats className='mx-auto ' size={40}/>
                  </div>
                     <div className='md:w-35 w-full  h-25  p-7  shrink-0 flex text-center border border-gray-400'>
                       <CiHeadphones className='mx-auto ' size={40}/>
                  </div>
                   <div className='md:w-35 w-full  h-25  p-7  shrink-0 flex text-center border border-gray-400'>
                       <CiCamera className='mx-auto ' size={40}/>
                  </div>
                    <div className='md:w-35 w-full  h-25  p-7  shrink-0 flex text-center border border-gray-400'>
                       <VscGame className='mx-auto ' size={40}/>
                  </div>
                  </div>
                   </CardLayout>
        
  )
}

export default Categorycard
