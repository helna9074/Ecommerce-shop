import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { LuTrash2 } from 'react-icons/lu'

const Editdeletebtn = ({HandleEdit,DeleteItem,item}) => {
  return (
    <div className='flex gap-2'>
      <FaPencilAlt onClick={() => HandleEdit(item.Obj)} />
                           
                            <LuTrash2 onClick={() => DeleteItem(item.id)} />
    </div>
  )
}

export default Editdeletebtn
