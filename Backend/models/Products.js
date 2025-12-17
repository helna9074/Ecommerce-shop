import mongoose from "mongoose"
const Schema=mongoose.Schema
const ProductsSchema=new Schema({
    "name":{type:String,required:true},
    "sizes":[{
      value:{type:String,required:true},
      qty:{type:Number,required:true},
      
}],
    "description":{type:String,required:true},
      "amount":{type:String,required:true},
      
      "category":{type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
      },
      "img":[
        {
            url:{type:String,required:true},
            public_id:{type:String,required:true}
        }
      ],
      "colors":{type:[String] ,default:[]},
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
    "delivery":{
        "freedelivery":{type:Boolean,default:false},
        "cashdelivery":{type:Boolean,default:false},
        "availreturn":{type:Boolean,default:false},
    }
},{timestamps:true})

export default mongoose.model('Products',ProductsSchema)