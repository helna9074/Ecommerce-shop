import axios from  'axios';
import toast from 'react-hot-toast';
import useAdminStore from '../Store/Adminstore';

const API = axios.create({
    // baseURL :"https://ecommerce-shop-kzde.onrender.com/admin",
    baseURL :"http://localhost:3000/admin",
    headers:{
        "Content-Type":"application/json"
    }
});

let isLoggingOut=false;

API.interceptors.request.use((config)=>{
const {token}=useAdminStore.getState();
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});
API.interceptors.response.use(
    (response)=>response,
    error=>{
      const status=error.response?.status;
       const errorCode=error.response?.data?.errorCode
       const {logout}=useAdminStore.getState();
    console.log("this is the status",status)
       console.log('this is the errorCode',errorCode)
      if(errorCode==="TOKEN_EXPIRED"&&!isLoggingOut){
        isLoggingOut=true;
        logout();
        toast.error("Please login agian",{duration:4000});
        
       
        setTimeout(() => {
        window.location.replace("/admin/login");
      }, 1500);
      }
       
      
       return Promise.reject(error)
    }
)

export default  API;

