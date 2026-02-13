import mongoose from "mongoose";
const Schema=mongoose.Schema
const ExpenseSchema=new Schema({
    createdBy:{type:mongoose.Schema.Types.ObjectId,
    ref:'Admin',
    required:true
    },
    title:{type:String,required:true,trim:true},
    category:{type:String,required:true},
    amount:{type:Number,required:true},
    note:{type:String,trim:true},
    expenseDate:{type:Date,default:Date.now}
    
},{timestamps:true})
export default mongoose.model('Expense',ExpenseSchema)