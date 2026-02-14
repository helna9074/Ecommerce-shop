import React from 'react'
import { FaSpinner } from "react-icons/fa";

const Addbtn = ({isedit,loading,className,onClick}) => {
  return (
    <button
          type="submit"
          disabled={loading}
          onClick={onClick}
          className={`${className? className : "btn-primary"} self-end min-w-[120px] flex gap-2 justify-center items-center
        ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin fill-white " />
          {isedit ? "Updating..." : "Adding..."}
        </>
      ) : (
        isedit ? "Update" : "Add"
      )}   
        
        
        </button>
  )
}

export default Addbtn
