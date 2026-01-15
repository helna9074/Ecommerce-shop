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
import { DeleteCategory, EditCategory, getCategory, SetCategory } from "../Controllers/AdminController/Category.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", Register);
router.post("/login", LoginAdmin);
router.post("/add-category", adminAuthorization, SetCategory);
router.get("/getCategory", adminAuthorization, getCategory);
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



//my routes

export default router;
