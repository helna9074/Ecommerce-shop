import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
address:{
  firstName:{type:String,required:true},
  companyName:{type: String},
  street: {type:String,required:true},
  apartment:{type: String},
  city:{type:String,required:true},
  phone:{type:String,required:true},
  email:{type: String},
},
  isDefault: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
export default mongoose.model("Address",addressSchema)
