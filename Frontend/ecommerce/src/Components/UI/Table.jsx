import React, { useEffect } from 'react'
import { FaEye, FaPencilAlt } from "react-icons/fa";
import Editdeletebtn from './Editdeletebtn';
import { SkeletonTable } from './shadcnUI/SkeletonTable';


const Table = ({HandleEdit,DeleteItem,ViewItem,colums,data=[],className,headStyle,isLoading}) => {


   if (isLoading) {
    return <SkeletonTable  columns={colums}/>;
  }

  return (
      <div>
  <table className={`w-full text-sm mt-5 ${className}`}>
    <thead className={`${headStyle? headStyle:""}`}>
      <tr className='text-left border-b border-slate-300  text-gray-600 '>
        {colums.map((data)=>(
          
          <th key={data.key} className={`${data.key==="action"? "text-center":""} ${data.width} `}>{data.label}</th>
        ))}
       
      </tr>
    </thead>
    <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-b last:border-b-0">
            {colums.map((col) => {
              if (col.key === "action") {
                return (
                  <td key={col.key} className="text-center py-2">
                    <div className="flex justify-center gap-4">
                     
                      <Editdeletebtn HandleEdit={HandleEdit} DeleteItem={DeleteItem} item={row} />
                      <FaEye className={`${ViewItem? "visible":"hidden"}`} onClick={() => ViewItem(row.id)} />
                   
                    </div>
                  </td>
                );
              }

              return (
                <td key={col.key} className='p-2'>
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
