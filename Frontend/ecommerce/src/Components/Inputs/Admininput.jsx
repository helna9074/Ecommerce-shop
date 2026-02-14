import React from "react";

const Admininput = ({
  name,
  placeholder,
  type = "text",
  className = "",
  min,
  max,
  accept,
  multiple,
  options = [],
  select = false,
  textarea = false,
  register,
  label,
  error,
  onKeyDown,
  size
}) => {
  const baseClasses =
    "rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none shadow-sm transition";

  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label className="text-black text-sm ms-2 whitespace-nowrap">
          {label}
        </label>
      )}

      {/* TEXTAREA */}
      {textarea && (
        <textarea
          className={`${baseClasses} ${className} h-32`}
          placeholder={placeholder}
          {...(register ? register(name) : {})}
        />
      )}

      {/* SELECT */}
      {select && (
        <select
          className={`${baseClasses} ${className}`}
          {...(register ? register(name) : {})}
          size={size}
        >
          {options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.name}
            </option>
          ))}
        </select>
      )}

      {/* INPUT */}
      {!textarea && !select && (
        <input
          type={type}
          className={`${baseClasses} ${className}`}
          placeholder={placeholder}
          min={min}
          max={max}
          accept={accept}
          multiple={multiple}
          onKeyDown={onKeyDown}
          {...(register ? register(name) : {})}
        />
      )}

      {error && <p className="text-red-500 text-xs ms-2">{error}</p>}
    </div>
  );
};

export default Admininput;


// import React from 'react'

// const Admininput = ({name,placeholder,onChange,value,type,onKeyDown,className,min,max,accept,multiple,options=[],select=false,textarea=false,register,label,error,rules}) => {
//   const baseClassess="rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none   shadow-sm transition"
//    if(textarea)
//       return(
//     <div className='flex flex-col w-full gap-1'>
//      {label&&<label className='text-black text-sm w-1/2 ms-2'>{label}</label>}
//  <textarea 
//    className={`${baseClassess}${className} h-32`}
//    name={name}
//    placeholder={placeholder}
//    value={value}
//    onChange={onChange}
//    {...(register?register(name):{})}
//    ></textarea>
//     {error&&<p className="text-red-500 text-xs ms-2">{error}</p>}
//     </div>
  
//       )
//     if(select)
//     return(
//   <div className='flex flex-col w-full'>
//      {label&&<label className='text-black text-sm w-1/2 ms-2'>{label}</label>}
//   <select
//     className={`${baseClassess}${className}`}
//     name={name}
//     onChange={onChange}
  
//       {...(register?register(name):{})}
//    >
//     {options.map((op)=>(
//       <option key={op.value} value={op.value}>{op.name}</option>
//     ))}
//    </select>
//    {error&&<p className="text-red-500 text-xs ms-2">{error}</p>}
//    </div>
//   )

//   return (
   
//   <div className='flex flex-col w-full '>
//      {label&&<label className='text-black text-sm w-1/2 ms-2 whitespace-nowrap'>{label}</label>}
//      <input
//     className={`${baseClassess} ${className}`}
//     name={name}
//     placeholder={placeholder}
//     value={value}
//     type={type}
//     onChange={onChange}
//     onKeyDown={onKeyDown}
//     min={min}
//     max={max}
//     accept={accept}
//     multiple={multiple}
//     rules={rules}
//     {...(register?register(name):{})}
   
//   />
//   {error&&<p className="text-red-500 text-xs ms-2">{error}</p>}
//   </div>
// )
// }

// export default Admininput
