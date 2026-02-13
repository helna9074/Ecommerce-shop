import Category from "../../models/Category.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import Products from "../../models/Products.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const Getproducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
 const search = req.query.search || "";

    // 🔍 Search filter
    const filter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};
    const totalProducts = await Products.countDocuments(filter);

     const products = await Products.aggregate([
      { $match: filter },

      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "banners",
          localField: "_id",
          foreignField: "productId",
          as: "banner",
        },
      },
      {
        $addFields: {
          isBanner: { $gt: [{ $size: "$banner" }, 0] },
        },
      },

      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      products,
      pagination: {
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error fetching products",
      error: err.message,
    });
  }
};


export const addProducts = async (req, res) => {
  try {
    const {
      colors,
      name,
      description,
      amount,
      sizes,
      categories,
      subcategory,
      delivery,
      offer,
      stock,
      
    } = req.body;
    console.log(req.body.Active)
    const isFlashSale = req.body.isFlashSale === "true" ? true : false;
     const parsedStatus = req.body.Status === "true" ? true : false;
    if (!colors || !name || !description || !amount || !categories || !stock )
      return res.status(400).json({ message: "Missing required fields" });
    const parsedAmount = Number(amount);
const parsedStock = Number(stock);

if (isNaN(parsedAmount) || parsedAmount <= 0) {
  return res.status(400).json({ message: "Invalid amount" });
}

if (isNaN(parsedStock) || parsedStock < 0) {
  return res.status(400).json({ message: "Invalid stock" });
}
const parsedOffer = offer ? JSON.parse(offer) : {};
if (parsedOffer?.enabled) {
  if (
    parsedOffer.Percentage === null ||
    parsedOffer.Percentage < 1 ||
    parsedOffer.Percentage > 100
  ) {
    return res.status(400).json({
      message: "Offer percentage must be between 1 and 100",
    });
  }
}

    
    const parsedDelivery = JSON.parse(delivery);
    const parsedColors = colors ? JSON.parse(colors) : null;
    const parsedSizes = sizes ? JSON.parse(sizes) : [];
    let imgUrls = [];
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "no image provided" });
    }
    for (const file of req.files) {
      console.log("uploading file", file.originalname);
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          folder: "Products",
          resource_type: "image",
        }
      );
      imgUrls.push({ url: result.secure_url, public_id: result.public_id });
    }
    const Product = await Products.create({
      name,
      category: categories,
      subcategory,
      amount:parsedAmount,
      stock:parsedStock,
      description,
      img: imgUrls,
      colors: parsedColors,
      offer: parsedOffer,
      delivery: parsedDelivery,
      sizes: parsedSizes,
      isFlashSale: isFlashSale,
      Status:parsedStatus
    });
    console.log(Product.category);
    console.log("returning response now");
    return res.status(201).json({
      message: "completed",
      Product,
    });
  } catch (err) {
    console.error("upload error", err);
    return res.status(500).json({ message: "upload failed" });
  }
};
export const UpdateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('this is the subcategory we get',req.subcategory)
     const parsedAmount = Number(req.body.amount);
const parsedStock = Number(req.body.stock);

if (isNaN(parsedAmount) || parsedAmount <= 0) {
  return res.status(400).json({ message: "Invalid amount" });
}

if (isNaN(parsedStock) || parsedStock < 0) {
  return res.status(400).json({ message: "Invalid stock" });
}
const parsedOffer = req.body.offer ? JSON.parse(req.body.offer) : {};
if (parsedOffer?.enabled) {
  if (
    parsedOffer.Percentage === null ||
    parsedOffer.Percentage < 1 ||
    parsedOffer.Percentage > 100
  ) {
    return res.status(400).json({
      message: "Offer percentage must be between 1 and 100",
    });
  }
}
    const isFlashSale = req.body.isFlashSale === "true" ? true : false;
    const parsedStatus = req.body.Status === "true" ? true : false;
    
    const parsedDelivery = req.body.delivery
      ? JSON.parse(req.body.delivery)
      : [];
    const parsedColors = req.body.colors ? JSON.parse(req.body.colors) : [];
    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : [];
      const newImagesCount=req.files?req.files.length:0;
      const totalImages=existingImages.length+newImagesCount;
      if(totalImages>5){
        return res.status(400).json({message:"Maximum 5 images allowed per product"})
      }
    const parsedSizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];

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
      if (Array.isArray(product.img)) {
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
    }
  finalImages=finalImages.slice(0,5)
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        category: req.body.categories,
        stock:parsedStock,
        subcategory:req.body.subcategory,
        amount: parsedAmount,
        description: req.body.description,
        colors: parsedColors,
        sizes: parsedSizes,
        offer: parsedOffer, // <-- parsed
        delivery: parsedDelivery, // <-- parsed
        img: finalImages, // <-- updated images
        isFlashSale: isFlashSale,
        Status:parsedStatus
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
      .json({ message: "error in edit category", error: err });
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
