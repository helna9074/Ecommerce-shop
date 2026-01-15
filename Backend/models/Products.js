import mongoose from "mongoose"
const Schema=mongoose.Schema
const ProductsSchema=new Schema({
   
    "name":{type:String,required:true},
    "sizes":[{
      value:{type:String,required:true,trim:true},
      qty:{type:Number,required:true,min:1},
      
}],
    "description":{type:String,required:true},
      "amount":{type:Number,required:true,min:1},
      
      "category":{type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
      },
      "subcategory":{type:String,default:null},
      "img":[
        {
            url:{type:String,required:true},
            public_id:{type:String,required:true}
        }
      ],
      "stock":{type:Number,required:true,min:1},
      "colors":{type:[String] ,default:null},
      "offer":{
        enabled:{type:Boolean,default:false},
        "startdate":Date,
        "enddate":Date,
        "Percentage":Number,
      },
      "isFlashSale":{
        type:Boolean,
        defualt:false,
      },
      "Status":{
        type:Boolean,
        defualt:false,
      },
    "delivery":{
        "freedelivery":{type:Boolean,default:false},
        "cashdelivery":{type:Boolean,default:false},
        "availreturn":{type:Boolean,default:false},
    }
},{timestamps:true})

export default mongoose.model('Products',ProductsSchema)