import React from 'react'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'

const BannerList = ({banners,HandleEdit,DeleteBanner}) => {
  
  return (

   <div className='grid grid-cols-1 gap-3  w-full justify-center items-center'>

      
      <div className=' p-3 shdow-xs md:grid hidden grid-cols-6  font-bold lg:text-xl text-sm text-center'>
        
        <p>NO</p>
          <p>Image</p>
         
        <p className=''>Title</p>
        <p className='col-span-2  '>Text</p>
         <p>Status</p>

      </div>
      {banners.map((item,index)=>(
                <div key={item._id} className='p-3 shdow-xs grid md:grid-cols-6 grid-cols-1 text-center gap-3 lg:gap-0 border-b border-slate-400 '>
                  <div className="md:hidden text-sm font-semibold text-gray-500">
    No
  </div>
              <p>{index+1}</p>
              <div className="md:hidden text-sm font-semibold text-gray-500">
    Image
  </div>
              <div className='w-full text-center flex justify-center'>
                <img src={item.img[0]?.url} alt=""className='w-1/2 object-contain'></img>
                </div>
              
              <div className="md:hidden text-sm font-semibold text-gray-500">
    Title
  </div>
              <p className='lg:text-sm text-xs'>{item.title}</p>
              <div className="md:hidden text-xs font-semibold text-gray-500">
    Text
  </div>
                   <p className='col-span-1 md:col-span-2 lg:text-sm text-xs whitespace-normal'>{item.paragraph}</p>
               <div className="md:hidden text-xs font-semibold text-gray-500">
    Actions
  </div>
              
             <div className='flex gap-2 justify-center items-center'>
            
       <MdModeEditOutline size={20} onClick={()=>HandleEdit(item)}/>
                              <MdDelete size={20} onClick={()=>DeleteBanner(item._id)}/>
             </div>
            </div>
             ))
      
             }
      </div>
  )
}

export default BannerList
