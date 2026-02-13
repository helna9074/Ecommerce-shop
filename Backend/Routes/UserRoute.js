
import express from "express";
import {
  getUser,
  LoginUser,
  RegisterUser,
  UpdateUser,
} from "../Controllers/UserController/User.js";
import { Authorization } from "../MIddleware/Authorization.js";
import { getBestSellings, getHomebanners, getHomeProducts, GetParticularProduct,  getProducts,  RelatedProducts, SuggestedProducts } from "../Controllers/UserController/Items.js";
import { AddCartItem, GetCartItems, GetCheckoutItems, RemoveCartItem, UpdateItems } from "../Controllers/UserController/CartController.js";
import { AddWishItem, GetWishItems, RemoveWishItem } from "../Controllers/UserController/WishlistController.js";
import { CancelOrder, CreateOrder, GetOrderProduct, GetOrders } from "../Controllers/UserController/OrderController.js";
import { Addaddress, Deleteaddress, GetAddress, Updateaddress } from "../Controllers/UserController/AddressController.js";
import { createRazorpayOrder } from "../Controllers/UserController/razorpayController.js";
import { addOrUpdateRating } from "../Controllers/UserController/RatingController.js";
import { generateInvoice } from "../Controllers/UserController/Invoice.js";
import { searchProducts, searchSuggestions } from "../Controllers/UserController/SearchController.js";





const router = express.Router();
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get('/search',searchProducts),
router.get('/search/suggestions',searchSuggestions)
router.get('/bestsellings',getBestSellings)
router.get('/banners',getHomebanners)
router.get('/homeproducts',getHomeProducts)
router.get('/products',getProducts)
router.get('/OneProduct/:id',GetParticularProduct)
router.get('/RelatedProducts/:id',RelatedProducts)
router.get('/suggested-products',SuggestedProducts)
router.use(Authorization)
router.post('/cartItems',AddCartItem)
router.get('/cartItems',GetCartItems)
router.patch('/cartItems',UpdateItems)
router.delete('/cartItem/:id',RemoveCartItem)
router.post('/wishItems/:id',AddWishItem)
router.get('/wishlistItems',GetWishItems)
router.delete('/wishItem/:id',RemoveWishItem)
router.get('/checkout',GetCheckoutItems)
router.post('/order',CreateOrder)
router.get('/address',GetAddress)
router.put('/address/:id',Updateaddress)
router.post('/address',Addaddress)
router.delete('/address/:id',Deleteaddress)
router.post('/razorpay-order',createRazorpayOrder)
router.get('/user',getUser)
router.put('/user',UpdateUser)
router.get('/Orders',GetOrders)
router.get('/orderproduct/:id',GetOrderProduct)
router.post('/rate',addOrUpdateRating)
router.post('/cancelorder/:id',CancelOrder)
router.get("/auth/check", Authorization, (req, res) => {
  res.status(200).json({ success: true });
});
router.get("/invoice/:orderId",generateInvoice)


export default router;
