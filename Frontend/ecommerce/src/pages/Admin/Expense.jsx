import React, { useEffect, useState } from "react";
import Table from "../../Components/UI/Table";
import Modal from "../../Components/UI/Modal";
import Input from "../../Components/Inputs/Admininput";
import Addbtn from "../../Components/UI/Addbtn";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import API from "../../Utils/adminAxios";
import { API_PATHS } from "../../Utils/Apipaths";
import SeachBar from "../../Components/Inputs/SeachBar";
import SearchField from "../../Components/Inputs/SearchField";
import { formatDate } from "../../Utils/helper";
import Pagination from "../../Components/UI/Pagination";
import DeleteModal from "../../Components/UI/DeleteModal";
import useDeleteModal from "../../hooks/useDeleteModal";
import toast from "react-hot-toast";
import { PaginationSkeleton } from "../../Components/UI/shadcnUI/SkeletonPagination";
const Expense = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
    title: "",
    category: "",
    amount: "",
    date: "",
  },
  });
  const [isedit, setIsedit] = useState(false);
  const { handleActive } = useOutletContext();
  const [expense, setExpense] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const {modal, openDelete, closeDelete, confirmDelete} = useDeleteModal();
  useEffect(() => {
    handleActive("Expense");
  }, []);
  useEffect(() => {
    FetchExpense(currentPage);
  }, [currentPage, search]);
  useEffect(() => {
    if (isedit && selectedExpense)
      reset({
        title: selectedExpense.title,
        category: selectedExpense.category,
        amount: selectedExpense.amount,
        date: selectedExpense.expenseDate.split("T")[0],
      });
  }, [isedit,selectedExpense]);
  const FetchExpense = async (page = 1) => {
  
    try {

      
       setLoading(true)
           const {data}= await API.get(
        `${API_PATHS.Authadmin.Expense.getExpense}?page=${page}&search=${search}`,
      );
        
        
        
           console.log(data);
      setExpense(data.expense);
      
      setCurrentPage(data.Pagination.currentPage);
      setTotalPages(data.Pagination.totalPages);
      
        
     
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const colums = [
    { key: "No", label: "No" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "action", label: "Action" },
  ];
  const PAGE_SIZE = 10;
  const tableData = expense?.map((item, index) => {
    return {
      id:item._id,
      No:String((currentPage - 1) * PAGE_SIZE + index + 1).padStart(3, "0"),
      title: (
        <div className=" flex flex-wrap my-3 line-clamp-2 me-3">
          {item.title}
        </div>
      ),
      category: item.category,
      amount: item.amount,
      date: item.expenseDate ? formatDate(item.expenseDate) : "",

      Obj:item,
    };
  });
  const HandleEdit = (item) => {
    setIsedit(true);
    setModalIsOpen(true);
    setSelectedExpense(item);
    console.log(item);
  };

  const handleModal = async (datas) => {
    try {
      setLoading(true);
       
        if(isedit&&selectedExpense){
          const {data} = await API.put(
            API_PATHS.Authadmin.Expense.updateExpense(selectedExpense._id),datas,
          );
          
        }else{
          const {data} = await API.post(
        API_PATHS.Authadmin.Expense.addExpense,
        datas,
           
      );
      
        }
    
      setModalIsOpen(false);
    setIsedit(false);
    setSelectedExpense(null);
   
    FetchExpense(currentPage);
     

      
        
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false);
    }
  };
  const DeleteExpense =(id) => {
    openDelete(id);
   
  };
  const AddHandler = () => {
  setIsedit(false);
  setSelectedExpense(null);
  reset({
    title: "",
    category: "",
    amount: "",
    date: "",
  });
  setModalIsOpen(true);
};

  const CloseModal=()=>{
    setModalIsOpen(false);
    setSelectedExpense(null);
    reset()
  }
  return (
    <div className="p-5 bg-gray-50 rounded-sm  shadow-xl shadow-stone-300 flex flex-col gap-5 m-5  relative ">
      <DeleteModal
        title="Delete Expense"
        message="Are you sure you want to delete this expense"
        isOpen={modal.open}
        onCancel={()=>closeDelete}
        onConfirm={() =>
          confirmDelete({
            deleteApi: (id) =>
              API.delete(API_PATHS.Authadmin.Expense.deleteExpense(id)),
            onSuccess: () =>{toast.success("Expense deleted successfully"), FetchExpense(currentPage) }
          })
          
        }
      />
      <SearchField value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="ms-auto">
        <button onClick={() => AddHandler()} className="btn-primary">
          Add
        </button>
      </div>
      <Table
      isLoading={loading}
        HandleEdit={HandleEdit}
        DeleteItem={DeleteExpense}
        colums={colums}
        data={tableData}
        className={"table-fixed"}
      />
      {loading?<PaginationSkeleton/>:(
<Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        onPageChange={(page)=>setCurrentPage(page)}
      />
      )}
      
      <div></div>
      <Modal
        modalIsOpen={modalIsOpen}
        onClose={() => CloseModal()}
        isedit={isedit}
        width="w-[40%]"
        title={`${isedit ? "Update Expense" : "Add Expense"}`}
      >
        <form
          onSubmit={handleSubmit(handleModal)}
          className="flex flex-col gap-3"
        >
          <Input
            type="text"
            name="title"
            placeholder="Enter the title of the expense"
            className="w-full my-2"
            register={register}
            error={errors.name?.message}
            label="Title"
          />
          <Input
            type="text"
            name="category"
            placeholder="Enter your category"
            className="w-full my-2"
            register={register}
            error={errors.name?.message}
            label="Category"
          />
          <Input
            type="text"
            name="amount"
            placeholder="Enter your amount"
            className="w-full my-2"
            register={register}
            error={errors.name?.message}
            label="Amount"
          />
          <Input
            type="date"
            name="date"
            placeholder="Enter your date"
            className="w-full my-2"
            register={register}
            error={errors.name?.message}
            label="Date"
          />

          <div className="w-full flex justify-end">
            <Addbtn isedit={isedit} loading={loading} />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Expense;
