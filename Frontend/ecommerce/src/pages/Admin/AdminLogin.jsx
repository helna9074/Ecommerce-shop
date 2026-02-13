import React from 'react'
import AdminNav from '../../Components/Navbar/AdminNav'
import Input from '../../Components/Inputs/Input'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { API_PATHS } from '../../Utils/Apipaths'
import { useEffect } from 'react'
import API from '../../Utils/adminAxios'
import useAdminStore from '../../Store/Adminstore'


const Login = () => {
    const navigate=useNavigate()
    const {isAuthenticated}=useAdminStore()
    const login=useAdminStore((state)=>state.login)
  


    useEffect(()=>{
      if(isAuthenticated){
        navigate('/admin',{replace:true})
      }
    },[])
    const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
});
    const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });
    const handler=async(datas)=>{
      console.log(datas)
       
      try{
          const {data}= await API.post(API_PATHS.Authadmin.Login,datas)
                console.log(data)
                console.log(data.Id)
          
         login(data.token,data.name)
         toast.success("Login Success")
       navigate("/admin")

      
           
      }catch(err){
              toast.error(err.response?.data?.message||'Login failed')
             console.log(err)
      }
    }
   
 

  return (
    <div className='flex flex-col h-screen'>
      <AdminNav/>
            <div className='lg:w-1/2 flex h-full   items-center py-10 mx-auto'>
               <form onSubmit={handleSubmit(handler)} className='w-full flex flex-col gap-5 mx-auto shadow-xl p-5 rounded'>
               
                                     
                                        <div>
                                            <h1 className='text-2xl text-[#DB4444] font-bold text-center'>Login</h1>
                                        <p className='text-sm font-light text-slate-500 mt-3'>Enter your details below</p>
                                        </div>
                                        <div className="">
                                             <Input placeholder="Email" type="email"{...register('email')} />
                                              {errors.email && <p className="text-red-500 font-light text-xs">{errors.email.message}</p>}
                                        <Input placeholder="password" type="password" {...register('password')}/>
                                         {errors.password && <p className="text-red-500 font-light text-xs">{errors.password.message}</p>}
                                        </div>
                                       <div className='flex justify-between items-center'>
                                              <button type="submit" className='btn-primary text-center'>Login</button>
                                              <a className='text-red-500 font-light text-xs'>Forget Password?</a>
                                       </div>
                                       
                                        
                                    
                                     
                           </form>
               </div>
    </div>
  )
}

export default Login
