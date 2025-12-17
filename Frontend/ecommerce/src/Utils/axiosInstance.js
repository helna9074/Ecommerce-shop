
import axios from 'axios'
 
const axiosInstance=axios.create({
    baseURL:"http://localhost:5000/user",
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
    }
})
axiosInstance.interceptors.request.use(
    (config)=>{
      
        const token=localStorage.getItem('usertoken')
               
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        
        return config;
    },
        // (error)=>{
        //     return Promise.reject(error)
        // }
    
)
// axiosInstance.interceptors.response.use(
//     (response)=> {
//         return response
//     },
//     (error)=>{
//         if(error.response){
//             if(error.response.status===400){
//                 window.location.href="/login"
//             }else if(error.response.status==500){
//                 console.log(
//                     'server error please try again'
//                 )
//             }else if(error.code==='ECONNABORTED'){
//                 console.log('timeout please try again')
//             }
//         }
        
//          return Promise.reject(error)
//     }
  

// )

export default axiosInstance
