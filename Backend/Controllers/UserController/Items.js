import Banner from "../../models/Banner.js";
import Products from "../../models/Products.js";
import Category from '../../models/Category.js'
import Rating from '../../models/Rating.js'
import { addReviewStatsPipeline } from "../../utils/reviewAggregations.js";

import Orders from "../../models/Orders.js";


export const getHomebanners = async (req, res) => {
  try {
    const [
      carousel,
      singleBanner,
      gpBanners,
     
     
    ] = await Promise.all([

      // 🔹 Carousel banners
      Banner.find({
        status: true,
        types: { $in: ["Carousel", "MidCarousel", "LastCarousel"] }
      }).sort({ createdAt: -1 }).limit(3),

      // 🔹 Single banner
      Banner.findOne({
        status: true,
        types: "Single Banner"
      }).sort({ createdAt: -1 }),

      // 🔹 GP banners
      Banner.find({
        status: true,
        types: "GpBanner"
      }).sort({ createdAt: -1 }).limit(4),

         // Flash products with avgRating
    ]);
 

      // Best selling products based on orders
   
  

    res.status(200).json({
      carousel,
      singleBanner,
      gpBanners,
     
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load home data" });
  }
};
export const getHomeProducts= async (req, res) => {
  try{
const flashProducts = await Products.aggregate([
      { $match: { isFlashSale: true } },
      { $sort: { createdAt: -1 } },
      { $limit: 10 },
      ...addReviewStatsPipeline()
    ]);

      const exploreProducts = await Products.aggregate([
      { $match: { isFlashSale: false } },
      { $sort: { createdAt: -1 } },
      { $limit: 8 },
     ...addReviewStatsPipeline()
    ]);
      const bestSellingProducts = await Orders.aggregate([
      {
        $match: { orderStatus: "DELIVERED" }
      },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 8 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },

      /* ⭐ Add rating stats using your pipeline */
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$product", { totalSold: "$totalSold" }]
          }
        }
      },
      ...addReviewStatsPipeline()
    ]);
     res.status(200).json({
     
      flashProducts,
      exploreProducts,
      bestSellingProducts
    
    });
  }catch{
    
  }
}
export const GetParticularProduct = async (req, res, next) => {
   try {
    const { id } = req.params;

    const product = await Products.findById(id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "No Product found" });
    }

    const stats = await Rating.aggregate([
      { $match: { product: product._id } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 }
        }
      }
    ]);
 product._doc.avgRating = Number(stats[0]?.avgRating || 0);
    product._doc.totalReviews = stats[0]?.totalReviews || 0;
    res.status(200).json({
      product,
     
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "error in finding product", err});
  }
};



/* ===========================
   RELATED PRODUCTS
=========================== */
export const RelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "No Product found" });
    }

    const relatedProducts = await Products.aggregate([
      {
        $match: {
          category: product.category,
          _id: { $ne: product._id }
        }
      },
      {
        $addFields: {
          priority: {
            $cond: [
              { $eq: ["$subcategory", product.subcategory] },
              1,
              2
            ]
          }
        }
      },
      { $sort: { priority: 1, createdAt: -1 } },
      { $limit: 10 },
      ...addReviewStatsPipeline()
    ]);

    res.status(200).json({ relatedProducts });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching related products" });
  }
};

/* ===========================
   SUGGESTED PRODUCTS
=========================== */
export const SuggestedProducts = async (req, res) => {
  try {
    const products = await Products.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 10 },
      ...addReviewStatsPipeline()
    ]);

    res.status(200).json({ products });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching suggested products" });
  }
};


export const getProducts=async(req,res)=>{
  try{
    const {flash=true,page}=req.query
    const isPaginated=page !==undefined
    const currentPage=Number(page)||1
   
    let limit=10
   let filter={}
    if(!isPaginated){
      if(flash==="true")
        limit=10
      else{
        limit=8;
      }
    }else{
      limit=16;
    }
 const skip=isPaginated? (currentPage-1)*limit:0
    if(flash==="true") filter.isFlashSale=true;
    if(flash==='false') filter.isFlashSale=false;
    const totalProducts=await Products.countDocuments(filter)
    const products=await Products.find(filter).sort({createdAt:-1}).limit(limit).skip(skip)
    res.status(200).json({
      products,
      pagination: isPaginated
        ? {
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage,
          }
        : null,
    });
    
  }catch(err){
console.log(err);
    res.status(500).json({ message: "Error fetching products" });
  }
}
export const getBestSellings = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const bestSelling = await Orders.aggregate([
      { $match: { orderStatus: "DELIVERED" } },

      { $unwind: "$items" },

      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" }
        }
      },

      { $sort: { totalSold: -1 } },
      { $skip: skip },
      { $limit: limit },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },

      { $unwind: "$product" },

      // ⭐ return FULL product object
      {
        $replaceRoot: {
          newRoot: "$product"
        }
      }
    ]);

    res.status(200).json({
      page,
      limit,
      products: bestSelling
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching best selling products" });
  }
};
