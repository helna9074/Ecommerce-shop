import express from "express";
import {
  Getdetails,
  LoginUser,
  RegisterUser,
} from "../Controllers/UserController/User.js";
import { Authorization } from "../MIddleware/Authorization.js";
import { GetBanner, Getproducts } from "../Controllers/UserController/Items.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/getdetails", Authorization, Getdetails);
router.get("/banner", GetBanner);
router.get('/products',Getproducts)

//this comit

export default router;
