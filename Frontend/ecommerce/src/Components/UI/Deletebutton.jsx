import React from 'react'

const Deletebutton = ({isOpen,title,message,onCancel,onConfirm,loading=false}) => {
    if(!isOpen) return null;
  return (
       
  <div className="fixed inset-0 bg-black/40 flex  justify-center z-50 items-start">
    <div className="bg-white rounded-md w-[400px] p-6">
      <h2 className="text-lg font-semibold mb-3">
       {title}
      </h2>

      <p className="text-sm text-gray-600 mb-6">
        {message}
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          {loading? "Deleting...":"Yes,Delete"}
        </button>
      </div>
    </div>
  </div>


  
  )
}

export default Deletebutton
