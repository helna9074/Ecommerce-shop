import React, { useEffect, useRef } from 'react'
import { FaImage } from "react-icons/fa";
import { IoMdClose } from 'react-icons/io';
const SingleImageuploader = ({name,register,setPreviewBanner,previewBanner,setValue}) => {
    const{ref,...rest}=register(name)
    const InputRef=useRef()
   
    useEffect(()=>{
        console.log(previewBanner)
    },[previewBanner])
    const HandleFile=(e)=>{
     const file=e.target.files?.[0]
     if(!file) return;
    
     if (previewBanner?.startsWith("blob:")) {
    URL.revokeObjectURL(previewBanner);
  }
   const preview= URL.createObjectURL(file)

     setPreviewBanner(preview)
     setValue("BannerImg",file)
     e.target.value=""
    }
    const RemoveImage=()=>{
    
    if (previewBanner?.startsWith("blob:")) {
      URL.revokeObjectURL(previewBanner);
    }
    setPreviewBanner(null);
    setValue(name, null);
  };
    
  return (
    <div className="flex flex-col gap-3">
         <input
           type="file"
           className="hidden"
           ref={(el) => {
             ref(el);
             InputRef.current = el;
           }}
          {...rest}
           accept="image/*"
         onChange={HandleFile}
         />
         <div
           className='w-full h-56 flex justify-center items-center group'
         >{previewBanner?
          
            <div
               onClick={() => {
                 
                 InputRef.current?.click();
               }}
              
               className="w-full h-full relative"
             >
               <img
                 src={previewBanner}
                 alt=""
                 className="w-full h-full object-contain"
               />
               <IoMdClose
                 className=" hidden group-hover:block absolute -top-5 -right-2 text-2xl rounded-full bg-slate-100  "
                 onClick={(e) => {
                   e.stopPropagation();
                   RemoveImage();
                 }}
               />
             </div>: <FaImage
           size={130}
             className="text-5xl"
             onClick={() => InputRef.current?.click()}
           />
         }
         </div>
        
       </div>
  )
}

export default SingleImageuploader
