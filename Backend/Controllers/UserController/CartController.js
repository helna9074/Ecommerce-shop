
import Cart from '../../models/Cart.js'
import Products from '../../models/Products.js';




const normaliseCart=(cart)=>{
  return cart.items.map((item) => {
    let maxStock = item.productId.stock;

    if (item.productId.sizes?.length > 0 && item.size) {
      const sizeObj = item.productId.sizes.find(
        (s) => s.value === item.size
      );
      if (sizeObj) maxStock = sizeObj.qty;
    }

    return {
      productId: item.productId._id,
      product: item.productId,
      size: item.size,
      quantity: item.quantity,
      maxStock,
      delivery: item.productId.delivery,
      offer:item.productId.offer,
      mode:item.mode
      
    };
  });
};



 export const AddCartItem=async(req,res)=>{
    try{
        const{productId,size,quantity,mode="CART"}=req.body
        if(!productId) return res.status(400).json("cartProduct is not added");
        const userId=req.userId
        console.log("this is the userId",userId)
        if(!userId) return res.status(400).json("No user found")
         if(!quantity) return res.status(400).json("quantity required");
          const product=await Products.findById(productId)
          if(!product){
            return res.status(404).json({message:"product not found"})
          }
          let maxStock=product.stock;
          console.log("this is the size of product ",product.sizes)
          if(product.sizes?.length>0){
            const sizeObj=product.sizes.find((s)=>s.value===size)
            if(!sizeObj){
                return res.status(400).json({message:"invalid size"})
            }
            maxStock=sizeObj.qty;
          }
          if (maxStock <= 0) {
      return res.status(400).json({
        message: "Product is out of stock"
      });
    }
          let cart=await Cart.findOne({userId})
          if(!cart){
            cart=new Cart({userId,items:[]})
          }
          if (mode === "CART") {
      cart.items = cart.items.filter(i => i.mode !== "BUY_NOW");
    }
          if(mode==="BUY_NOW"){
            cart.items=cart.items.filter((i)=>i.mode!=="BUY_NOW")
          }
          const existingItem=cart.items.find((i)=>i.productId.toString()===productId&&i.size===(size??null)&&i.mode===mode)
          if(existingItem&&mode=="CART"){
            existingItem.quantity=Math.min(existingItem.quantity+quantity,maxStock)
          }else{
            cart.items.push({
                productId,
                size:size??null,
                quantity:Math.min(quantity,maxStock),
                mode,
            })
          }
          await cart.save()
const populatedCart=await Cart.findOne({userId}).populate('items.productId','name amount  stock sizes img')
   

  return res.status(200).json({message:'Added successfully',cartItems:normaliseCart(populatedCart)})
    }catch(err){
    console.log(err)
    return res.status(500).json({message:'server error',err})
    }
}
export const GetCartItems=async(req,res)=>{
    try {
    const userId = req.userId;

 
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

   
    const cart = await Cart.findOne({ userId })
      .populate(
  "items.productId",
  "name amount img stock sizes delivery offer"
);


    
    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ items:[]});
    }
     let updated = false;

    const validatedItems = cart.items.filter((item) => {
      const product = item.productId;

      // ❌ Product deleted
      if (!product) {
        updated = true;
        return false;
      }

      // Determine stock
      let availableStock = product.stock;
      if (product.sizes?.length > 0 && item.size) {
        const sizeObj = product.sizes.find(
          (s) => s.value === item.size
        );
        availableStock = sizeObj ? sizeObj.qty : 0;
      }

       if (availableStock <= 0) {
        updated = true;
        return false;
      }
        if (item.quantity > availableStock) {
        item.quantity = availableStock;
        updated = true;
      }

      return true;

    });
    if (updated) {
  cart.items = validatedItems;
  await cart.save();
}
    const cartItems=validatedItems.filter(i=>i.mode==="CART")
    

    return res.json({
      items:normaliseCart({items:cartItems})
    })
  
    

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
}
export const UpdateItems=async(req,res)=>{
   try {
    const userId = req.userId;
    const { cartItems } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ message: "Invalid cart data" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
const productIds = cartItems.map((i) => i.productId);
    const products = await Products.find({
      _id: { $in: productIds },
    });

    const productMap = new Map(
      products.map((p) => [p._id.toString(), p])
    );
    const updatedItems = [];

    for (const item of cartItems) {
      const product = productMap.get(item.productId.toString())
      if (!product) continue;

      // determine max stock
      let maxStock = product.stock;

      if (product.sizes?.length > 0 && item.size) {
        const sizeObj = product.sizes.find(
          (s) => s.value === item.size
        );
        if (!sizeObj) continue;
        maxStock = sizeObj.qty;
      }

      updatedItems.push({
        productId: item.productId,
        size: item.size ?? null,
        quantity: Math.min(item.quantity, maxStock),
        mode:"CART"
      });
    }

    cart.items = updatedItems;
    await cart.save();

    const populatedCart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name amount img stock sizes  delivery offer"
    );

    return res.status(200).json({
      message: "Cart updated",
      items:normaliseCart({items:populatedCart.items})
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}
export const RemoveCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const {productId} = req.params
    const{size}=req.body

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

   cart.items=cart.items.filter((item)=>{
    const itemSize=item.size??null;
    const reqSize=size??null;
    return!(
      item.productId.toString()===productId&&
      itemSize===reqSize&&
      item.mode==='CART'
    )
   })

    await cart.save();

    return res.status(200).json({
      message: "Item removed from cart",
      cart,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
export const GetCheckoutItems=async(req,res)=>{
  try{
    const userId=req.userId;
    const {source}=req.query;
    console.log('this is the source',source)
     if (!userId) return res.status(401).json({ message: "Unauthorized" });
      const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name amount img stock sizes delivery offer"
    );

    if (!cart) return res.json({ items: [] });
     let checkoutItems=[];
     if(source==="BUY_NOW"){
      checkoutItems=cart.items.filter(i=>i.mode==='BUY_NOW')
     }
    if(source==='CART'){
      checkoutItems=cart.items.filter(i=>i.mode==='CART')
    }
    return res.json({
      items: normaliseCart({items:checkoutItems}),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
    
  }
