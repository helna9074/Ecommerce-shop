import React, { useState } from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import API from "../../Utils/adminAxios";
import { API_PATHS } from "../../Utils/Apipaths";
import toast from "react-hot-toast";
import Modal from "../../Components/UI/Modal";
import Input from "../../Components/Inputs/Admininput";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Table from "../../Components/UI/Table";
import Addbtn from "../../Components/UI/Addbtn";
import { LuTrash2 } from "react-icons/lu";
import { IoAddOutline } from "react-icons/io5";
import Pagination from "../../Components/UI/Pagination";
import { PaginationSkeleton } from "../../Components/UI/shadcnUI/SkeletonPagination";
import SearchField from "../../Components/Inputs/SearchField";

const Category = () => {
  const { handleActive } = useOutletContext();
  const [categories, setCategory] = useState([]);
  const [isedit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState(null);
  const[loading,setIsLoading]=useState(false)
  const[currentPage,setCurrentPage]=useState(1)
  const[totalPages,setTotalPages]=useState(1)
  const[search,setSearch]=useState('')
  const schema = Yup.object({
    name: Yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      subcategory: "",
      subcategories: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subcategories",
  });

  useEffect(() => {
    handleActive("Category");
   
  }, []);
  useEffect(() => {
    FetchData(currentPage);
  }, [currentPage,search]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const AddCategory = async (name, subcategories) => {
    try {
      console.log("look at the subcategories", subcategories);
      onClose();
      const { data } = await API.post(API_PATHS.Authadmin.AddCategory, {
        name,
        subcategories,
      });
      if (data) {
        toast.success("Category Added Successfully");
        FetchData();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteCategory = async (id) => {
    try {
      const { data } = await API.delete(API_PATHS.Authadmin.DeleteCategory(id));
      console.log(data);
      if (data) {
        toast.success(data.message);
        FetchData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  const EditCategory = async (id, name, subcategories) => {
    try {
      const { data } = await API.put(API_PATHS.Authadmin.EditCategory(id), {
        name,
        subcategories,
      });
      console.log(data);
      if (data) {
        toast.success(data.message);
        FetchData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  };
  const FetchData = async (page=1) => {
    try {
      const { data } = await API.get(`${API_PATHS.Authadmin.getCategory}?page=${page}&search=${search}`);
      console.log(data);
       setIsLoading(true)
      setCategory(data.category);
      setCurrentPage(data.Pagination.currentPage);
      setTotalPages(data.Pagination.totalPages);
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong");
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  };
  const EditHandler = (item) => {
    if (!item) return;
    setIsOpen(true);
    setIsEdit(true);
    setEdit(item);
    setValue("name", item.name);
    setValue("subcategory", "");
    setValue("subcategories", item.subname?.map((name) => ({ name })) || []);
  };
  const AddHandler = () => {
    setIsEdit(false);
    setIsOpen(true);
    setEdit(null);
    reset();
  };

  const handleModal = (data) => {
    if (isedit) {
      EditCategory(edit._id, data.name, data.subcategories);
    } else {
      console.log(data.subcategory);
      AddCategory(data.name, data.subcategories);
    }
    reset();
    onClose();
  };
  const Watchsub = watch("subcategory");
  const colums = [
    { key: "No", label: "No." },
    { key: "Category", label: "Category" },
    { key: "SubCategory", label: "SubCategory" },
    { key: "action", label: "Action" },
  ];
  const tableData = categories.map((item, index) => ({
    id: item._id,
    No: index + 1,
    Category: item.name,
    SubCategory: item.subname?.join(","),
    Obj: item,
  }));
  const handleAdd = () => {
    const value = getValues("subcategory")?.trim();

    // 1. empty check
    if (!value) return;

    // 2. duplicate check
    const exists = fields.some(
      (item) => item.name.toLowerCase() === value.toLowerCase()
    );
    if (exists) return;

    // 3. add to list
    append({ name: value });

    // 4. clear input
    setValue("subcategory", "");
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="p-5 bg-gray-50 rounded-sm  shadow-xl shadow-stone-300 flex flex-col m-5  ">
      <SearchField width='w-1/3' value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={(e)=>setSearch(e.target.value)}/>
      <div className="ms-auto">
        <button onClick={AddHandler} className="btn-primary">
          Add
        </button>
      </div>
      <Table
      isLoading={loading}
        HandleEdit={EditHandler}
        DeleteItem={DeleteCategory}
        colums={colums}
        data={tableData}
        className={"table-fixed"}
      />
      {loading?<PaginationSkeleton/>:(
<Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page)=>setCurrentPage(page)}
      />
      )}
      
      <Modal
        modalIsOpen={modalIsOpen}
        onClose={onClose}
        isedit={isedit}
        width="w-[40%]"
        title={`${isedit ? "Update Category" : "Add Category"}`}
      >
        <form
          onSubmit={handleSubmit(handleModal)}
          className="flex flex-col gap-3"
        >
          <Input
            type="text"
            name="name"
            placeholder="Category"
            className="w-full my-2"
            register={register}
            error={errors.name?.message}
            label="Category"
          />

          <Input
            type="text"
            name="subcategory"
            placeholder="Add subcategory if you want"
            className="w-full my-2"
            register={register}
            error={errors.name?.message}
            label="SubCategories (optional)"
            onKeyDown={onKeyDown}
          />

          <div className="flex flex-col gap-2 mt-2">
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between w-1/2  px-3 py-1 border border-slate-500 rounded-sm  text-sm"
              >
                {item.name}
                <LuTrash2
                  className="cursor-pointer text-red-500"
                  onClick={() => remove(index)}
                />
              </div>
            ))}
          </div>

          <div className="w-full flex justify-end">
            <Addbtn isedit={isedit} />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Category;
