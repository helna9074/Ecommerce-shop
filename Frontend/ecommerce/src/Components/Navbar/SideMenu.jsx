import React from 'react'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const SideMenu = ({toggle}) => {
    const mainLinks=["Home","contact","About","Signup"]
    const category=["Women's Fashion","Men's Fashion","Electronics","Baby&Toys"]
  return (
    <>
    {/* Mobile static menu */}
    {toggle &&(
         <div className='w-34 h-[calc(100vh-61px)] border-r border-gray-300 drop-shadow absolute top-[55px] z-20 left-0 lg:hidden block bg-white '>
      <ul className='text-gray-600 text-xs text-center '>
       
               { mainLinks.map(item=>(
                    <li key={item} className='list'>{item}</li>
                ))}
               
        
                { category.map((item)=>(
                
                     <li key={item} className='list flex justify-between'>{item}
                <MdOutlineKeyboardArrowRight size={15}/>
                </li>
               
               
            ))
        }
        </ul>
    </div>
    )}
   
    
      
     </> 
  )
}

export default SideMenu
