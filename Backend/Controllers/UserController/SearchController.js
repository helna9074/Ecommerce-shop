import Products from "../../models/Products.js";
import Category from "../../models/Category.js";
export const searchProducts = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    if (!q) return res.json({ products: [], pagination: {} });

    const regex = new RegExp(q, "i");
    const skip = (page - 1) * limit;

    let productQuery = [];

    // 🔹 Category match
    const matchedCategory = await Category.findOne({ name: regex });

    // 🔹 Subcategory match
    const matchedSubCategory = await Category.findOne({
      subname: regex
    });

    if (matchedCategory) {
      productQuery.push({ category: matchedCategory._id });
    }

    if (matchedSubCategory) {
      productQuery.push({ subCategory: regex });
    }

    // 🔹 Product name match
    productQuery.push({ name: regex });

    const finalQuery = { $or: productQuery };

    const total = await Products.countDocuments(finalQuery);

    const products = await Products.find(finalQuery)
      .skip(skip)
      .limit(Number(limit))
      .populate("category");

    res.json({
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalResults: total
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const searchSuggestions = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const regex = new RegExp(q, "i");

    const products = await Products.find({
      $or: [
        { name: regex },
        { subCategory: regex }
      ]
    })
      .limit(6)
      .populate("category", "name");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
