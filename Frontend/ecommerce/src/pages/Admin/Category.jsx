import React, { useState } from 'react'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import API from '../../Utils/adminAxios'
import { API_PATHS } from '../../Utils/Apipaths'
import toast from 'react-hot-toast'
import Modal from '../../Components/Modal'
import ListCategory from '../../Components/Products/ListCategory'
import Input from "../../Components/Inputs/Admininput";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const Category = () => {
    const {handleActive}=useOutletContext()
    const [categories,setCategory]=useState([])
    const [isedit,setIsEdit]=useState(false)
    const[edit,setEdit]=useState(null)
    const schema=Yup.object({
      name:Yup.string().required()
    })
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({resolver:yupResolver(schema)});
   
    useEffect(()=>{
       handleActive('Category')
       FetchData()
    },[])
    const[modalIsOpen,setIsOpen]=useState(false)
    const onClose=()=>{
      setIsOpen(false)
    }
   
    const AddCategory=async(name)=>{
      try{
        onClose()
      const{data}=await API.post(API_PATHS.Authadmin.AddCategory,{name})
       if(data){
        toast.success("Category Added Successfully")
        FetchData();
      }
      console.log(data)
      }catch(error){
          console.log(error)
      }
    }
    const DeleteCategory=async(id)=>{
      try{
        const {data}=await API.delete(API_PATHS.Authadmin.DeleteCategory(id))
        console.log(data)
        if(data){
          toast.success(data.message)
          FetchData()
        }
      }catch(error){
        toast.error(data.message)
            console.log(error)
      }
    
          
    }
    const EditCategory=async(id,name)=>{
     
      try{
        const {data}=await API.put(API_PATHS.Authadmin.EditCategory(id),{name})
        console.log(data)
        if(data){
          toast.success(data.message)
          FetchData()
        }
      }catch(error){
        toast.error(data.message)
            console.log(error)
      }
    
          
    }
    const FetchData=async()=>{
      try{ 
         const {data}=await API.get(API_PATHS.Authadmin.getCategory)
      console.log(data)

      setCategory(data.category)
      
    

      }catch(error){
          toast.error(error.response?.data?.message||'something went wrong')
          console.log(error)
        }
          
        
    
    }
    const EditHandler=(item)=>{
      if(!item) return
      setIsOpen(true)
      setIsEdit(true)
      setEdit(item)
      setValue("name",item.name)
      
      

    }
    const AddHandler=()=>{
      setIsEdit(false)
      setIsOpen(true)
      setEdit(null)
      reset()
    }
     const handleKey = (e) => {
    if (e.key === "Enter") 
      handleModal();
  };
 
 
   const handleModal = (data) => {
     
     if (isedit) {
       EditCategory(edit._id, data.name);
      
     } else {
       AddCategory(data.name);
       
     }
     reset();
     onClose();
   };
  return (
    <div className='p-5 bg-gray-50 rounded-sm  shadow-xl shadow-stone-300 flex flex-col my-5 mx-auto '>
      <div className='ms-auto'>
        <button onClick={AddHandler} className='btn-primary'>Add</button>
      </div>
     <ListCategory categories={categories} EditHandler={EditHandler}  DeleteCategory={DeleteCategory}/>
   <div>
  
    </div>
      <Modal modalIsOpen={modalIsOpen} onClose={onClose}  isedit={isedit} width='w-[40%]'  title={`${isedit? 'Update Category':'Add Category'}`} >
        <form onSubmit={handleSubmit(handleModal)}>
         <Input type='text' name='name' placeholder="Category" className="w-full my-2"  onKeyDown={handleKey} register={register} error={errors.name?.message}/>
            
            <div className='w-full text-center'>
                   <button type='submit'
            className="  bg-red-600 text-center flex ms-auto hover:bg-red-700 p-3 rounded-md text-white font-medium shadow transition"
            
          >
            {isedit ? "Update" : "Add"}
          </button>
            </div>
        </form>  

</Modal>   

    </div>
  )
}

export default Category
 