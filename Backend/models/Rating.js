import mongoose from 'mongoose'
const Schema=mongoose.Schema
const RatingSchema=new Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
   
    },
    product:{type:mongoose.Schema.Types.ObjectId,
    ref:'Products',
    required:true
   
    },
    review:{type:String,default:null},
    rating:{type:Number,required:true,min:1,max:5}
},{timestamps:true})
RatingSchema.index({user:1,product:1},{unique:true})
export default mongoose.model('Rating',RatingSchema)