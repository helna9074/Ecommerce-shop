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
    const Product = await Products.find({});
    if (!Product) return res.status(400).json("No banner found");
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
