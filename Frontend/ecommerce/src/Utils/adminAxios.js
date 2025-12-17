import axios from  'axios';

const API = axios.create({
    baseURL :"http://localhost:5000/admin",
    headers:{
        "Content-Type":"application/json"
    }
});


API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('admintoken');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});
API.interceptors.response.use(
    (response)=>
response,
(error)=>{
    if(error.response){
        const status=error.response.status;
        if(status===401){
            localStorage.removeItem('admintoken')
            alert("Session expired.Please login agian")
            window.location.href='/admin/login'
        }
    }
    return Promise.reject(error)
}
)

export default  API;