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
        CompanyName:{type:String},
        street:{type:String,required:true},
        apartment:{type:String},
        city:{type:String,required:true},
        phone:{type:String,required:true},
        email:{type:String,required:true},

    },
    payment:{
        method:{
            type:String,
            enum:["BANK","COD"],
            required:true
        },
        status:{
            type:String,
            enum:["PENDING","PAID","FAILED"],
            default:"PENDING"
        },
        transactionId:String
    },

subtotal:Number,
discount:Number,
shipping:Number,
total:Number,
orderStatus:{
    type:String,
    enum:['PLACED','CONFIRMED','SHIPPED','DELIVERED','CANCELLED'],
    default:"PLACED"
}
},{timestamps:true})
export default mongoose.model('Order',Orderschema)
