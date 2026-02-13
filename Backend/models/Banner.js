import mongoose from 'mongoose'
const Schema=mongoose.Schema
const BannerSchema=new Schema({
    img:[
        {
             url:{type:String,required:true},
        public_id:{type:String,required:true}
        }
       
    ],
    title:{type:String},
    status:{type:Boolean,default:false},
    paragraph:{type:String},
    paths:{type:String},
    types:{type:String,required:true},
    productId:{type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        default:null
    },
    
},{timestamps:true})

export default mongoose.model('Banner',BannerSchema)