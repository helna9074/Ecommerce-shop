import React from 'react'

export default function Input({placeholder,type,...rest}) {
  return (
    <div className='border-b border-black/50'>
      <input className='w-full outline-none p-3'  placeholder={placeholder} type={type} {...rest}/>

    </div>
  )
}
