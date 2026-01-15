import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  size: {
    type: String,
    default: null,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  mode:{
    type:String,
    enum:["CART","BUY_NOW"],
    default:"CART"
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
},{timestamps:true});


export default mongoose.model('Cart',cartSchema)