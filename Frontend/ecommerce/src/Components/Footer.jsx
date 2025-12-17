import React from 'react'
import { CiPaperplane } from "react-icons/ci";
import QR from '../../Assets/Qr Code.png'
import playstore from '../../Assets/playstore.png'
import Appstore from '../../Assets/download-appstore.png'
const Footer = () => {
  return (
    <div className='bg-black text-white flex flex-col justify-between lg:flex-row p-8'>
        <div className='flex flex-col gap-5 mb-3'>
            <h5 className='text-2xl'>Exclusive</h5>
            <a>Subscribe</a>
            <a className='text-sm font-light'>Get 10% off your first order</a>
            <div className=' border border-white rounded-sm flex justify-between'>
                <input className='w-full outline-none p-3' type='email' name="email" placeholder='Enter your email'/>
                <CiPaperplane size={10}/>
            </div>
        </div>
         <div className='flex flex-col gap-5 mb-3'>
            <h5 className='text-2xl'>Support</h5>
            <a>111 Bijoy sarani,Dhaka,DH 1515,Bangladesh</a>
            <a>exclusive@gmail.com</a>
            <a >+88015-98888-9999</a>
            
        </div>
         <div className='flex flex-col gap-5 mb-3'>
            <h5 className='text-2xl'>Account</h5>
            <a>Login/Register</a>
            <a >Cart</a>
             <a >Wishlist</a>
              <a>Shop</a>
            
        </div>
         <div className='flex flex-col gap-5 mb-3'>
            <h5 className='text-2xl'>Quick Link</h5>
            <a>Privacy Policy</a>
             <a>Terms of Use</a>
              <a>FAQ</a>
               <a>Contact</a>

            
        </div>
         <div className='flex flex-col gap-5 mb-3'>
            <h5 className='text-2xl'>Download App</h5>
            <a className='text-xs font-light text-slate-300'>Save $3 with App New User only</a>
            <div className='w-full h-full flex gap-3'>
                <div className='w-[75%] h-full'>
                     <img src={QR} alt="qrcode" className='w-full h-full object-contain'/>
                </div>
                <div className='w-full flex flex-col h-full'>
                    <img src={playstore} alt="playstore" className='w-full object-contain h-full'/>
                     <img src={Appstore} alt="playstore" className='w-full object-contain h-full'/>
                   
                </div>
            </div>
            
        </div>
        <div>

        </div>
      
    </div>
  )
}

export default Footer
