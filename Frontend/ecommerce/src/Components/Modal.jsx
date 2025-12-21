import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ modalIsOpen, onClose, title, children,width }) => {
  if (!modalIsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 w-full">
      {/* Modal Outer */}
      <div className={`bg-white ${width}  max-h-[90vh] rounded-xl shadow-lg flex flex-col overflow-hidden`}>
        
        {/* Header */}
        <div className="w-full flex items-center justify-between p-4 ">
          <h3 className="text-xl font-semibold">{title}</h3>
          <IoMdClose
            size={23}
            className="cursor-pointer hover:text-red-600"
            onClick={onClose}
          />
        </div>

        {/* Body (scrollable) */}
        <div className="p-5 overflow-y-auto ">
          {children}
        </div>

        {/* Footer */}
        <div className="p-4  flex justify-end bg-gray-50">
          {/* Button must come from form via children (not hardcoded) */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
