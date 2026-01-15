import { razorpay } from "../../Utils/Razorpay.js";
import Cart from "../../models/Cart.js";

const calculateShipping = (orderItems, subtotal) => {
  if (subtotal > 1000) return 0;

  const hasCash = orderItems.some(i => i.productId?.delivery?.cashdelivery);
  const allFree = orderItems.every(i => i.productId?.delivery?.freedelivery);

  if (hasCash) return 50;
  if (allFree) return 0;

  return 30;
};
const getFinalPrice = (product) => {
  const price = product.amount;

  if (!product.offer || !product.offer.enabled) {
    return { finalPrice: price, discount: 0 };
  }

  const now = new Date();
  const start = new Date(product.offer.startdate);
  const end = new Date(product.offer.enddate);

  if (now < start || now > end) {
    return { finalPrice: price, discount: 0 };
  }

  const discount =Math.ceil((price * product.offer.Percentage) / 100);
  const finalPrice = Math.round(price - discount);

  return { finalPrice, discount };
};


export const createRazorpayOrder=async(req,res)=>{
    try{
        const userId=req.userId;
        const cart=await Cart.findOne({userId}).populate('items.productId')
        if(!cart||cart.items.length===0)
            return res.status(400).json({ message: "Cart is empty" });

        const buyNowItems=cart.items.filter(i=>i.mode==='BUY_NOW')
        const cartItems = cart.items.filter(i => i.mode === "CART");
        const orderItems=buyNowItems.length>0? buyNowItems:cartItems;

        let subtotal = 0;
let totalDiscount = 0;

orderItems.forEach((item) => {
  const { finalPrice, discount } = getFinalPrice(item.productId);

  subtotal += finalPrice * item.quantity;
  totalDiscount += discount * item.quantity;
});

        const shipping=calculateShipping(orderItems,subtotal)
      const totalAmount = subtotal + shipping;
    //create razorpay order
    const razorpayOrder=await razorpay.orders.create({
        amount:totalAmount*100,
        currency:"INR",
        receipt:`rcpt_${Date.now()}`,
        notes:{
            userId,
            source:buyNowItems.length>0?"BUY_NOW":"CART",
            discount:totalDiscount
        }
    })
   res.status(200).json(({
    razorpayOrderId:razorpayOrder.id,
    amount:totalAmount,
    currency:"INR",
    key:process.env.RAZORPAY_KEY_ID
   }))
    }catch(err){
        console.error(err)
         res.status(500).json({ message: "Razorpay order failed" });

    }
}