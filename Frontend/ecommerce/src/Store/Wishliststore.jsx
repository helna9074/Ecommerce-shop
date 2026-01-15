import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/Apipaths";


const useWishliststore=create(
    persist((set,get)=>({
        wishItems:[],
       
        setItems:(item)=>
        set({
            wishItems:Array.isArray(item)?item:[],

        }),
    
       toggleWishlist:async(id)=>{
        const isExist=get().wishItems.some((i)=>String(i._id)===String(id))
    
        
            if(isExist){
                 set({
                wishItems:get().wishItems.filter((i)=>String(i._id)!==String(id))
            })
        }else{
             set({
            wishItems: [...get().wishItems, {_id:id}],
          });

        }
        try{
            if(isExist){
             const {data}=await axiosInstance.delete(API_PATHS.WishList.removeItem(id))
             console.log(data)
            } else{
              const {data}=await axiosInstance.post(API_PATHS.WishList.addItem(id))
              console.log(data)

            }
           
    }catch (err) {
          console.log(err);
        }
           
    },
     clearWishlist: () => set({ wishItems: [] }),   
        
    wishlistCount:()=> get().wishItems.length,
     
    }),{
      name:'Wishlist-storage'  
    })
)
export default useWishliststore;