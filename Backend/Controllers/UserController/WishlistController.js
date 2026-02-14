
import Products from "../../models/Products.js";
import Wishlist from "../../models/Wishlist.js";

export const AddWishItem = async (req, res) => {
  try {
    const {id:productId } = req.params;
    console.log('getted in backend')
    if(!productId) return res.status(400).json("id is not available");
    const userId = req.userId;
    if(!userId) return res.status(400).json("User is not found");
    const product = await Products.findById(productId);
    if(!product) return res.status(400).json("No product found");

    let wishlist = await Wishlist.findOne({ userId });
    if(!wishlist) {
      wishlist = new Wishlist({
        userId,
        items: [{ productId }],
      });
    } else {
      const alreadyExist = wishlist.items.some(
        (i) => String(i.productId) === String(productId)
      );
      if(!alreadyExist){
         wishlist.items.push({ productId });
      }
    
    }
   
   
    await wishlist.save();

    
    const populatedWishlist = await Wishlist.findOne({ userId }).populate(
      "items.productId"
    );

    return res.status(200).json({
      message: "Added to wishlist",
      items: populatedWishlist.items.map((i) => i.productId),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server Error" });
  }
};
export const GetWishItems=async(req,res)=>{
    try{
  const userId=req.userId 
    if(!userId) return res.status(400).json("User is not found");
    const wishlist=await Wishlist.findOne({userId}).populate("items.productId")
    if(!wishlist||wishlist.items.length===0) return res.status(400).json({items:[]}); 
    const products = wishlist.items.map(
      (i) => i.productId
    );
    return res.status(200).json({
      message: "Fetched data successfully",
      items: products,
    });
    

    }catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server Error" });
  }
   
}
export const RemoveWishItem=async(req,res)=>{
  try{
    const {id}=req.params;
    const userId=req.userId
    const wishlist=await Wishlist.findOne({userId})
    if (!wishlist) return res.status(200).json({ items: [] });
    wishlist.items=wishlist.items.filter((i)=>String(i.productId)!==String(id))
     await wishlist.save()
     const populatedWishlist=await Wishlist.findOne({userId}).populate("items.productId")
     return res.status(200).json({
      items: populatedWishlist.items.map((i) => i.productId),
    });
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Internal server error" });
  }
   
 
}