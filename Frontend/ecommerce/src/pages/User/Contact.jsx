import React from 'react'
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import Input from '../../Components/Inputs/Admininput'
const Contact = () => {
  return (
    <div className="flex flex-col">
         <div className="flex gap-2  w-sm justify-center p-8">
        <p className="text-slate-400">Home /</p>
        <p className="text-black">About</p>
      </div >
    <div className="flex  w-full  gap-4.5 items-center">
        <div className='flex flex-col  gap-10 text-center justify-center w-1/2'>
            <div className='flex gap-3 flex-col '>
                <div className='flex justify-center'>
                <div className='w-6 h-6 rounded-full bg-red-600 justify-center items-center'>
                    <IoCallOutline className='text-white flex text-sm mx-auto'/> 
                    </div>
                    <p>Call To Us</p>
               </div>
                <p>We are available24/7,7days a weak</p>
                <p>Phone:+8801 234 5678</p>
               
            </div>
             <div className='flex gap-3 '>
                <div className='w-6 h-6 rounded-full bg-red-600 '>
                    <CiMail className='text-white'/>
                    <p>Write To Us</p>
                </div>
                <p>Fill out our form and we will contact you within 24 hours</p>
                <p>Email:customer@exclusive.com</p>
               <p>support@exclusive.com</p>
            </div>
            </div>
          
    
        <div className="flex w-1/2  flex-col gap-5">
                <div className='flex gap-5'>
                 <Input type="text" placeholder="Name"/>
                 <Input type="email" placeholder="Email"/>
                 <Input type='text' placeholder="Your Phone"/>
                </div>
                <div className='w-full h-3xl'> 
 <Input type="text" placeholder="Your massage" className='w-full h-full'/>
                </div>
               <button className='btn-secondary'>Send Massage</button>S
            </div>
            </div>
    </div>
  )
}

export default Contact
