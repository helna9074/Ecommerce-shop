import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const Schema=mongoose.Schema
const AdminSchema=new Schema({
    "name":{type:String,required:true},
    "email":{type:String,required:true,unique:true},
   "password":{type:String,required:true},
   
   

},{timestamps:true})
 


AdminSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10)
  
})
AdminSchema.methods.comparePassword=async function(candidatePass){
    console.log(candidatePass,'candid');
    
    return await bcrypt.compare(candidatePass,this.password)
}
export default mongoose.model('Admin',AdminSchema)