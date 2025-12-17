import React, { useRef, useState } from 'react'
import { FaImage } from "react-icons/fa";
 
import { IoMdClose } from "react-icons/io";
  
const Imageupload = ({previewImages,setPreviewImages,register,name,error,size,className,mode}) => {
    const fileRef = useRef();
   const [currentIndex, setCurrentIndex] = useState(null);
  const {ref,onChange,...rest}=register(name)
    const handleFiles=(e)=>{
   
  
   
   
const files = Array.from(e.target.files);
onChange(e)
              const urls = files.map((file) => URL.createObjectURL(file));
              console.log(urls)
              setPreviewImages((prev) => {
                 if(mode==="single"){
      return[urls[0]]
      
    }
    console.log(setPreviewImages)
  
                const updated = [...prev];
                if (currentIndex !== null) {
                  urls.forEach((url, i) => {
                    updated[currentIndex] = url;
                  });
                } else {
                  updated.push(...urls);
                }

                return updated.slice(0, 5);
              });
              setCurrentIndex(null);
              console.log("selectedimages",previewImages)
            }
            const handleBoxClick = (index) => {
    setCurrentIndex(index);
    fileRef.current?.click();
  };
  const handleRemove = (index) => {
    if(mode==='single'){
      setPreviewImages([])
      onChange({target:{files:[]}})
      return;
    }
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    const input = fileRef.current;
    // if (input && input.files) {
    //   const dt = new DataTransfer(); // create new file list
    //   Array.from(input.files)
    //     .filter((_, i) => i !== index)
    //     .forEach((file) => dt.items.add(file));
    //   input.files = dt.files;  // overwrite original FileList
    //   onChange({ target: { files: dt.files } }); // update useForm store
    // }
  };
  return (
    <div>
        <div className="">
          <input
            type="file"
            style={{ display: "none" }}
            multiple={mode==='multiple'}
            {...rest}
            ref={(el) => {
             ref(el);
              fileRef.current = el;
            }}
            accept="image/*"
            className="w-32"
            onChange={(e) => {
              handleFiles(e)
            }}
          />
           {mode === "single" ? (
        <div
          className={`w-40 h-40 border rounded-md flex items-center justify-center shadow cursor-pointer ${className}`}
          onClick={() => fileRef.current?.click()}
        >
          {Array.isArray(previewImages)&&previewImages[0] ? (
            <div className="relative w-full h-full">
              <img
                src={previewImages[0]}
                className="w-full h-full object-contain rounded-md"
              />

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(0);
                }}
                className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow"
              >
                <IoMdClose size={14} />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <FaImage size={size || 40} className="mx-auto text-gray-400" />
              <p className="text-xs text-gray-400">Upload Image</p>
            </div>
          )}
        </div>
      ) :(
        
          <div
            className={`text-7xl text-center ${className} p-5  rounded-md border border-gray-300 text-gray-700 outline-none  shadow-sm transition flex-col `}
            onClick={() => fileRef.current?.click()}
          >
            <div className='flex justify-center items-center w-full text-center mx-auto '>
               <FaImage size={size}  className=" " />
            
            </div>
           <p className="text-xs text-slate-400 whitespace-nowrap text-center">
              upload Image
            </p>
          </div>
      )}
          {error&&<p className='text-sm text-red-500'>{error}</p>}
        </div>

        {/* image uploads */}
        {mode==='multiple'&&
        <div className="flex flex-wrap gap-4 ">
          <div className="flex flex-wrap gap-4 w-full">
            {previewImages.map((url, index) => (
              <div
                key={index}
                className="w-28 h-28 rounded-md border p-3 border-gray-300  relative  text-gray-700 outline-none   shadow-sm transition "
                onClick={() => handleBoxClick(index)}
              >
                {url ? (
                  <img
                    src={url}
                    className="h-full w-full object-contain "
                    alt="image"
                  />
                ) : (
                  <p className="text-xs text-gray-400">No Image</p>
                )}
                <button
                  className=" absolute -top-2 -right-3  z-20 p-2  rounded-full  hover:bg-white bg-slate-100 "
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                >
                  <IoMdClose size={15} className="text-2xl" />
                </button>
              </div>
            ))}
          </div>
        </div>
}
    </div>
   
  )
}

export default Imageupload
