import mongoose from "mongoose";
const Schema=mongoose.Schema
const WishlistSchema=new Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
    unique:true
    },items:[
        {
        productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products',
        required:true

        }
    }
    ]
},{timestamps:true})
export default mongoose.model('WishList',WishlistSchema)