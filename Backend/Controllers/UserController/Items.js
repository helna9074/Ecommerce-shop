import Banner from "../../models/Banner.js";
import Products from "../../models/Products.js";
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
export const Getproducts = async (req, res, next) => {
  try {
    const Product = await Products.find({isFlashSale:true}).sort({createdAt:-1}).limit(10);
    if (!Product) return res.status(400).json("No banner found");
    res.status(201).json({
      Product,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "error in fetching products", error: err.message });
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