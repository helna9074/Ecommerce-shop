import Banner from "../../models/Banner.js";
import Products from "../../models/Products.js";
import Category from '../../models/Category.js'
export const GetBanner = async (req, res) => {
  try {
    const carousel = await Banner.find({
      status: true,
      types: { $in: ["Carousel", "MidCarousel", "LastCarousel"] },
    })
      .sort({ createdAt: -1 })
      .limit(3);
    if (!carousel) return res.status(400).json("No banner found");
    const Singlebanner = await Banner.findOne({
      status: true,
      types: "Single Banner",
    }).sort({ createdAt: -1 });
    const Gpbanner = await Banner.find({
      status: true,
      types: "GpBanner",
    })
      .sort({ createdAt: -1 })
      .limit(4);

    return res.status(200).json({
      carousel,
      Singlebanner,
      Gpbanner,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error in Fetching Banner", err });
  }
};

export const GetParticularProduct = async (req, res, next) => {
  try {
    const{id}=req.params
    console.log(id)
    if(!id) return res.status(400).json({ message: "id is not provided" });
    const Product = await Products.findById(id).populate('category')
    if (!Product) return res.status(400).json("No Product found");
    console.log(Product)
    res.status(201).json({
      Product,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "error in finding product", err});
  }
};
export const RelatedProducts=async(req,res)=>{

  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ message: "id is not provided" });

    const product = await Products.findById(id);
    if (!product)
      return res.status(404).json({ message: "No Product found" });

   

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
              1, // same subcategory → HIGH priority
              2  // other subcategories → LOW priority
            ]
          }
        }
      },
      {
        $sort: { priority: 1 ,createdAt:-1}
      },
      {
        $limit:10
      }
    ]);

    // populate category manually after aggregation
    await Products.populate(relatedProducts, { path: "category" });

    res.status(200).json({ relatedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "error in finding related Products",
      err,
    });
  }
}

export const SuggestedProducts = async (req, res, next) => {
  try {
    const products = await Products.find({}).sort({createdAt:-1}).limit(10);
    if (!products) return res.status(400).json("No products found");
    res.status(201).json({
      products,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "error in fetching  products", error: err.message });
  }
};

export const getProducts=async(req,res)=>{
  try{
    const {flash,page}=req.query
    const isPaginated=page !==undefined
    const currentPage=Number(page)||1
   
   let limit;
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