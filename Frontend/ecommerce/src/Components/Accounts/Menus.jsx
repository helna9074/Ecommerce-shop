import React from 'react'
import { AccountMenu } from '../../Utils/data'
import { Link } from 'react-router-dom'

const Menus = ({Active}) => {
    
  return (
    <div className='flex flex-col gap-3 text-sm  text-gray-500 p-5 lg:p-0'>
                {AccountMenu.map((item)=>(
                  <div key={item.id} className='flex flex-col gap-3'>
                    <h6 className='font-bold text-black'>{item.title?item.title:""}</h6>
                    <Link to={item.subheading?.path} className={`${Active===item.subheading?.label && "text-red-400"} hover:text-red-400`}>{item.subheading?.label}</Link>
                    <Link to={item.subheading2?.path} className={`${Active===item.subheading2?.label && "text-red-400"} hover:text-red-400`} >{item.subheading2?.label}</Link>
                    
                  </div>  
                ))}
        
              </div>
  )
}

export default Menus
