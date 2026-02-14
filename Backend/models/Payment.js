import mongoose from "mongoose";
const Schema=mongoose.Schema
const PaymentSchema=new Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
    
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Orders',
        required:true
    },
    method:{
        type:String,
        enum:["COD","RAZORPAY"],
        required:true
    },
        amount:{
             type:Number,
             required:true
        },
        status:{
            type:String,
            enum:["PENDING","SUCCESS","FAILED","CANCELLED","REFUNDED","REFUND_INITIATED"],
            defualt:"PENDING"
        },
      
        gateway: {
    orderId: { type: String },
    paymentId: { type: String },
    signature: { type: String }, 
  },
  refund:{
         amount:Number,
          reason:String,
          refundRequestedAt:{
            type:Date
          },
          refundCompletedAt:{
            type:Date
          },

        },

    
   
},{timestamps:true})
export default mongoose.model('payment',PaymentSchema)