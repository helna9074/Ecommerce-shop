
import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import API from '../../Utils/adminAxios'
import { API_PATHS } from '../../Utils/Apipaths'
import Dashboardbox from '../../Components/Dashboard/Dashboarbox'
import SalesAnalyticsChart from '../../Components/Dashboard/SalesAnalyticsChart'
import { MONTH_NAMES, orderStatus } from '../../Utils/data'
import Customers from '../../Components/Dashboard/Customers'
import BestsellingProducts from '../../Components/Dashboard/BestsellingProducts'
import RecentOrder from '../../Components/Dashboard/RecentOrder'
import TopCategories from '../../Components/Dashboard/TopCategories'
import {SkeletonCards} from '../../Components/UI/shadcnUI/SkeletonCard'
import {SkeletonChart} from '../../Components/UI/shadcnUI/SkeletonChart'
import {SkeletonOrder} from '../../Components/UI/shadcnUI/SkeletonOrder'
import { ListSkeleton } from '../../Components/UI/shadcnUI/SkeletonList'
import { SkeletonTable } from '../../Components/UI/shadcnUI/SkeletonTable'
import TopRated from '../../Components/Dashboard/TopRated'
import Expense from '../../Components/Dashboard/Expense'


const Home = () => {
const {handleActive}=useOutletContext();
const [range,setRange]=useState('month')
const [loading, setLoading] = useState(false)
const[ViewData,setViewData]=useState(null)
const[salesData,setSalesData]=useState(null)
const[ordersStatus,setOrdersStatus]=useState(null)
const[topCustomers,setTopCustomers]=useState([])  
const[topCategories,setTopCategories]=useState(null)
const[bestSellingProducts,setBestSellingProducts]=useState([])
const[recentOrders,setRecentOrders]=useState(null)
const[topRatingProducts,setTopRatingProducts]=useState([])
const[recentExpense,setRecentExpense]=useState([])
  useEffect(()=>{
    handleActive('Dashboard')
   
   
  },[])
  useEffect(()=>{
    const fetchAll=async()=>{
      setLoading(true)
      await Promise.all([
 FetchQuickView(),
FetchOrdersView(),
FetchTopCustomers(),
FetchBestSellings(),
FetchRecendOrders(),
FetchTopCategories(),
FetchBestSellings(),
TopRatingProducts(),
RecentExpense()
      ])
      setLoading(false)
    }
   
      fetchAll()
  
   

  },[])
  useEffect(()=>{
    FetchSalesAnalytics()
  },[range])
  const FetchQuickView=async()=>{
    try{
      
const {data}=await API.get(API_PATHS.Authadmin.Dashboard.getquickView)
    console.log(data)
    setViewData(data.cards)
    }catch(err){
      console.log(err)
    }
    
  }
   const FetchOrdersView=async()=>{
    try{
      
const {data}=await API.get(API_PATHS.Authadmin.Dashboard.getOrdersView)
    console.log(data)
    setOrdersStatus(data.ordersOverview)
    }catch(err){
      console.log(err)
    }
    
  }
   const FetchSalesAnalytics=async()=>{
    try{
      
const {data}=await API.get(`${API_PATHS.Authadmin.Dashboard.getSalesAnalytics}?range=${range}`)
    console.log(data)
    setSalesData(data.salesAnalytics)
    }catch(err){
      console.log(err)
    }
    
  }
  const FetchTopCustomers=async()=>{
    try{
      
const {data}=await API.get(API_PATHS.Authadmin.Dashboard.getTopCustomers)
    console.log(data)
    setTopCustomers(data.topCustomers)
    }catch(err){
      console.log(err)
    }
    
  }
   const FetchBestSellings=async()=>{
    try{
      
const {data}=await API.get(API_PATHS.Authadmin.Dashboard.getBestSellingProducts)
    console.log("this the bestsellings",data)
    setBestSellingProducts(data.bestSellingProducts)
    }catch(err){
      console.log(err)
    }
    
  }
   const FetchTopCategories=async()=>{
    try{
      
const {data}=await API.get(API_PATHS.Authadmin.Dashboard.getTopCategories)
    console.log(data)
    setTopCategories(data.topCategories)
    }catch(err){
      console.log(err)
    }
    
  }
   const FetchRecendOrders=async()=>{
    try{
      
const {data}=await API.get(API_PATHS.Authadmin.Dashboard.getRecentOrders)
    console.log(data)
    setRecentOrders(data.recentOrders)
    }catch(err){
      console.log(err)
    }
    
  }
  const TopRatingProducts=async()=>{
    try{
      
const {data}=await API.get(API_PATHS.Authadmin.Dashboard.getTopRatings)
    console.log("this is the top ratinss",data)
    setTopRatingProducts(data.topRatedProducts)
    }catch(err){
      console.log(err)
    }
  }
 const chartData = salesData?.map(item => ({
 
  label: item.label,       // "Mon" or "Jan"
  revenue: item.revenue,
  orders: item.orders
}))

const RecentExpense=async()=>{
  try{
    
const {data}=await API.get(API_PATHS.Authadmin.Dashboard.getRecentexpense)
console.log("this isthe expense",data)
setRecentExpense(data.expenses)
}catch(err){
  console.log(err)
}
 

}
const totalOrders = Object.values(ordersStatus || {}).reduce(
  (sum, val) => sum + val,
  0
);


 return (
  <div className='w-full bg-slate-100 h-full flex flex-col gap-5'>
 {loading?(
  <SkeletonCards/>
 ):(
   <Dashboardbox data={ViewData}  />
 )}
    
     <div className='w-full flex gap-2 px-8'>
       {loading?<SkeletonChart/>:(
<div className="bg-white p-4 rounded-2xl shadow w-1/2 ">
     <h1 className='text-xl font-semibold  mb-2'>Sales Overview</h1>
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setRange("week")}
            className={`px-3 py-1 rounded ${
              range === "week" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setRange("month")}
            className={`px-3 py-1 rounded ${
              range === "month" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Month
          </button>
        </div>

        <SalesAnalyticsChart data={chartData} />
        </div>
       )}
     {loading?(
      <SkeletonOrder/>
     ):(
 <div className="bg-white p-4 shadow w-1/4  rounded-2xl ">
  <h1 className="text-lg font-semibold mb-3">Orders Overview</h1>

  {orderStatus?.map((item) => {
    const count = ordersStatus?.[item.id] || 0;
    const percentage=totalOrders?(count/totalOrders)*100:0

    return (
      <div key={item.id} className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>{item.label}</span>
          <span>{count}</span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full ${item.color} rounded-full`} style={{width:`${percentage}%`}}>
            </div>  
         
     
      </div>
      </div>
    );
  })}
</div>
     )}
    
{loading?<ListSkeleton/>:(
  <Customers Datas={topCustomers} />
)}


</div>
<div className="w-full flex p-8 gap-2">
  {loading ? (
    <>
      <ListSkeleton />
      <ListSkeleton />
      <ListSkeleton />
    </>
  ) : (
    <>
      <BestsellingProducts data={bestSellingProducts} />
      <TopCategories categories={topCategories} />
      <RecentOrder orders={recentOrders} />
    </>
  )}
</div>
 <div className='w-full flex p-8 gap-2'>
   {loading ? (
    <>
      <ListSkeleton />
      <ListSkeleton />
     
    </>
  ) : (
    <>
      <TopRated products={topRatingProducts} />
  <Expense expenses={recentExpense} />
    </>
  )}
  
 </div>
  </div>
  )
}

export default Home
