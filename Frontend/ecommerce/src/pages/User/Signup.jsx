import React, { useEffect } from "react";
import Sideimg from "../../../Assets/Side Image.png";
import Input from "../../Components/Inputs/Input";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS } from "../../Utils/Apipaths";
import axiosInstance from "../../Utils/axiosInstance";
import toast from 'react-hot-toast';
import useAuthstore from "../../Store/Authstore";

const Signup = () => {
  const navigate = useNavigate();
  const login = useAuthstore((state) => state.login);
  const {isAuthenticated}=useAuthstore()
  const schema = Yup.object({
    firstname: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required().matches(/[a-z]/, "One lowercase letter required")
    .matches(/[0-9]/, "One number required")
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  },[])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handler = async (datas) => {
    console.log(datas);
    try {
      const {data} = await axiosInstance.post(
        API_PATHS.Authuser.Signup,
        datas
      );
      
      console.log(data)
      console.log(data.token)
      if (data.token) { 
        login(data.token, data.username, data.useremail);
         toast.success("Signup Success")
         setTimeout(()=> navigate("/"),2000)

      }
       
    
        
    
      
  
       
    
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message||'Signup failed')
     
    }
  };
  return (
    <div className="w-full">
    
      <div className="mt-10 flex lg:flex-row flex-col items-center  w-full lg:h-[500px] h-auto">
        <div className="w-1/2 h-full flex  ">
          <img
            src={Sideimg}
            alt="sideimg"
            className="w-full h-full object-cover float-start"
          />
        </div>
        <div className="lg:w-1/2 flex h-full   items-center py-10">
          <form
            onSubmit={handleSubmit(handler)}
            className="lg:w-1/2  flex flex-col gap-3 mx-auto"
          >
            <div>
              <h1 className="text-2xl text-[#DB4444] font-bold text-center">
                Create an account
              </h1>
              <p className="text-sm font-light text-slate-500 mt-3">
                Enter your details below
              </p>
            </div>
            <div className="">
              <Input placeholder="Firstname" type="text" {...register("firstname")} />
              {errors.firstname&& <p className="text-red-500 font-light text-xs">{errors.firstname.message}</p>}
              <Input placeholder="Lastname (optional)" type="text" {...register("lastname")} />
        
              <Input placeholder="Email" type="email" {...register("email")} />
              {errors.email && <p className="text-red-500 font-light text-xs">{errors.email.message}</p>}
              <Input
                placeholder="password"
                type="password"
                {...register("password")}
              />
              {errors.password && <p className="text-red-500 font-light text-xs">{errors.password.message}</p>}
            </div>
            <div className="flex flex-col gap-3 items-center">
              <button type="submit" className="btn-primary text-center w-full">
                Create Account
              </button>
              <button type="button" className="w-full bg-white text-black p-2">
                Sign up with Google
              </button>
            </div>
            <p className="text-black text-xs font-light">
              Already have account?
              <Link to="/login" className="underline text-sm ms-2">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
