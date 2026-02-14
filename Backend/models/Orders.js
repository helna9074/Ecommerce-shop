import mongoose from 'mongoose'
const Schema=mongoose.Schema
const Orderschema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[
        {
         product:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"Products",
             required:true
         },
         name:String,
         price:Number,
         quantity:Number,
         image:String,
         size:String
        }
       
    ],
    address:{
        firstName:{type:String,required:true},
        companyName:{type:String},
        street:{type:String,required:true},
        apartment:{type:String},
        city:{type:String,required:true},
        phone:{type:String,required:true},
        email:{type:String},

    },
   payment:{type:mongoose.Schema.Types.ObjectId,
    ref:"payment",
    default:null,
   },

subtotal:Number,
discount:Number,
shipping:Number,
total:Number,
orderStatus:{
    type:String,
    enum:['PLACED','CONFIRMED','SHIPPED','DELIVERED','CANCELLED','CANCEL_REQUESTED'],
    default:"PLACED"
},
placedAt: {
    type: Date,
    default: Date.now
  },

  confirmedAt: Date,
  shippedAt: Date,
  deliveredAt: Date,
  cancellrequestedAt:Date,
  cancelledAt: Date,
},{timestamps:true})
export default mongoose.model('Order',Orderschema)
