import express from "express";
import { LoginAdmin, Register } from "../Controllers/AdminController/Admin.js";
import { adminAuthorization } from "../MIddleware/Authorization.js";
import {
 
  Getproducts,
  UpdateProduct,
  DeleteProduct,
  addProducts,
 
} from "../Controllers/AdminController/Product.js";
import multer from "multer";
import {
  AddBanner,
  DeleteBanner,
  GetBanners,
  UpdateBanner,
} from "../Controllers/AdminController/Banner.js";
import { DeleteCategory, EditCategory, getAllCategories, getCategory, SetCategory } from "../Controllers/AdminController/Category.js";
import { GetAllOrders, UpdateOrderStatus } from "../Controllers/AdminController/Order.js";
import { refundPayment } from "../Controllers/AdminController/paymentController.js";
import { BlockUser, GetAllUsers } from "../Controllers/AdminController/User.js";
import { addExpense, DeleteExpense, GetExpense, UpdateExpense } from "../Controllers/AdminController/Expense.js";
import { GetAlerts, GetStock, MarkAllSeen, UpdateStock } from "../Controllers/AdminController/Notification.js";
import { downloadReport, getReports } from "../Controllers/AdminController/Report.js";
import { getDashboardBestSellingProducts, getDashboardBoxdata, getDashboardOrdersView, getDashboardRecentOrders, getDashboardSalesAnalytics, getDashboardTopCustomers, getTopRatedProducts, RecentExpense, topCategories } from "../Controllers/AdminController/Dashboard.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", Register);
router.post("/login", LoginAdmin);
router.post("/add-category", adminAuthorization, SetCategory);
router.get("/getCategory", adminAuthorization, getCategory);
router.get('/allCategories',adminAuthorization,getAllCategories)
router.delete("/delete/:id", adminAuthorization, DeleteCategory);
router.put("/update/:id" ,adminAuthorization, EditCategory);
router.post("/addproducts", upload.array("img", 5), addProducts);
router.get("/products", adminAuthorization, Getproducts);
router.put(
  "/updateProduct/:id",
  adminAuthorization,
  upload.array("img", 5),
  UpdateProduct
);
router.delete("/product/:id", adminAuthorization, DeleteProduct);
router.post(
  "/banner",
  adminAuthorization,
  upload.single("BannerImg"),
  AddBanner
);
router.get("/banner", adminAuthorization, GetBanners);
router.put(
  "/banner/:id",
  adminAuthorization,
  upload.single("BannerImg"),
  UpdateBanner
);
router.delete("/banner/:id", adminAuthorization, DeleteBanner);
router.get('/orders',adminAuthorization,GetAllOrders)
router.put('/order/:id',adminAuthorization,UpdateOrderStatus)
router.post('/refund/:id',adminAuthorization,refundPayment)
router.get('/users',adminAuthorization,GetAllUsers)
router.post('/blockuser/:id',adminAuthorization,BlockUser)
router.post('/expense',adminAuthorization,addExpense)
router.get('/expense',adminAuthorization,GetExpense)
router.delete('/expense/:id',adminAuthorization,DeleteExpense)
router.put('/expense/:id',adminAuthorization,UpdateExpense)
router.get('/notifications',adminAuthorization,GetAlerts)
router.put('/notifications',adminAuthorization,MarkAllSeen)
router.get('/stock/:id',adminAuthorization,GetStock)
router.put('/stock/:id',adminAuthorization,UpdateStock)

router.get('/reports',adminAuthorization,getReports)
router.get('/dashboard/quickview',adminAuthorization,getDashboardBoxdata)
router.get('/dashboard/ordersview',adminAuthorization,getDashboardOrdersView)
router.get('/dashboard/recentorders',adminAuthorization,getDashboardRecentOrders)
router.get('/dashboard/sales',adminAuthorization,getDashboardSalesAnalytics)
router.get('/dashboard/topcustomers',adminAuthorization,getDashboardTopCustomers)
router.get('/dashboard/bestsellings',adminAuthorization,getDashboardBestSellingProducts)
router.get('/dashboard/category',adminAuthorization,topCategories)
router.get('/dashboard/topratings',adminAuthorization,getTopRatedProducts)
router.get('/dashboard/expenses',adminAuthorization,RecentExpense)
router.get('/report/download',adminAuthorization,downloadReport)

//my routes

export default router;
