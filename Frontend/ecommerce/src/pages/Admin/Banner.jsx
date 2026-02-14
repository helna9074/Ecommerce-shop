import React, { useEffect, useState } from "react";
import Modal from "../../Components/UI/Modal";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Input from "../../Components/Inputs/Admininput";
import { useForm } from "react-hook-form";
import API from "../../Utils/adminAxios";
import { API_PATHS } from "../../Utils/Apipaths";
import SingleImageuploader from "../../Components/Inputs/SingleImageuploader";
import Pagination from "../../Components/UI/Pagination";
import Table from "../../Components/UI/Table";
import Addbtn from "../../Components/UI/Addbtn";
import DeleteModal from "../../Components/UI/DeleteModal";
import useDeleteModal from "../../hooks/useDeleteModal";
import toast from "react-hot-toast";
const Banner = () => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const { handleActive } = useOutletContext();
  const [previewBanner, setPreviewBanner] = useState(null);
  const [banners, setBanners] = useState([]);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isedit, setIsEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
const {modal,openDelete,closeDelete,confirmDelete}=useDeleteModal()
const[loading,setLoading]=useState(false)
const navigate=useNavigate()
  const onClose = () => {
    setmodalIsOpen(false);
    setIsEdit(false);
    setSelectedBanner(null);
    setPreviewBanner(null);
    reset();
     navigate("/admin/Banner", { replace: true });

  };
  const {id}=useParams()
  console.log("this is the product id",id)
  useEffect(() => {
    if(id){
      setmodalIsOpen(true)
    }else{
      setmodalIsOpen(false)
    }
  },[])

  const FetchData = async (page = 1) => {
    try {
      setLoading(true)
      console.log("api activatedd");
      const { data } = await API.get(
        `${API_PATHS.Authadmin.GetBanners}?page=${page}`
      );
      console.log(data);
      if (data) {
        setBanners(data.Banners);
        setCurrentPage(data.Pagination.currentPage);
        setTotalPages(data.Pagination.totalPages);
      }
    } catch (err) {
      console.log(err);
    }finally{
    setLoading(false)
    }
  };

  useEffect(() => {
    handleActive("Banners");
    FetchData(currentPage);
    if (isedit && selectedBanner) {
      reset({
        title: selectedBanner.title,
        paragraph: selectedBanner.paragraph,
        Active: selectedBanner.status,
        paths: selectedBanner.paths,
        types: selectedBanner.types,
      });
    }
  }, [isedit, selectedBanner, reset, currentPage]);

  const Submit = async (data) => {
    setLoading(true)
    const formData = new FormData();
    console.log(data.BannerImg);
    if (data.BannerImg) {
      formData.append("BannerImg", data.BannerImg);
    }

    formData.append("title", data.title);
    formData.append("paragraph", data.paragraph);
    formData.append("Active", data.Active);
    formData.append("paths", data.paths);
    formData.append("types", data.types);
    formData.append("productId",id)
    console.log(data);
 
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      if (isedit) {
        console.log(formData);
        const { data } = await API.put(
          API_PATHS.Authadmin.UpdateBanner(selectedBanner._id),
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (data) {
          setLoading(false)
          setmodalIsOpen(false);
          toast.success("Updated successfully")
          FetchData(currentPage);
        }
        console.log(data);
      } else {
        const res = await API.post(API_PATHS.Authadmin.AddBanner, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data) {
          setLoading(false)
          toast.success("Added successfully")
          setmodalIsOpen(false);
          FetchData(currentPage);
          
        }
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };
  const DeleteBanner =  (id) => {
    openDelete(id)
    // try {

    //   if (!id) return;
    //   const { data } = await API.delete(API_PATHS.Authadmin.DeleteBanner(id));
    //   console.log(data);
    //   if (data) {
    //     FetchData();
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const HandleEdit = (item) => {
    setSelectedBanner(item);
    setIsEdit(true);
    setmodalIsOpen(true);
    setPreviewBanner(item.img[0]?.url ? item.img[0].url : null);
  };
  const colums = [
    { key: "No", label: "No.", width: "w-32" },
    { key: "img", label: "Banner" },
    { key: "Title", label: "Title" },
    { key: "Type", label: "Type" },
    { key: "Text", label: "Text", style: "flex flex-wrap" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];
  const tableData = banners.map((banner, index) => ({
    id: banner._id,
    img: (
      <div className="w-32 p-2 text-center flex justify-center">
        <img
          src={banner.img[0]?.url}
          alt=""
          className="w-full  object-contain"
        ></img>
      </div>
    ),
    No: index + 1,
    Title: banner.title,
    Type: banner.types,
    Text: banner.paragraph ? (
      banner.paragraph
    ) : (
      <p className="text-sm text-red-400 line-clamp-3 ">No Text</p>
    ),
    status: banner.status ? "Active" : "Inactive",
    Obj: banner,
  }));

  const Path = ["none","/product-view", "/categories", "/home", "/cart"];
  const Types = [
    "Single Banner",
    "Carousel",
    "MidCarousel",
    "LastCarousel",
    "GpBanner",
  ];
  return (
    <div className="p-5 bg-gray-50 rounded-sm  shadow-xl shadow-stone-300 flex flex-col  m-5  relative ">
     
      <DeleteModal title="Delete Banner" messsage="Are you sure to delete?" isOpen={modal.open} onCancel={closeDelete} onConfirm={()=>
        confirmDelete({
          deleteApi:(id)=>API.delete(API_PATHS.Authadmin.DeleteBanner(id)),
          onSuccess:()=>{toast.success("Banner deleted successfully"),FetchData(currentPage)}

        })
      } />
    
      <div className="ms-auto">
        <button
          className="btn-primary"
          onClick={() => {
            setIsEdit(false);
            setSelectedBanner(null);
            setPreviewBanner(null);
            reset({
              title: "",
              paragraph: "",
              Active: false,
              paths: Path[0],
              types: Types[0],
            });

            setmodalIsOpen(true);
          }}
        >
          Add
        </button>
      </div>

      <Table
      isLoading={loading}
        HandleEdit={HandleEdit}
        DeleteItem={DeleteBanner}
        colums={colums}
        data={tableData}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <Modal modalIsOpen={modalIsOpen} onClose={onClose} width="lg:w-[50%]">
        <form onSubmit={handleSubmit(Submit)} className="flex flex-col gap-3">
          {id?<h3 className="text-2xl font-bold">Create Banner for Product</h3>:      <h3 className="text-2xl font-bold">Create New Banner</h3>}
    
          <div className="bg-slate-100  p-2 rounded-2xl">
            <SingleImageuploader
              name="bannerimg"
              register={register}
              previewBanner={previewBanner}
              setPreviewBanner={setPreviewBanner}
              setValue={setValue}
            />
          </div>
   
          <p className="text-center text-sm ">Select Image</p>
          <Input
            type="text"
            name="title"
            register={register}
            label="Title (if you want to add)"
          />
          <Input
            textarea
            type="text"
            name="paragraph"
            register={register}
            label="Text (Additional)"
            className=""
          />

          <h1>Make your Banner Active or inActive</h1>
          <div className="flex items-center leading-none gap-2">
            <input
              type="checkbox"
              name="Active"
              className="my-2 w-6 h-6"
              {...register("Active")}
            />

            <p className="hover:text-blue-400 ">Active</p>
          </div>
          <div className="w-full flex gap-2 whitespace-nowrap">
            <Input
              label="Redirect to"
              name="paths"
              select
              options={Path.map((item, index) => ({
                name: item,
                value: item,
              }))}
              className=" w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none shadow-sm transition "
              register={register}
            />

            <Input
              select
              name="types"
              label="Type"
              options={Types.map((item, index) => ({
                name: item,
                value: item,
              }))}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none shadow-sm transition "
              register={register}
            />
          </div>

          <Addbtn isedit={isedit} loading={loading} />
        </form>
      </Modal>
    </div>
  );
};

export default Banner;