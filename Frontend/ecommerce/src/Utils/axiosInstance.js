
import axios from 'axios'
import useAuthstore from '../Store/Authstore'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
 

const axiosInstance=axios.create({
   baseURL:"https://ecommerce-shop-kzde.onrender.com/user",
  //  baseURL :"http://localhost:3000/user",
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
    }
})
axiosInstance.interceptors.request.use(
    (config)=>{
      
        const { token, hasHydrated } = useAuthstore.getState();

  if (!hasHydrated) return config;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
    },
       
    
)
axiosInstance.interceptors.response.use(
    (response)=>response,
    error=>{
        const {logout}=useAuthstore.getState();
        if(error.response?.data?.blocked){
            if (error.config.url.includes("/login")) {
  return Promise.reject(error);
}

            toast.error("Your account has been blocked",{duration:4000});
           setTimeout(() => {
        logout();
      }, 4000);
    }

          
        
       const status=error.response?.status;
       const errorCode=error.response?.data?.errorCode
    console.log("this is the status",status)
       console.log('this is the errorCode',errorCode)
      if(errorCode==="TOKEN_EXPIRED"|| errorCode==="USER_NOT_FOUND"){
        toast.error("Please login agian",{duration:4000});
        logout();
       
       
      }
       
       
       
       return Promise.reject(error)
    }
)



export default axiosInstance
