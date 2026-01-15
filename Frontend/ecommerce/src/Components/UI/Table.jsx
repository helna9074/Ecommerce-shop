import React, { useEffect } from 'react'
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { LuTrash2 } from 'react-icons/lu';
import Editdeletebtn from './Editdeletebtn';


const Table = ({HandleEdit,DeleteItem,ViewItem,colums,data=[],className}) => {
  useEffect(()=>{
    console.log(data)
  },[])
  return (
      <div>
  <table className={`w-full text-sm mt-5 ${className}`}>
    <thead>
      <tr className='text-left border-b text-gray-600 '>
        {colums.map((data)=>(
          
          <th key={data.key} className={`${data.label==="Action"? "text-center":""} ${data.width} `}>{data.label}</th>
        ))}
       
      </tr>
    </thead>
    <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-b">
            {colums.map((col) => {
              if (col.key === "action") {
                return (
                  <td key={col.key} className="text-center py-2">
                    <div className="flex justify-center gap-4">
                      {/* <FaPencilAlt onClick={() => HandleEdit(row.Obj)} /> */}
                      <Editdeletebtn HandleEdit={HandleEdit} DeleteItem={DeleteItem} item={row} />
                      <FaEye className={`${ViewItem? "visible":"hidden"}`} onClick={() => ViewItem(row.id)} />
                      {/* <LuTrash2 onClick={() => DeleteItem(row.id)} /> */}
                    </div>
                  </td>
                );
              }

              return (
                <td key={col.key}>
                  {row[col.key]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>

</table>
      
      
     
       </div>
  

  )
}

export default Table
