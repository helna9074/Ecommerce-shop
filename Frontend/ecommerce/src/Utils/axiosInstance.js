
import axios from 'axios'
import useAuthstore from '../Store/Authstore'

 

const axiosInstance=axios.create({
    baseURL:"http://localhost:5000/user",
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
    }
})
axiosInstance.interceptors.request.use(
    (config)=>{
      
        const token=useAuthstore.getState().token;
               
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        
        return config;
    },
       
    
)
axiosInstance.interceptors.response.use(
    (response)=>response,
    error=>{
       const status=error.response?.status;
       const errorCode=error.response?.data?.errorCode
       if(
        status===401&&
        ['TOKEN_EXPIRED'].includes(errorCode)
       ){
        const {logout}=useAuthstore.getState();
        logout()
        window.location.href = "/login";
       }
       return Promise.reject(error)
    }
)



export default axiosInstance
