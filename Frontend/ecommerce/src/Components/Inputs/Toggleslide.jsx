import React from 'react'

const Toggleslide = ({checked,disabled,onChange}) => {
  return (
  
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}   /* Important because user is not editing */
        className="sr-only peer"
        onChange={(e)=>onChange?.(e.target.checked)}
      />

      <div className="w-12 h-6 bg-gray-400 rounded-full transition-colors duration-300 peer-checked:bg-blue-600"></div>

      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
    </label>
 

  )
}

export default Toggleslide
