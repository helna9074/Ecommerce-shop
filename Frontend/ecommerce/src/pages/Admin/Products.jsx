import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Modal from "../../Components/UI/Modal";
import Table from "../../Components/UI/Table";

import { API_PATHS } from "../../Utils/Apipaths";
import toast from "react-hot-toast";
import API from "../../Utils/adminAxios";
import ProductForm from "../../Components/Products/ProductForm";
import { useForm } from "react-hook-form";
import ProductDetails from "../../Components/Products/ProductDetails";
import Pagination from "../../Components/UI/Pagination";
import { TbPackage } from "react-icons/tb";
import DeleteModal from "../../Components/UI/DeleteModal";
import useDeleteModal from "../../hooks/useDeleteModal";
import SearchField from "../../Components/Inputs/SearchField";
import { PaginationSkeleton } from "../../Components/UI/shadcnUI/SkeletonPagination";
import { BsThreeDots } from "react-icons/bs";
const Products = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isedit, setIsEdit] = useState(false);
  const [categories, setCategory] = useState([]);
  const { handleActive } = useOutletContext();
  const [Products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsShow, setDetailsShow] = useState(false);
  const [filteredProduct, setfilteredProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { modal, openDelete, closeDelete, confirmDelete } = useDeleteModal();
  const { reset } = useForm();
  const [loading, setLoading] = useState(false);
  const[search,setSearch]=useState('')
  
const navigate=useNavigate()
  useEffect(() => {
    handleActive("Products");
    FetchData();
  }, []);
  useEffect(() => {
    const timer=setTimeout(() => {
      FetchProducts(currentPage);
    },500)
    return()=>clearTimeout(timer)
  
    
  }, [currentPage,search]);
  const onClose = () => {
    setIsOpen(false);
    setDetailsShow(false);
  };
  const AddHandler = () => {
    reset();
    setSelectedProduct(null);
    setIsEdit(false);
    // setIsEdit(false)
    setIsOpen(true);
    // setEdit(null)
  };
  const Submit = () => {
    setSelectedProduct(null);
    setIsOpen(false);
    FetchProducts(currentPage);
  };

  const FetchData = async () => {
    try {
      const { data } = await API.get(API_PATHS.Authadmin.Category.getAll);
      console.log(data ,"this is the dropdown");

      setCategory(data.categories);
      console.log(data.category);
      console.log(categories);
    } catch (error) {
      if (error.response?.data?.message === "Token expired") {
        localStorage.removeItem("admintoken");
        toast.error("Please login agian");
      } else {
        toast.error(error.response?.data?.message || "something went wrong");
        console.log(error);
      }
    }
  };
  const FetchProducts = async (page = 1) => {
    try {
       setLoading(true);
      const res = await API.get(
        `${API_PATHS.Authadmin.getProducts}?page=${page}&search=${search}`
      );
      console.log(res.data);
      setProducts(res.data.products);
      setCurrentPage(res.data.pagination.currentPage);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  const HandleEdit = async (item) => {
    console.log(item);
    setIsEdit(true);
    setIsOpen(true);
    setSelectedProduct(item);
  };
  const OpenDelteModal = (id) => {
    if (!id) return;
    openDelete(id);
  };

  const ViewProduct = async (id) => {
    console.log(id, "the passed id");
    setDetailsShow(true);
    const result = Products.filter((item) => {
      return item._id === id;
    });
    console.log(result);
    setfilteredProduct(result);
  };
  const colums = [
    { key: "product", label: "Products" },
    { key: "Price", label: "Price" },
    { key: "Category", label: "Category" },
    { key: "Stock", label: "Stock" },

    { key: "action", label: "Action" },
    {key:'addtobanner'}
  ];
  const tableData = Products.map((product, index) => ({
    id: product._id,
    product: (
      <div className="py-4 flex items-center gap-3 w-52">
        <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0 flex items-center justify-center">
          <TbPackage size={20} className="text-gray-500" />
        </div>

        <div className="min-w-0">
          <p className="font-medium line-clamp-2">{product.name}</p>
          <p className="text-xs text-gray-500">{index + 1}</p>
        </div>
      </div>
    ),

    Price: product.amount,
    Category: product.category?.name || "No Category",
    Stock: product.stock,
   
    addtobanner:(
      <div className="w-full ">
      <button className='btn-secondary flex mx-auto' disabled={product.isBanner} onClick={()=>navigate(`/admin/Banner/${product._id}`)}>{product.isBanner ? "Added to Banner" : "Add to Banner"}</button>
      </div>
    ),
    Obj: product,
  }));

  return (
    <div className="p-5 bg-gray-50 rounded-sm  shadow-xl shadow-stone-300 flex flex-col m-5 relative ">
      <DeleteModal
        isOpen={modal.open}
        title="Delete Product"
        message="Are you sure you want to delete this Product?"
        onCancel={closeDelete}
        onConfirm={() =>
          confirmDelete({
            deleteApi: (id) =>
              API.delete(API_PATHS.Authadmin.DeleteProduct(id)),
            onSuccess: () => {
              toast.success("Product deleted successfully");
              FetchProducts(currentPage);
            },
          })
        }
      />
      <div className="flex justify-between">
        <SearchField width="w-1/2" value={search} onChange={(e)=>{setSearch(e.target.value); setCurrentPage(1)}}/>
        <button className="btn-primary " onClick={AddHandler}>
          Add
        </button>
      </div>
      <Table
      isLoading={loading}
        colums={colums}
        Products={Products}
        HandleEdit={HandleEdit}
        DeleteItem={OpenDelteModal}
        ViewItem={ViewProduct}
        data={tableData}
      />
         {loading ? (
  <PaginationSkeleton />
) : <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      /> }
     

      <Modal
        modalIsOpen={modalIsOpen}
        onClose={onClose}
        title={`${isedit ? "Update Product" : "Add Product"}`}
        width="w-1/2"
      >
     
        <ProductForm
          categories={categories}
          isedit={isedit}
          selectedProduct={selectedProduct}
          Submit={Submit}
        />
      </Modal>
      <Modal modalIsOpen={detailsShow} onClose={onClose} width="w-[70vw]">
        <ProductDetails filteredProduct={filteredProduct} />
      </Modal>
    </div>
  );
};

export default Products;
