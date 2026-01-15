import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import React from 'react'



const useAuthstore = create(
  persist(
    (set)=>({
        username:null,
        useremail:null,
        token:null,
        isAuthenticated:false,

        login:(token,username,useremail)=>{
            set({
                token,
                username,
                useremail,
                isAuthenticated:true
            })
        },
        logout:()=>{
            set({
                token:null,
                username:null,
                useremail:null,
                isAuthenticated:false,
            })
        }
    }),{
        name:'auth-storage'
    }
  )
)
 


export default useAuthstore
