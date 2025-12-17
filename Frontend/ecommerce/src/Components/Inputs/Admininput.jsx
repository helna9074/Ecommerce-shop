import React from 'react'

const Admininput = ({name,placeholder,onChange,value,type,onKeyDown,className,min,max,accept,multiple,options=[],select=false,textarea=false,register,label,error}) => {
  const baseClassess="rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none   shadow-sm transition"
   if(textarea)
      return(
    <div className='flex flex-col w-full gap-1'>
     {label&&<label className='text-slate-600 text-sm w-1/2 ms-2'>{label}</label>}
 <textarea 
   className={`${baseClassess}${className}`}
   name={name}
   placeholder={placeholder}
   value={value}
   onChange={onChange}
   {...(register?register(name):{})}
   ></textarea>
    {error&&<p className="text-red-500 text-xs ms-2">{error}</p>}
    </div>
  
      )
    if(select)
    return(
  <div className='flex flex-col w-full'>
     {label&&<label className='text-slate-600 text-sm w-1/2 ms-2'>{label}</label>}
  <select
    className={`${baseClassess}${className}`}
    name={name}
    onChange={onChange}
  
      {...(register?register(name):{})}
   >
    {options.map((op)=>(
      <option key={op.value} value={op.value}>{op.name}</option>
    ))}
   </select>
   {error&&<p className="text-red-500 text-xs ms-2">{error}</p>}
   </div>
  )

  return (
   
  <div className='flex flex-col w-full gap-1'>
     {label&&<label className='text-slate-600 text-sm w-1/2 ms-2'>{label}</label>}
     <input
    className={`${baseClassess} ${className}`}
    name={name}
    placeholder={placeholder}
    value={value}
    type={type}
    onChange={onChange}
    onKeyDown={onKeyDown}
    min={min}
    max={max}
    accept={accept}
    multiple={multiple}
    {...(register?register(name):{})}
   
  />
  {error&&<p className="text-red-500 text-xs ms-2">{error}</p>}
  </div>
)
}

export default Admininput
