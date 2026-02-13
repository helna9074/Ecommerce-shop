import e from "express";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const LowStockAlertSchema = new mongoose.Schema({
  product: mongoose.Schema.Types.ObjectId,
  message:{type:String,required:true},
  seen: { type: Boolean, default: false },
  
}, { timestamps: true });
export default mongoose.model("LowStockAlert", LowStockAlertSchema);