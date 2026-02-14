import React, { useEffect, useState } from 'react'
import { GoHome } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/Apipaths';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Addressform from '../UI/Addressform';
import { useForm } from "react-hook-form";
import Modal from '../UI/Modal';
import Addbtn from '../UI/Addbtn';
import useDeleteModal from '../../hooks/useDeleteModal';
import DeleteModal from '../UI/DeleteModal';
import toast from 'react-hot-toast';
import { IoIosAdd } from "react-icons/io";
import { useOutletContext } from 'react-router-dom';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
const Address = () => {
  const addressSchema = yup.object({
  firstname: yup.string().required("First name required"),

  street: yup.string().required("Street required"),
  city: yup.string().required("City required"),
phone: yup.string()
  .required("Phone number is required")
  .test(
    "is-valid-phone",
    "Enter a valid phone number",
    value => value && /^[6-9]\d{9}$/.test(value)
  ),

  email: yup.string().email().required("Email required"),
});
    const[address,setAddress]=useState([])
    const[activeMenu,setActiveMenu]=useState(null)
    const[showform,setShowForm]=useState(false) 
    const {register,setValue,reset,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(addressSchema)})
    const [editingAddress, setEditingAddress] = useState(null);
    const {openDelete,closeDelete,confirmDelete,modal}=useDeleteModal()
    const [isedit,setIsEdit]=useState(false)
   const {handleActive}=useOutletContext()
   

    useEffect(()=>{
        FetchAddress()
        handleActive('Address Book')
        
    },[])
    
    const FetchAddress=async()=>{
        try{
            const {data}=await axiosInstance.get(API_PATHS.Address.getAddress)
            console.log(data)
            setAddress(data.addressess)
        }catch(err){
            console.log(err)
        }
    }
    const SubmitAddress=async(formData)=>{
      console.log('getted here')
          const payload = {
      address: {
        firstName: formData.firstname,
        lastName: formData.lastname,
        companyName: formData.companyname,
        street: formData.street,
        apartment: formData.apartment,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
      }
    };
    
    
            try {
              if(isedit&&editingAddress?._id){
   const {data}= await axiosInstance.put(API_PATHS.Address.editAddress(editingAddress._id), payload);
     toast.success("Address updated successfully");
      console.log("this isthe address data",data)
              }else{
                const {data}= await axiosInstance.post(API_PATHS.Address.addAddress,payload)
                 toast.success("Address added successfully");
                  console.log("this isthe address data",data)
    }
   
      FetchAddress();
    setShowForm(false);
    reset();
    setEditingAddress(null);
    setIsEdit(false);        
   
   
  }
  catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || "Something went wrong");

  }
          }
   

   
     
  const HandleAdd=()=>{
    setIsEdit(false);
  setEditingAddress(null);
  reset();
  setShowForm(true);

  }
const HandleEdit=(add)=>{
    setShowForm(true)
    setEditingAddress(add)
    setIsEdit(true)
    setActiveMenu(null)
     setValue("lastname", add.address.lastName || "");
  setValue("firstname", add.address.firstName || "");
  setValue("companyname", add.address.companyName || "");
  setValue("streetaddress", add.address.street || "");
  setValue("apartment", add.address.apartment || "");
  setValue("city", add.address.city || "");
  setValue("phonenumber", add.address.phone || "");
  setValue("email", add.address.email || "");
  }

const handleDelete=(id)=>{
  if(!id) return
  openDelete(id)
 
}   
  return (
    <div className='flex flex-col lg:w-5xl gap-2 p-5 bg-slate-50 shadow-sm rounded-2xl h-full relative m-5 lg:m-0 py-10  '>
       
      {address.length===0?(
        <div className=' p-5   flex flex-col gap-4 w-full'>
          <div className='text-red-500 flex  justify-end w-full items-center'onClick={() => HandleAdd()} >
            <IoIosAdd className='text-3xl'/>
           <button  type="button" >New Address</button>
          </div>
          
          <h1 className='text-center text-2xl font-semibold text-gray-400'>No Address Added</h1>
        </div>
      ):(
        <div className='py-6'>
            <div className='text-red-500 flex  justify-end w-full items-center'onClick={() => HandleAdd()} >
            <IoIosAdd className='text-3xl'/>
           <button  type="button" >New Address</button>
          </div>
       <DeleteModal isOpen={modal.open} onCancel={closeDelete}
      onConfirm={() =>
               confirmDelete({
                 deleteApi: (id) =>
                   axiosInstance.delete(API_PATHS.Address.deleteAddress(id)),
                 onSucess: () => {
                   toast.success("Product deleted successfully");
                   FetchAddress();
                 },
               })
              }
      title="Delete Address" message="Are you sure you want to delete this address?" />
    
        {address.map((add,index)=>(
             <div key={index} className='flex flex-col gap-2 items-center justify-center w-full p-3'>
                <div className='flex gap-2 me-auto'>
  <GoHome size={20}/> 
    <h6>{add.address.firstName}</h6>
                </div>
           
  <div className='flex justify-between w-full relative items-center'>
    <div className='flex lg:line-clamp-1 line-clamp-2'>
 <p>
              {add.address?.street},{" "}
              {add.address?.city},{" "}
              {add.address?.apartment},
              {add.address?.companyName},
               {add.address?.phone},
            {add.address?.email}
            </p>

           
            </div>
            <button  onClick={()=>setActiveMenu(activeMenu===index?null:index)}>
<HiDotsHorizontal size={20}/>
            </button>

    {activeMenu===index&&(
        <div className='absolute top-5 right-6 bg-slate-100 flex flex-col gap-1  shadow-sm p-3 rounded-sm cursor-pointer'>
            <div className='flex gap-2 items-center'onClick={()=>HandleEdit(add)}>
                <FaPencilAlt size={15} />
                 <p>edit</p>
            </div>
       
           <div className='flex gap-2 items-center cursor-pointer' onClick={()=>handleDelete(add._id)}>
                <FaTrashAlt size={15} />
                 <p>delete</p>
           </div>
           </div>
           
         
    )}
  </div>
        </div>
        ))}
      
        </div>

      )
      }
      <Modal
  modalIsOpen={showform}
  onClose={() => {
    setShowForm(false);
    reset();               // clear form when closing
    setEditingAddress(null);
   

  }}
 title={`${isedit ? "Edit Address" : "Add Address"}`}
  width="w-[500px]"
>
 <form onSubmit={handleSubmit(SubmitAddress)}>
  <Addressform  register={register} errors={errors} />
  <div className='w-full flex ms-auto justify-end'>
  <Addbtn  isedit={isedit}  className="btn-secondary mt-5"/>
  </div>

  </form>
</Modal>

    
    </div>
  )
}

export default Address