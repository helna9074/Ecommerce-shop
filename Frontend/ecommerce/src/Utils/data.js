
import { HiOutlineSquares2X2,HiOutlineCube,HiOutlinePhoto ,HiOutlineTag,HiOutlineClipboardDocumentList,HiOutlineUsers,HiOutlineBell,HiOutlineBanknotes,HiOutlineChartBar } from "react-icons/hi2";
import { FaDollarSign } from "react-icons/fa6";
import Frame1 from '../../Assets/Frame 875.png'
import Frame2 from '../../Assets/Frame 876.png'
import Frame3 from '../../Assets/image 46.png'

export const SIDE_MENU_DATA=[
    {    id:1,
        label:'Dashboard',
        path:'/admin',
        icon:HiOutlineSquares2X2
    },{
        id:2,
        label:'Category',
        path:'/admin/category',
        icon:HiOutlineTag
    },{
        id:3,
        label:'Products',
        path:'/admin/products',
       icon:HiOutlineCube
    },{
        id:4,
        label:'Banners',
        path:'/admin/Banner',
         icon:HiOutlinePhoto
    },{
        id:5,
        label:'Users',
        path:'/admin/users',
       icon:HiOutlineUsers
    },{
        id:6,
        label:'Orders',
        path:'/admin/orders',
         icon:HiOutlineClipboardDocumentList
    },{
        id:7,
        label:'Expense',
        path:'/admin/expense',
        icon:HiOutlineBanknotes
    },{
        id:8,
        label:'Notifications',
        path:'/admin/notifications',
        icon:HiOutlineBell
    },{
        id:9,
        label:'Reports',
        path:'/admin/reports',
        icon:HiOutlineChartBar
    }

]

export const AccountMenu=[
    {
        id:1,
        title:'Manage Account',
         subheading:{
            label:'profile',
            path:'myprofile'
         },
         subheading2:{
            label:'Address Book',
            path:'myaddress',
         }

    },{
        id:2,
        title:'Order History',
        subheading:{
            label:'Orders',
            path:'myorders',
        },
        
    },
]
export const Orderbtn=[
    {id:1,label:"All"},
    {id:2,label:"PLACED"},
    {id:3,label:"CONFIRMED"},
    {id:4,label:"SHIPPED"},
    {id:5,label:"DELIVERED"},
    {id:6,label:"CANCEL_REQUESTED"},
    {id:7,label:"CANCELLED"},
]
export const Reportbtn=[
 { 
    id:1,
    label:"Sales Report",
    type:'sales',
    SalesReport:[
        {id:1,label:"Sales by Items",view:'item'},
        {id:2,label:"Sales by PaymentMethod",view:'payment'},
        {id:3,label:"Sales by Category",view:'category'},
    ]
 },
 {
    id:2,
    label:"Profit&Loss",
    type:'p&l'
 }
]
 
export const cardsConfig = [
  {
    key: "revenue",
    title: "Total Revenue",
    valueKey: "totalRevenue",
    changeKey: "revenueChange",
    prefix: "₹",
    icon:FaDollarSign,
    iconColor:"bg-green-500",
    changeType: "percentage",
  },
  {
    key: "orders",
    title: "Total Orders",
    valueKey: "totalOrders",
    changeKey: "orderChange",
    icon:HiOutlineClipboardDocumentList,
    iconColor:"bg-red-500",
    changeType: "count",
  },
  {
    key: "customers",
    title: "Total Customers",
    valueKey: "totalCustomers",
    changeKey: "customerDiff",
     icon:HiOutlineUsers,
     iconColor:"bg-green-500",
     changeType: "count",
  },
  {
    key: "products",
    title: "Total Products",
    valueKey: "totalProducts",
    changeKey: "productDiff",
    icon:HiOutlineCube,
    iconColor:"bg-yellow-500",
    changeType: "count",
  }
];

export const orderStatus = [
  { id: "PLACED", label: "Placed", color: "bg-yellow-500" },
  { id: "CONFIRMED", label: "Confirmed", color: "bg-blue-400" },
  { id: "SHIPPED", label: "Shipped", color: "bg-purple-500" },
  { id: "DELIVERED", label: "Delivered", color: "bg-green-500" },
  { id: "CANCELLED", label: "Cancelled", color: "bg-red-500" },
  { id: "CANCEL_REQUESTED", label: "Cancel Requested", color: "bg-orange-500" },
];
export const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
export const TeamsImg=[
  {id:1,img:Frame1,name:"Tom Cruise",role:"Founder & Chairman"},
  {id:2,img:Frame2,name:"Emma Watson",role:"Managing Director",},
  {id:3,img:Frame3,name:"Will smit",role:"Product Designer"},
]