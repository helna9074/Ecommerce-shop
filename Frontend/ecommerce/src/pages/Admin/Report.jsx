import React, { useEffect, useState } from 'react'
import { useFetcher, useOutletContext } from 'react-router-dom'
import { Reportbtn } from '../../Utils/data'
import Table from '../../Components/UI/Table'
import { API_PATHS } from '../../Utils/Apipaths'
import API from '../../Utils/adminAxios'
import SearchField from '../../Components/Inputs/SearchField'
import Pagination from '../../Components/UI/Pagination'
import { FiDownload } from "react-icons/fi";

const Report = () => {
    const {handleActive}=useOutletContext()
    const [Activebtn,setActivebtn]=useState("Sales Report")
    const[SubActivebtn,setSubActivebtn]=useState("Sales by Items")
    const [search,setSearch]=useState("")
    const[startDate,setStartDate]=useState(null)
    const[endDate,setEndDate]=useState(null)
    const[Datas,setDatas]=useState([])
    const[plDatas,setplDatas]=useState(null)
    const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

const[loading,setLoading]=useState(false) 
const LIMIT = 10;

    useEffect(()=>{
            handleActive('Reports')
    },[])
    const activeReport=Reportbtn.find((btn)=>btn.label===Activebtn)
   const activeSubReport =
  activeReport?.type === "sales"
    ? activeReport.SalesReport.find(
        (sub) => sub.label === SubActivebtn
      )
    : null;

    
    useEffect(()=>{
      setCurrentPage(1)
    },[Activebtn,SubActivebtn,search,startDate,endDate])
    useEffect(()=>{
       FetchReports(currentPage)
    },[currentPage,search,startDate,endDate,Activebtn,SubActivebtn])
       const FetchReports=async(page=1)=>{
        try{
          setLoading(true)
            
             const params={
                type:activeReport?.type,
                page,
                limit:LIMIT,
                search,
                
              }
              if (activeReport?.type === "sales") {
      params.view = activeSubReport?.view;
    }
              
            const {data}=await API.get(API_PATHS.Authadmin.Reports.getReports,{params})
            console.log("this is the report data",data)
            if(activeReport?.type==='p&l'){
              setplDatas(data)
               setDatas([])
             setTotalPages(1)
             
         
            }else{
              setDatas(data.report)
              setplDatas(null)
              setTotalPages(data.Pagination?.totalPages||1)
              setCurrentPage(data.Pagination?.currentPage||1)
            }
             
        }catch(err){
         console.log(err)
        }finally{
          setLoading(false)
        }
    }
    
     const colums=
     [
        {key:"No",label:"Order Id"},
        {key:"name",label:"Name"},
        {key:"Qty",label:"Quantity"},
        {key:"total",label:"Total"},

    ]
   const tableData =
    Datas.map((row, index) => ({
          id: row._id || index,
          No: String((currentPage - 1) *LIMIT  + index + 1).padStart(2, "0"),
            name: (
          <p className='truncate line-clamp-3 py-3'>{row.name || row.categoryName || row._id}</p>
          ),
          Qty: row.totalQty ?? row.totalOrders ?? "-",
          total: row.totalAmount ?? row.total ?? "-",
        }));
const downloadReport = async () => {
  try {
    const params = {
      type: activeReport?.type,
      page: currentPage,
      limit: LIMIT,
      search,
    };

    if (activeReport?.type === "sales") {
      params.view = activeSubReport?.view;
    }

    const response = await API.get(
      API_PATHS.Authadmin.Report.downloadReport,
      {
        params,
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = `${Activebtn}-${SubActivebtn || "PL"}-page${currentPage}.xlsx`;
    link.click();
  } catch (err) {
    console.error("Download failed", err);
  }
};

    
  return (
    <div className='w-full p-3 flex flex-col gap-5'>
           
            <div className='w-full flex gap-3 p-3 bg-slate-100 '>
               
              {Reportbtn.map((btn) => (
          <button
            key={btn.id}
            className={`${
              Activebtn === btn.label
                ? "order-box"
                : "bg-slate-200 p-3 rounded"
            } w-52`}
            onClick={() => setActivebtn(btn.label)}
          >
            {btn.label}
          </button>
        ))}
             
            </div>
              {activeReport?.SalesReport && (
        <div className="w-full flex gap-3 p-3 bg-slate-100">
          {activeReport.SalesReport.map((item) => (
            <button
              key={item.id}
               className={`${
              SubActivebtn === item.label
                ? "order-box"
                : "bg-slate-200 p-3 rounded"
            } `}
             onClick={()=>setSubActivebtn(item.label)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
          <div className='w-full flex justify-between '>
<SearchField value={search} onChange={(e)=>{setSearch(e.target.value);setCurrentPage(1)}} width="w-1/5"/> 
  <div className='w-8 h-8 bg-green-800 text-white flex justify-between items-center rounded-2xl'>
<FiDownload size={20} className=' cursor-pointer mx-auto'  onClick={downloadReport}/>
  </div>
  
          </div>
                  
                     
                {activeReport?.type === "p&l"  ? (
  <div className="w-full mx-auto bg-white rounded-lg shadow-md p-6 border">
    
    {/* Header */}
    <h2 className="text-center text-lg font-semibold mb-6 pb-2">
      Profit & Loss Statement
    </h2>

    {/* Income */}
    <div className="flex justify-between py-2 text-sm">
      <span className="text-gray-600">Total Sales</span>
      <span className="font-semibold text-green-600">
        ₹ {plDatas?.income??0}
      </span>
    </div>

    <hr />

    {/* Expense */}
    <div className="flex justify-between py-2 text-sm">
      <span className="text-gray-600">Total Expenses</span>
      <span className="font-semibold text-red-600">
        ₹ {plDatas?.expense??0}
      </span>
    </div>

    <hr className="my-2" />

    {/* Profit */}
    <div className="flex justify-between py-3 text-base font-bold">
      <span>Net Profit</span>
      <span
        className={
        plDatas?.profit >= 0
            ? "text-green-700"
            : "text-red-700"
        }
      >
        ₹{plDatas?.profit??0}
      </span>
    </div>

    {/* Footer */}
    <div className="text-center text-xs text-gray-400 mt-4">
      Generated automatically
    </div>
  </div>
):(

       
  <Table
  isLoading={loading}
    colums={colums}
    data={tableData}
    loading={loading}
    currentPage={currentPage}
    totalPages={totalPages}
    setCurrentPage={setCurrentPage}
  />
)}
      <Pagination 
      currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>
    </div>
  )
}

export default Report
