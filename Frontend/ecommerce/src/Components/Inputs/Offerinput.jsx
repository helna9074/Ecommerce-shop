import React, { useRef } from 'react'
import Input from './Input';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowDown } from "react-icons/md";
const Offerinput = ({name,register,showOffer,setShowOffer,setValue}) => {
   
    
    const InputRef=useRef()
    const {ref,...rest}=register(name)
  return (
  
          <div className="flex w-full ">
            <MdKeyboardArrowDown size={20} onClick={()=>{ const next = !showOffer;
  setShowOffer(next);
  setValue("offer", next);

  if (!next) {
    setValue("startdate", "");
    setValue("enddate", "");
    setValue("percentage", "");
  }}}/>
            <input
            
             {...rest}
              className="w-5 h-5 hidden"
              type="checkbox"
              checked={showOffer}
              ref={(el)=>{
                 ref(el)
                InputRef.current=el
              }}
              
            />
             <p className="">Offer:</p>
             
           
          </div>
         

         
       
  )
}

export default Offerinput
