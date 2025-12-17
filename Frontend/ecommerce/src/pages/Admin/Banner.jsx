import React, { useEffect, useState } from 'react'
import Modal from '../../Components/Modal'
import { useOutletContext } from 'react-router-dom'
import BannerList from '../../Components/Products/BannerList'
import Input from '../../Components/Inputs/Admininput'
import { useForm } from 'react-hook-form'
import Imageupload from '../../Components/Inputs/Imageupload'
import API from '../../Utils/adminAxios'
import { API_PATHS } from '../../Utils/Apipaths'

const Banner = () => {
    const[modalIsOpen,setmodalIsOpen]=useState(false)
    const {handleActive}=useOutletContext()
      const [previewImages, setPreviewImages] = useState([]);
      const[banners,setBanners]=useState([])
    const{register,handleSubmit,reset}=useForm()
    const[selectedBanner,setSelectedBanner]=useState(null)
    const[isedit,setIsEdit]=useState(false)
     const onClose=()=>{
     
      setmodalIsOpen(false)
  setIsEdit(false)
  setSelectedBanner(null)
  setPreviewImages([])
  reset()
    }
    const FetchData=async()=>{
      try{
        console.log('api activatedd')
      const {data}=await API.get(API_PATHS.Authadmin.GetBanners)
      console.log(data)
      if(data){
        setBanners(data.Banners)
        
      }
      }catch(err){
       console.log(err)
      }
    }
  
    useEffect(()=>{
        handleActive('Banners')
        FetchData()
        if(isedit&&selectedBanner){
          reset({
             title:selectedBanner.title,
             paragraph:selectedBanner.paragraph,
             Active:selectedBanner.status,
             paths:selectedBanner.paths,
             types:selectedBanner.types
          })
        }
        
},[isedit,selectedBanner,reset])

    
    const Submit=async(data)=>{
      const formData=new FormData()
      if(data['bannerimg']&&data['bannerimg'].length>0){
        formData.append("bannerimg",data['bannerimg'][0])
      }
    
      formData.append('title',data.title)
      formData.append('paragraph',data.paragraph)
      formData.append('Active',data.Active)
      formData.append('paths',data.paths)
      formData.append('types',data.types)
      console.log(data)

        for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try{
    if(isedit){
      console.log(formData)
  const {data}=await API.put(API_PATHS.Authadmin.UpdateBanner(selectedBanner._id),formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          if(data){
            setmodalIsOpen(false)
            FetchData()
           
            
          }
      console.log(data)
    }else{
          const res=await API.post(API_PATHS.Authadmin.AddBanner,formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
     if(res.data){
    
      setmodalIsOpen(false)
      FetchData()
      
    }
   
    }
    
    
  }catch(error){
    console.log(error)
  }
    }
    const DeleteBanner=async(id)=>{
      try{
        if(!id) return
      const {data}=await API.delete(API_PATHS.Authadmin.DeleteBanner(id))
      console.log(data)
        if(data){
          FetchData()
        }
      }catch(err){
       console.log(err)
      }
    }
   
    const HandleEdit=(item)=>{
      setSelectedBanner(item)
      setIsEdit(true)
      setmodalIsOpen(true)
      setPreviewImages(item.img[0]?.url? [item.img[0].url]:[])

    }
  
  
    const Path=["/product-view","/categories","/home","/cart"]
    const Types=['Single Banner','Carousel','MidCarousel','LastCarousel','GpBanner']
  return (
    
    <div className='p-5 bg-gray-50 rounded-sm  shadow-xl shadow-stone-300 flex flex-col my-5 mx-auto '>
      <div className='ms-auto'>
        <button  className='btn-primary' onClick={() => {
    setIsEdit(false)
    setSelectedBanner(null)
    setPreviewImages([])
    reset({
    title: "",
    paragraph: "",
    Active: false,
    paths:Path[0],
     types:Types[0]
  })

    setmodalIsOpen(true)
  }}>Add</button>
      </div>
    <BannerList banners={banners} HandleEdit={HandleEdit} DeleteBanner={DeleteBanner}/>
   <div>
  
    </div>
      <Modal modalIsOpen={modalIsOpen} onClose={onClose} width="lg:w-[50%]"  >
        <form onSubmit={handleSubmit(Submit)} className='flex flex-col gap-3'>
            <h3 className='text-2xl font-bold'>Create New Banner</h3>
            <div className='bg-slate-100  p-2 rounded-2xl'>
           <Imageupload 
          name="bannerimg"
          register={register}
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
          size={'130'}
          className='w-full mx-auto border-0'
          mode="single"

          />
        

            </div>
              <p className='text-center text-sm '>Select Image</p>
              <Input type="text" name='title' register={register} label="Title (if you want to add)"/>
              <Input textarea type='text' name='paragraph' register={register} label="Text (Additional)" className=''/>
          
            <h1>Make your Banner Active or inActive</h1>
            <div className='flex items-center leading-none gap-2'>
             
                     <input type='checkbox' name='Active' className="my-2 w-6 h-6"  {...register('Active')}  />
              
                
         <p className='hover:text-blue-400 '>Active</p>
            </div>
        <div className='w-full flex gap-2 whitespace-nowrap'>
             <Input
             label='Redirect to'
            name="paths"
            select
            options={Path.map((item, index) => ({
              name: item,
              value: item,
            
            }))}
           
            className=" w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none shadow-sm transition "
            register={register}
           

          />

          <Input select
          name='types'
          label="Type"
          options={Types.map((item,index)=>({
            name:item,
            value:item
          }))}
           className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none shadow-sm transition "
            register={register}
           />
        </div>
            
            <div className='w-full text-center mt-5'>
                   <button type='submit'
            className="min-w-[95px]  bg-red-600 text-center hover:bg-red-700 px-3 py-2 rounded-md text-white font-medium shadow transition"
            
          >{isedit? "Update":"Add"}
           
          </button>
            </div>
        </form>  

</Modal>   

    </div>
  )
}

export default Banner
