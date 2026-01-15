import React from "react";
import Sideimg from "../../../Assets/Side Image.png";
import Navbar from "../../Components/Navbar/Navbar";
import Input from "../../Components/Inputs/Input";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS } from "../../Utils/Apipaths";
import axiosInstance from "../../Utils/axiosInstance";
import toast from 'react-hot-toast';
import useAuthstore from "../../Store/Authstore";
import useCartStore from "../../Store/Cartstore";
const Login = () => {
  const navigate = useNavigate();
  const schema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handler = async (datas) => {
    try {
      const { data } = await axiosInstance.post(
        API_PATHS.Authuser.Login,
        datas
      );
      if (data.token) { 
               useAuthstore.getState().login(data.token,data.username,data.useremail)
               toast.success("Login Success")
              //  useCartStore.getState().clearCart();
               setTimeout(()=> navigate("/"),2000)
                
            }
      
    } catch (err) {
       toast.error(err.response?.data?.message||'Login failed')
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <div className="mt-10 flex lg:flex-row flex-col items-center  w-full lg:h-[500px] h-auto">
        <div className="w-1/2 h-full flex  ">
          <img
            src={Sideimg}
            alt="sideimg"
            className="w-full h-full object-fill float-start"
          />
        </div>
        <div className="lg:w-1/2  w-full flex h-full  items-center py-10">
          <form
            onSubmit={handleSubmit(handler)}
            className="lg:w-1/2 h-1/2  flex flex-col gap-3 mx-auto"
          >
            <div>
              <h1 className="text-2xl text-[#DB4444] font-bold text-center">
                Login
              </h1>
              <p className="text-sm font-light text-slate-500 mt-3">
                Enter your details below
              </p>
            </div>
            <div className="">
              <Input placeholder="Email" type="email" {...register("email")} />
              {errors.email && <p className="text-red-500 font-light text-xs">{errors.email.message}</p>}
              <Input
                placeholder="password"
                type="password"
                {...register("password")}
              />
              {errors.password && <p className="text-red-500 font-light text-xs">{errors.password.message}</p>}
            </div>
            <div className="flex justify-between items-center">
              <button type="submit" className="btn-primary text-center">
                Login
              </button>
              <Link to="/signup" className="text-red-500 font-light text-xs">
                New to be here Signup now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
