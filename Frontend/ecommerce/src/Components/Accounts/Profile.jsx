import React, { useEffect } from 'react'
import Input from '../../Components/Inputs/Admininput'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/Apipaths'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useOutletContext } from 'react-router-dom'

const Profile = () => {
  const schema=new yup.object({
    firstname:yup.string().required("firstname is required"),
    email:yup.string().email("invalid email").required(),
     currentpassword: yup.string().when("newpassword", {
    is: (val) => val && val.length > 0,
    then: (schema) =>
      schema.required("Current password is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  
  newpassword: yup
    .string()
     .transform((value) => (value === "" ? undefined : value))
   
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "One lowercase letter required")
    .matches(/[0-9]/, "One number required") .notRequired(),

  currentpassword: yup.string().when("newpassword", {
    is: (val) => val && val.length > 0,
    then: (schema) => schema.required("Current password is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  confirmpassword: yup.string().when("newpassword", {
    is: (val) => val && val.length > 0,
    then: (schema) =>
      schema
        .required("Confirm password is required")
        .oneOf([yup.ref("newpassword")], "Passwords must match"),
    otherwise: (schema) => schema.notRequired(),
  }),
  })

  const{register,handleSubmit,reset,formState:{errors}}=useForm({resolver:yupResolver(schema)})
 
  useEffect(()=>{
Fetchuser()
  },[reset])
  const Fetchuser=async()=>{
    try{
    
       const{data}=await axiosInstance.get(API_PATHS.Authuser.getUser)
       console.log(data)
       reset({
        firstname:data.firstname,
        lastname:data.lastname? data.lastname:"",
        email:data.email
       })
        
    }catch(err){
      console.log(err)
    }
   
  }
  const onSubmit=async(userInf)=>{
   
    if (!userInf.newpassword) {
    delete userInf.currentPassword;
    delete userInf.confirmPassword;
  }
  try{
const {data}=await axiosInstance.put(API_PATHS.Authuser.updateUser,userInf)
if(data){
   console.log(data)
}
 
  }catch(err){
    console.log(err)
  }
  
  }
  return (
    <div className='p-7 w-5xl '>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-3xl'>
            <h1 className=''>Edit Your Profile</h1>
            <div className='flex gap-5'>
              <div className='flex flex-col'>
                <Input className="checkout-box border-0 rounded-xs" label="FirstName"  register={register} name="firstname"/>
                {errors.firstname && <p className="text-red-500 font-light text-xs">{errors.firstname.message}</p>}
                </div>
                <Input className="checkout-box border-0 rounded-xs" label="Last Name" register={register} name="lastname"/>
                

            </div>
             <div className='flex gap-5 flex-col'>
                <Input className="checkout-box border-0 rounded-xs" label="Email"  register={register} name="email"/>
                {errors.email && <p className="text-red-500 font-light text-xs">{errors.email.message}</p>}

            </div>
       <div className='flex flex-col gap-3'>
        <Input className="checkout-box border-0 rounded-xs " placeholder="CurrentPassword" label="Password Changes" register={register} name="currentpassword"/>
        {errors.currentpassword && <p className="text-red-500 font-light text-xs">{errors.currentpassword.message}</p>}
        <Input className="checkout-box border-0 rounded-xs " placeholder="NewPassword" register={register} name="newpassword" />
        {errors.newpassword && <p className="text-red-500 font-light text-xs">{errors.newpassword.message}</p>}
        <Input className="checkout-box border-0 rounded-xs " placeholder="Confirm Password" register={register} name="confirmpassword" />
        {errors.confirmpassword && <p className="text-red-500 font-light text-xs">{errors.confirmpassword.message}</p>}
       </div>
       <div className='flex ms-auto gap-3'>
        <button>Cancel</button>
        <button type='submit' className='btn-secondary'>save Changes</button>
       </div>

          </form>
        </div>
  )
}

export default Profile
