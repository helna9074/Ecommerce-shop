import React from 'react'
import { IoSearch } from 'react-icons/io5'

const SearchField = ({value,onChange,onKeyDown,width,placeholder}) => {
  return (
    <div className={`${width? width:'w-full'} border border-slate-500  p-3 mt-5 rounded-2xl flex items-center gap-3`}>
           <IoSearch size={20}/>
              <input placeholder={placeholder? placeholder:'Search'} type='text' className='w-full outline-0 border-none' value={value} onChange={onChange} onKeyDown={onKeyDown}
              
              />
         </div>
  )
}

export default SearchField

