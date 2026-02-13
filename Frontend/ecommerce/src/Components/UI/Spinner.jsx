import React from 'react'
import { TbLoader } from "react-icons/tb";
const Spinner = () => {
  return (
    <div className='w-full  drop-shadow-2xl  min-h-[300px] flex items-center justify-center'>
      <TbLoader className='mx-auto flex animate-spin  text-4xl '/>
    </div>
  )
}

export default Spinner
