import React, { useState } from 'react'
import toast from 'react-hot-toast'

const useDeleteModal = () => {
    const[modal,setModal]=useState({
        open:false,
        id:null,
    })
    const openDelete=(id)=>{
        if(!id) return
        setModal({open:true,id})
    }
    const closeDelete=()=>{
        setModal({open:false,id:null})
    }
    const confirmDelete=async({
        deleteApi,
        onSuccess,
        
    })=>{
        try{
            await deleteApi(modal.id);
            onSuccess?.();
            closeDelete();
        }catch(err){
            console.log(err)
             toast.error(err.response?.data?.message||'Something went wrong')
        }
    }
return{
    modal,
    openDelete,
    closeDelete,
    confirmDelete,

}
}

export default useDeleteModal
