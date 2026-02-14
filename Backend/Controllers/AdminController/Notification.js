import Notifications from '../../models/Notifications.js';
import LowStockAlert from '../../models/Notifications.js'

import Products from '../../models/Products.js';
export const GetAlerts=async(req,res)=>{
    try{
        const {seen}=req.query
        let query={}
       if (seen !== undefined) {
      query.seen = seen === "true"; // string → boolean
    }
    console.log("this is the query right now",query.seen)
        console.log("get alert here")
        const notifications=await LowStockAlert.find(query).sort({createdAt:-1})
        if(!notifications) return res.status(400).json({message:"no notifications found"})
        return res.status(200).json({message:"fetched successfully",notifications})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}
export const MarkAllSeen=async(req,res)=>{
    try{
        
        const notification=await LowStockAlert.updateMany({seen:false},{$set:{seen:true}})
        if(notification.length===0) return res.status(400).json({message:"notification not found"})
       
        return res.status(200).json({message:"notification marked as seen successfully"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}
export const GetStock=async(req,res)=>{
    try{
        
        const {id}=req.params
        console.log("the id is getted herer",id)
        if(!id) return res.status(400).json({message:"id is not provided"})
          const product=await Products.findById(id).select("name stock sizes")
        if(!product) return res.status(400).json({message:"product not found"})
        return res.status(200).json({message:"fetched successfully",
            productId:product._id,
            name:product.name,
            totalStock:product.stock,
           
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}
export const UpdateStock=async(req,res)=>{
    try{
        
        const {id}=req.params
        if(!id) return res.status(400).json({message:"id is not provided"})
        const stock=Number(req.body.stock)
    console.log("this is the stock",stock)
        if(isNaN(stock)) return res.status(400).json({message:"stock is not provided"})
        const product=await Products.findById(id).select("name stock sizes")
      if(!product) return res.status(400).json({message:"product not found"})
    if(stock<product.stock) return res.status(400).json({message:"stock cannot be less than the current stock"})

      
        product.stock=stock
        await product.save()
        const notification=  await Notifications.deleteMany({ product: product._id });
    

        return res.status(200).json({message:"stock updated successfully"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
}