import Category from "../../models/Category.js";
import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
import Products from '../../models/Products.js'


 dotenv.config()

 cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
 })
export const SetCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "name is required" });
    const category = await Category.create({
      name,
    });
    res.status(201).json({
      message: "added successfully",
    });
  } catch {
    res
      .status(500)
      .json({ message: "error adding category", error: err.message });
  }
};
export const getCategory = async (req, res, next) => {
  try {
    console.log("api geted");
    const category = await Category.find({});
    console.log(category);
    return res.status(201).json({
      category,
    });
  } catch {
    return res
      .status(500)
      .json({ message: "error in fetching category", error });
  }
};
export const DeleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    await Category.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted Successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error in deleting category", error: err.message });
  }
};
export const EditCategory = async (req, res, next) => {
  try {
    console.log("Api reached");
    const { id } = req.params;
    const { name } = req.body;
    console.log(id);
    const update = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!update) return res.status(404).json({ message: "Category not found" });
    res.status(201).json({ message: "Changes saved" });
  } catch {
    res
      .status(500)
      .json({ message: "error in edit category", error: err.message });
  }
};
export const Getproducts = async (req, res, next) => {
  try {
    const Product = await Products.find().populate("category");
    res.status(201).json({
      Product,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "error in edit category", error: err.message });
  }
};

export const addProducts=async(req,res)=>{
    try{
      const{colors,name,description,amount,sizes,categories,delivery,offer,isFlashSale}=req.body
      if(!colors||!name||!description||!amount||!categories||!sizes)
       return res.status(400).json({ message: "Missing required fields" })
          const parsedOffer=offer? JSON.parse(offer):{};
          const parsedDelivery=JSON.parse(delivery)
          const parsedColors=colors?JSON.parse(colors):[]
          const parsedSizes = sizes ? JSON.parse(sizes) : [];
      console.log('req.files',req.files)
        let imgUrls=[]
        if(!req.files||req.files.length===0){
          console.log("no files received")
          return res.status(400).json({message:'no image provided'})
        } 
       for (const file of req.files) {
        console.log('uploading file',file.originalname)
  const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`, {
   folder: "Products",
   resource_type: "image"
   
  });
  console.log('Asset folder',result.folder)
  console.log('Display name',result.display_name)
  console.log('uploaded',result.secure_url)
  imgUrls.push({url:result.secure_url,public_id:result.public_id});
}  
const Product=await Products.create({
  name,
  category:categories,
  amount,
  description,
  img:imgUrls,
  colors:parsedColors,
  offer:parsedOffer,
  delivery:parsedDelivery,
  sizes:parsedSizes,
  isFlashSale:isFlashSale
})
console.log(Product.category)
console.log('returning response now')
      return  res.status(201).json({
            message:"completed",
           Product
        })

    }catch(err){
        console.error('upload error',err)
       return res.status(500).json({message:'upload failed'})
    }
 }
export const UpdateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const parsedOffer = req.body.offer ? JSON.parse(req.body.offer) : {};
    const parsedDelivery = req.body.delivery
      ? JSON.parse(req.body.delivery)
      : [];
    const parsedColors = req.body.colors ? JSON.parse(req.body.colors) : [];
    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : [];
      const parsedSizes = req.body.sizes
  ? JSON.parse(req.body.sizes)
  : [];

    const product = await Products.findById(id);
    if (!product) {
      return res.status(400).json({ message: "product not found!" });
    }

    for (const oldImg of product.img) {
      const stillExist = existingImages.find(
        (img) => img.public_id === oldImg.public_id
      );
      if (!stillExist) {
        await cloudinary.uploader.destroy(oldImg.public_id);
      }
    }
    let finalImages = [...existingImages];

    console.log("req.files", req.files);

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${file.buffer.toString("base64")}`,
          { folder: "/products" }
        );
        finalImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        category: req.body.categories,
        amount: req.body.amount,
        description: req.body.description,
        colors: parsedColors,
        sizes:parsedSizes,
        offer: parsedOffer, // <-- parsed
        delivery: parsedDelivery, // <-- parsed
        img: finalImages, // <-- updated images
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Product updated",
      product: updatedProduct,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "error in edit category", error: err.message });
  }
};
export const DeleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) return res.status(400).json({ message: "id is not provided" });
    const Product = await Products.findById(id);
    console.log(Product);
    if (!Product) {
      return res.status(404).json({ message: "there is no Product" });
    }
    await Products.findByIdAndDelete(id);

    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "error in deleting category", error });
  }
};
