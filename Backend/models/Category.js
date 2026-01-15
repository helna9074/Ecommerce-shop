import mongoose from "mongoose"
const Schema=mongoose.Schema
const CategorySchema=new Schema({
    "name":{type:String,required:true,unique:true},
    'subname':{type:[String],unique:true,default:[]}
   
},{timestamps:true})

export default mongoose.model('Category',CategorySchema)