import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import Banner from "../../models/Banner.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const AddBanner = async (req, res, next) => {
  try {
    const { title, Active, types, paths, paragraph,productId } = req.body;
    console.log(productId,"this is the product id")
    const ImgUrl = [];
    console.log(title, Active, types, paths, paragraph);
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: "no image provided" });
    }
    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "Banner",
        resource_type: "image",
      }
    );
    ImgUrl.push({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });
    const NewBanner = await Banner.create({
      status: Active,
      img: ImgUrl,
      types,
      paths,
      title,
      paragraph,
      productId
    });
    console.log(Banner);
    return res.status(201).json({
      message: "completed",
      NewBanner,
    });
  } catch (err) {
    console.log("upload error", err);
    return res.status(500).json({ message: "upload failed", err });
  }
};
export const GetBanners = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
    
        const totalBanner = await Banner.countDocuments();
    
        const Banners = await Banner.find({})
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);
    

    if (!Banners) return res.status(404).json({ message: "no Banners" });

    return res.status(200).json({
      Banners,
      Pagination:{
        totalBanner,
        totalPages:Math.ceil(totalBanner/limit),
        currentPage:page,
      }
    });
  } catch (error) {
    console.log("upload error", err);
    return res.status(500).json({ message: "upload failed", err });
  }
};
export const DeleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const Banners = await Banner.findById(id);
    if (!Banners) return res.status(404).json({ message: "no Banners" });

    const result = await Banner.findByIdAndDelete(id);

    return res.status(201).json({
      message: "Deleted sucessfully",
    });
  } catch (error) {
    console.log("Deleting error", error);
    return res.status(500).json({ message: "Deletaion failed", error });
  }
};

export const UpdateBanner = async (req, res) => {
  try {
    console.log("update started");
    const { id } = req.params;
    const { title, paragraph, Active, paths, types } = req.body;
    console.log(title, paragraph, Active, paths, types);
    let updatedData = {
      title,
      paragraph,
      status: Active,
      paths,
      types,
    };
    const banners = await Banner.findById(id);
    if (!banners) return res.status(400).json({ message: "no Banners" });

    if (req.file) {
      if (banners.img?.[0]?.public_id) {
        await cloudinary.uploader.destroy(banners.img[0].public_id);
      }

      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`,
        {
          folder: "Banner",
        }
      );
      updatedData.img = [
        {
          url: result.secure_url,
          public_id: result.public_id,
        },
      ];
    }

    const result = await Banner.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return res.status(200).json({
      message: "Updated sucessfully",
      result,
    });
  } catch (error) {
    console.log("Updating error", error);
    return res.status(500).json({ message: "Update failed", error });
  }
};

