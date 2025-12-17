import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Modal from "../../Components/Modal";
import ProductList from "../../Components/Products/ProductList";

import { API_PATHS } from "../../Utils/Apipaths";
import toast from 'react-hot-toast'
import API from '../../Utils/adminAxios'
import ProductForm from "../../Components/Products/ProductForm";
import { useForm } from "react-hook-form";
import ProductDetails from "../../Components/Products/ProductDetails";

const Products = () => {
  
  
  
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isedit, setIsEdit] = useState(false);
  const[categories,setCategory]=useState([])
  const { handleActive } = useOutletContext();
  const[Products,setProducts]=useState([])
  const[selectedProduct,setSelectedProduct]=useState(null)
  const[detailsShow,setDetailsShow]=useState(false)
  const[filteredProduct,setfilteredProduct]=useState(null)
  const{reset}=useForm()
  
  useEffect(() => {
    handleActive("Products");
    FetchData()
    FetchProducts()
  },[]);

  const onClose = () => {
    setIsOpen(false);
    setDetailsShow(false)
   
  };
  const AddHandler = () => {
     reset()
  setSelectedProduct(null)
  setIsEdit(false)
    // setIsEdit(false)
    setIsOpen(true);
    // setEdit(null)
  };
   const Submit=()=>{
      setSelectedProduct(null)
    setIsOpen(false)
    FetchProducts()
   }
 
   
      const FetchData=async()=>{
        try{ 
           const {data}=await API.get(API_PATHS.Authadmin.getCategory)
        console.log(data)
  
        setCategory(data.category)
        console.log(data.category)
        console.log(categories)
      
  
        }catch(error){
          if(error.response?.data?.message==='Token expired'){
            localStorage.removeItem('admintoken')
            toast.error('Please login agian')
          }else{
            toast.error(error.response?.data?.message||'something went wrong')
            console.log(error)
          }
            
          
        }
      }
      const FetchProducts=async()=>{
        try{
          const res= await API.get(API_PATHS.Authadmin.getProducts)
          console.log(res.data)
          setProducts(res.data.Product)
            Products.map((item)=>{
              console.log(item.img.Imgurl)
            })
        }catch(error){
           console.log(error)
        }
      }
      
     const HandleEdit=async(item)=>{
      setIsEdit(true)
      setIsOpen(true)
      setSelectedProduct(item)
      

     }
     const DeleteProduct=async(id)=>{
      try{
        console.log(id)
            const res=await API.delete(API_PATHS.Authadmin.DeleteProduct(id))
        console.log(res)
        if(res.data){
          FetchProducts();
        }
      }catch(err){
        console.log(err)
      }
       
     }
     const ViewProduct=async(id)=>{
      console.log(id,"the passed id")
      setDetailsShow(true)
   const result=Products.filter((item)=>{
      return  item._id===id
      
     })
     console.log(result)
     setfilteredProduct(result)
     
    
     }

  return (
    <div className="p-5 bg-gray-50 rounded-sm  shadow-xl shadow-stone-300 flex flex-col my-5 mx-auto  ">
      
      <div className="ms-auto">
        <button className="btn-primary" onClick={AddHandler}>
          Add
        </button>
      </div>
      <ProductList Products={Products} HandleEdit={HandleEdit} DeleteProduct={DeleteProduct} ViewProduct={ViewProduct}/>
    
      <Modal
        modalIsOpen={modalIsOpen}
        onClose={onClose}
        title={`${isedit ? "Update Product" : "Add Product"}`}
        width="w-50%"
      >
       <ProductForm categories={categories} isedit={isedit} selectedProduct={selectedProduct} Submit={Submit}/>
      </Modal>
      <Modal modalIsOpen={detailsShow}
      onClose={onClose}
      width="w-[70vw]%"
      >
        
        <ProductDetails filteredProduct={filteredProduct}/>
      </Modal>
    </div>
  );
};

export default Products;
