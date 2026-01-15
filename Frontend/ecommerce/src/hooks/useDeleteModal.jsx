import React, { useState } from 'react'

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
        onSucess,
    })=>{
        try{
            await deleteApi(modal.id);
            onSucess?.();
            closeDelete();
        }catch(err){
            console.log(err)
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
