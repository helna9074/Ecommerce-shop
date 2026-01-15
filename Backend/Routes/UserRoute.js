import express from "express";
import {
  getUser,
  LoginUser,
  RegisterUser,
  UpdateUser,
} from "../Controllers/UserController/User.js";
import { Authorization } from "../MIddleware/Authorization.js";
import {  GetBanner, GetParticularProduct, getProducts,  RelatedProducts, SuggestedProducts } from "../Controllers/UserController/Items.js";
import { AddCartItem, GetCartItems, GetCheckoutItems, RemoveCartItem, UpdateItems } from "../Controllers/UserController/CartController.js";
import { AddWishItem, GetWishItems, RemoveWishItem } from "../Controllers/UserController/WishlistController.js";
import { CreateOrder } from "../Controllers/UserController/OrderController.js";
import { GetAddress } from "../Controllers/UserController/AddressController.js";
import { createRazorpayOrder } from "../Controllers/UserController/razorpayController.js";



const router = express.Router();
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/banner", GetBanner);
router.get('/products',getProducts)
router.get('/OneProduct/:id',GetParticularProduct)
router.get('/RelatedProducts/:id',RelatedProducts)
router.get('/suggested-products',SuggestedProducts)
router.post('/cartItems',Authorization,AddCartItem)
router.get('/cartItems',Authorization,GetCartItems)
router.patch('/cartItems',Authorization,UpdateItems)
router.delete('/cartItem/:id',Authorization,RemoveCartItem)
router.post('/wishItems/:id',Authorization,AddWishItem)
router.get('/wishlistItems',Authorization,GetWishItems)
router.delete('/wishItem/:id',Authorization,RemoveWishItem)
router.get('/checkout',Authorization,GetCheckoutItems)
router.post('/order',Authorization,CreateOrder)
router.get('/address',Authorization,GetAddress)
router.post('/razorpay-order',Authorization,createRazorpayOrder)
router.get('/user',Authorization,getUser)
router.put('/user',Authorization,UpdateUser)
export default router;
