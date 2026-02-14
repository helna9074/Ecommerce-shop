import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
export default function Input({placeholder,type,...rest}) {
 
   const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="border-b border-black/50 flex justify-between items-center">
      <input
        className="w-full outline-none p-3"
        placeholder={placeholder}
        type={isPassword && showPassword ? "text" : type}
        {...rest}
      />

      {isPassword && (
        <span
          className="cursor-pointer pr-3 text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
        </span>
      )}
    </div>
  )
}
