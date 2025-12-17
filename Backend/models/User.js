import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const Schema=mongoose.Schema

const UserSchema=new Schema({
    "name":{type:String,required:true},
   "email":{type:String,required:true,unique:true},
    "password":{type:String,required:true}
    
   
    
},{timestamps:true})



UserSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10)
   
   
})
UserSchema.methods.comparePassword=async function(currentpass){
   return bcrypt.compare(currentpass,this.password)
}
export default mongoose.model("User",UserSchema)