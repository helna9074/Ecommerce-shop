import Orders from "../../models/Orders.js"
import Products from "../../models/Products.js"
import Rating from "../../models/Rating.js"

export const addOrUpdateRating=async(req,res)=>{
    try{
        const userId=req.userId
        const {productId,rating,review}=req.body
        console.log("this is the rating",rating,productId)
         if(!productId) return res.status(400).json({message:"ProductId is required"})
        const deliveredOrder = await Orders.findOne({
  user: userId,
  orderStatus: "DELIVERED",
  "items.product": productId
});
console.log("this is the deliverd order",deliveredOrder)
if (!deliveredOrder) {
  return res.status(403).json({
    message: "Rating allowed only for delivered orders"
  });
}

       
        let ratingDoc=await Rating.findOne({user:userId,product:productId})
        console.log("this is the current rating",ratingDoc)
        if(!ratingDoc){
          if(rating==null)
           return res.status(400).json({message:"rating is required"});
            
          ratingDoc=new Rating({user:userId,product:productId,rating,review:review||null})
          await ratingDoc.save()
          console.log("this is the added rating"  ,ratingDoc)
        }else{
          if(rating !=null){
            ratingDoc.rating=rating
          }
            
          if(review){
            if(ratingDoc.review){
              return res.status(400).json({message:"review already exists"})
            }
            ratingDoc.review=review
          }
          await ratingDoc.save()  
          
        }
        console.log("final updating",ratingDoc)
    


    res.status(200).json({
     message:"rating added successfully",
     rating:ratingDoc.rating,
     review:ratingDoc.review,
     reviewWritten:Boolean(ratingDoc.review)
    });
}catch(err){
    console.log(err)
    return res.status(500).json({message:"error in adding rating"})
}
   
}   
