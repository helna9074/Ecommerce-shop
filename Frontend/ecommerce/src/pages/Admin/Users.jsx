import React, { use, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { API_PATHS } from '../../Utils/Apipaths';
import API from '../../Utils/adminAxios';
import Table from '../../Components/UI/Table';
import Pagination from '../../Components/UI/Pagination';
import SearchField from '../../Components/Inputs/SearchField';
import { formatDate } from '../../Utils/helper';
import { TbRuler } from 'react-icons/tb';
const Users = () => {
    const {handleActive}=useOutletContext();
    const [currentPage,setCurrentPage]=useState(1);
    const [totalPages,setTotalPages]=useState(1);
    const[users,setUsers]=useState([]);
    const[search,setSearch]=useState('');
    const[blockuser,setBlockUser]=useState(false);
    const[loading,setLoading]=useState(false);
    useEffect(()=>{
    handleActive("Users");
   
    },[])
    useEffect(()=>{
       const timer=setTimeout(() => {
    setCurrentPage(1)
    FetchUsers(currentPage)
 },500)
 return()=>clearTimeout(timer)
    },[search,currentPage])
    const FetchUsers=async(page=1)=>{
        try{
            setLoading(true)
            const {data}=await API.get(`${API_PATHS.Authadmin.Users.getUsers}?page=${page}&search=${search}`);
            console.log(data);
            setCurrentPage(data.pagination.currentPage);
            setTotalPages(data.pagination.totalPages);
            setUsers(data.users);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    }
    const BlockUser=async(id)=>{
        try{
            setBlockUser(true)
            const {data}=await API.post(API_PATHS.Authadmin.Users.blockUser(id))
             
            console.log(data);
            FetchUsers(currentPage);
        }catch(err){
            console.log(err);
        }
    }
    const colums=[
        {key:"fullname",label:"fullName"},
        {key:"Email",label:"Email"},
        {key:"username",label:"username"},
        {key:"joineddate",label:"Joined Date"},
        {key:"status",label:"Status"},
        {key:"Action",label:"Action"},
    ]
    const tableData=users.map((user,index)=>({
        id:user._id,
        fullname:user.fullname,
         Email:user.email,
        username:user.firstname,
        joineddate:user.createdAt&&formatDate(user.createdAt),
        status:user.blocked?"Blocked":"Active",
        Action:(
            <button className='btn bg-red-500 rounded-sm text-white my-3 flex mx-auto p-2' onClick={()=>BlockUser(user._id)}>{user.blocked?"Unblock":"Block"}</button>
        )
    }));
  return (
    <div>
        {users.length>0?(
          <div className='w-full'>
 <div className="w-full">
               <SearchField value={search} onChange={(e)=>{setSearch(e.target.value);setCurrentPage(1)}} width="w-1/5"/> 

        </div>
      <Table colums={colums} data={tableData} isLoading={loading}/>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={(page)=>setCurrentPage(page)} />
          </div>  
        ):<div className="w-full  text-center ">
           <p className='w-full'>NO Users</p> 
            </div>
            }
       
    </div>
  )
}

export default Users
