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
    console.log("api geted");
    const category = await Category.find({});
    console.log(category);
    return res.status(201).json({
      category,
    });
  } catch(error) {
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