import Category from "../../models/Category.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const SetCategory = async (req, res, next) => {
  try {
    const { name,subcategories } = req.body;
    console.log('this is the subcategories we get',subcategories)
    const cleanedSubcategories = subcategories?.map(
  item => item.name
);
    if (!name) return res.status(400).json({ message: "name is required" });
    const category = await Category.create({
      name,
      subname:cleanedSubcategories
    });
    res.status(201).json({
      message: "added successfully",
      category
    });
  } catch(err) {
    res
      .status(500)
      .json({ message: "error adding category", error: err.message });
  }
};
export const getCategory = async (req, res, next) => {
  try {
    const page=Number(req.query.page) || 1
    const limit=10;
    const skip=(page-1)*limit
    const search=req.query.search
    let filter={}
   if (search) {
  filter = {
    name: { $regex: search, $options: "i" } // case-insensitive
  };
}
    console.log("api geted");
    const totalCategory=await Category.countDocuments(filter)
    const category = await Category.find(filter).limit(limit).skip(skip);
    console.log(category);
    return res.status(200).json({
      Pagination:{
        totalCategory,
        totalPages:Math.ceil(totalCategory/limit),
        currentPage:page
      },
      category,
    });
  } catch(error) {
    console.log(error)
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
    res.status(200).json({ message: "Deleted Successfully" });
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
    const { name,subcategories } = req.body;
    const cleanedSubcategories = subcategories?.map(
  item => item.name
);
    console.log(subcategories,'this is subcategory')
    console.log(id);
    const update = await Category.findByIdAndUpdate(
      id,
      { name,subname:cleanedSubcategories },
      { new: true }
    );
    if (!update) return res.status(404).json({ message: "Category not found" });
    res.status(201).json({ message: "Changes saved" });
  } catch(err) {
    res
      .status(500)
      .json({ message: "error in edit category", error: err.message });
  }
};
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
       // only needed fields

    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch categories",
      error,
    });
  }
};
