import { useState } from "react";

const Radiobtn = ({ label,register,value,name }) => {
  // const [checked, setChecked] = useState(false);

  return (
    <label className="flex group items-center gap-3 cursor-pointer select-none ">
      
      {/* Hidden checkbox */}
      <input
        type="radio"
        value={value}
        {...register(name)}
        className="peer hidden"
      />

      {/* Custom radio look */}
    
       <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center 
        group-has-[input:checked]:border-black transition">
        
        {/* Inner dot */}
        <div className="w-3 h-3 rounded-full bg-black scale-0 
          group-has-[input:checked]:scale-100 transition">
        </div>
      </div>
      <span>{label}</span>
    </label>
  );
};

export default Radiobtn;
