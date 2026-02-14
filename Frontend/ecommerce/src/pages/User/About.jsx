import React from "react";
import ShoppyImg from '../../../Assets/portrait-man-shopping-buying-consumer-goods.jpg'
import { TeamsImg } from "../../Utils/data";
import { FaInstagram } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
const About = () => {
  return (
    <div className="">
         <div className="flex gap-2  w-sm justify-center p-8">
        <p className="text-slate-400">Home /</p>
        <p className="text-black">About</p>
      </div >
    <div className="flex  w-full flex-col justify-center gap-5 items-center">
    
      <div className="w-full flex lg:flex-row flex-col justify-center items-center mb-10">
        <div className="lg:w-1/2 lg:p-5 p-3 ">
          <h1 className="font-bold mb-5 text-5xl text-center">Our Story</h1>
          <p className="flex flex-col gap-3">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.<p>Exclusive has more than 1 Million products to
            offer, growing at a very fast. Exclusive offers a diverse assotment
            in categories ranging from consumer.</p>
          </p>
        </div>
        <div className="w-1/2 ">
        <img src={ShoppyImg} alt=""  className="w-full h-full object-contain"/>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-10">
        {TeamsImg.map((item) => (
        <div className="flex flex-col w-56 border border-slate-300 h-80 text-center">
            
                 <div key={item.id} className="w-full h-52">
                <img src={item.img} alt="" className="w-full h-full object-fill"/>

            </div>
            <div className="flex justify-between flex-col">
                <p className="font-bold">{item.name}</p>
                <p className="text-slate-400">{item.role}</p>
                 </div>
                <div className="flex gap-5 mx-auto">
                  <FaInstagram />
                  <CiTwitter />
                  <FaLinkedinIn />
                </div>
           
            </div>
            ))}
           
        
      </div>
    </div>
    </div>
  );
};

export default About;
