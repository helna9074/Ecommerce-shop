import Order from "../../models/Orders.js";
import User from "../../models/User.js";
import Product from "../../models/Products.js";
import Rating from '../../models/Rating.js'
import Expense from '../../models/Expense.js'
const today = new Date();
const dayOfWeek = today.getDay()===0?7:today.getDay();

const startOfThisWeek = new Date(today);
startOfThisWeek.setDate(today.getDate() - dayOfWeek);
startOfThisWeek.setHours(0, 0, 0, 0);

const startOfLastWeek = new Date(startOfThisWeek);
startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

const endOfLastWeek = new Date(startOfThisWeek);
endOfLastWeek.setMilliseconds(-1);
const calculatePercentageChange = (thisWeek, lastWeek) => {
  if (lastWeek === 0 && thisWeek === 0) return 0;
  if (lastWeek === 0) return 100;

  const change = ((thisWeek - lastWeek) / lastWeek) * 100;
  return Math.round(change * 10) / 10;
};
export const getDashboardBoxdata = async (req, res) => {
  try {
    const thisWeekRevenueAgg = await Order.aggregate([
      {
        $match: {
          orderStatus: "DELIVERED",
          deliveredAt: { $gte: startOfThisWeek },
        },
      },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const lastWeekRevenueAgg = await Order.aggregate([
      {
        $match: {
          orderStatus: "DELIVERED",
          deliveredAt: {
            $gte: startOfLastWeek,
            $lte: endOfLastWeek,
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const thisWeekRevenue = thisWeekRevenueAgg[0]?.total || 0;
    const lastWeekRevenue = lastWeekRevenueAgg[0]?.total || 0;

    const revenueChange = calculatePercentageChange(
      thisWeekRevenue,
      lastWeekRevenue,
    );
    const thisweekOrders = await Order.countDocuments({
      createdAt: { $gte: startOfThisWeek },
    });
    const lastweekOrders = await Order.countDocuments({
      createdAt: { $gte: startOfLastWeek, $lte: endOfLastWeek },
    });
    const orderChange =thisweekOrders-lastweekOrders

    const thisweekProducts = await Product.countDocuments({
      createdAt: { $gte: startOfThisWeek },
    });
    const lastweekProducts = await Product.countDocuments({
      createdAt: { $gte: startOfLastWeek, $lte: endOfLastWeek },
    });
    const productDiff = thisweekProducts - lastweekProducts;
    const thisweekCustomersAgg = await Order.aggregate([
      {
        $match: {
          orderStatus: "DELIVERED",
          deliveredAt: { $gte: startOfThisWeek },
        },
      },
      {
        $group: {
          _id: "$user",
        },
      },
      {
        $count: "count",
      },
    ]);
    const lastweekCustomersAgg = await Order.aggregate([
      {
        $match: {
          orderStatus: "DELIVERED",
          deliveredAt: {
            $gte: startOfLastWeek,
            $lte: endOfLastWeek,
          },
        },
      },
      {
        $group: {
          _id: "$user",
        },
      },
      {
        $count: "count",
      },
    ]);

    const lastweekCustomers = lastweekCustomersAgg[0]?.count || 0;

    const thisweekCustomers = thisweekCustomersAgg[0]?.count || 0;
    const customerDiff = thisweekCustomers - lastweekCustomers;

    /* =========================
       TOTAL COUNTS + PERCENT
    ========================= */
    const totalRevenueAgg = await Order.aggregate([
      { $match: { orderStatus: "DELIVERED" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    const totalOrders = await Order.countDocuments();

    const totalProducts = await Product.countDocuments();
    const totalCustomersAgg = await Order.aggregate([
      { $match: { orderStatus: "DELIVERED" } },
      {
        $group: {
          _id: "$user",
        },
      },
    ]);

    const totalCustomers = totalCustomersAgg.length;
    return res
      .status(200)
      .json({
        cards:{
          revenue:{
            totalRevenue, 
            revenueChange,
          },
          orders:{
            totalOrders,
            orderChange,
          },
          products:{
            totalProducts,
            productDiff,
          },
          customers:{
             totalCustomers,
        
        customerDiff
          },
           
        
        
       
        }
       
      });
  } catch (error) {
    return res.status(500).json({ message: "error in fetching data", error });
  }
};
export const getDashboardOrdersView = async (req, res) => {
  try { const ordersOverviewAgg = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    const ordersOverview = {
      PLACED: 0,
      CONFIRMED: 0,
      SHIPPED: 0,
      DELIVERED: 0,
      CANCELLED: 0,
      CANCEL_REQUESTED: 0,
    };

    ordersOverviewAgg.forEach((item) => {
      ordersOverview[item._id] = item.count;
    });

    return res.status(200).json({ ordersOverview });
   
  } catch (error) {
    return res.status(500).json({ message: "error in fetching data", error });
  }
}
export const getDashboardSalesAnalytics = async (req, res) => {
  try {
    const range = req.query.range || "month";

    let matchStage = {
      orderStatus: "DELIVERED",
      deliveredAt: { $exists: true },
    };

    let groupStage = {};
    let sortStage = {};

    // =========================
    // 📅 WEEK → Sun, Mon, Tue
    // =========================
    if (range === "week") {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);

      matchStage.deliveredAt.$gte = startDate;

      groupStage = {
        _id: { day: { $dayOfWeek: "$deliveredAt" } }, // 1=Sun
        revenue: { $sum: "$total" },
        orders: { $sum: 1 },
      };

      sortStage = { "_id.day": 1 };
    }

    // =========================
    // 📆 MONTH → Jan, Feb, Mar
    // =========================
    else {
      groupStage = {
        _id: {
          year: { $year: "$deliveredAt" },
          month: { $month: "$deliveredAt" },
        },
        revenue: { $sum: "$total" },
        orders: { $sum: 1 },
      };

      sortStage = { "_id.year": 1, "_id.month": 1 };
    }

    const rawData = await Order.aggregate([
      { $match: matchStage },
      { $group: groupStage },
      { $sort: sortStage },
    ]);

    // =========================
    // 🎯 FORMAT RESPONSE
    // =========================
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const dayNames = {
      1: "Sun",
      2: "Mon",
      3: "Tue",
      4: "Wed",
      5: "Thu",
      6: "Fri",
      7: "Sat",
    };

    const salesAnalytics =
      range === "week"
        ? rawData.map(item => ({
            label: dayNames[item._id.day],
            revenue: item.revenue,
            orders: item.orders,
          }))
        : rawData.map(item => ({
            label: monthNames[item._id.month - 1],
            revenue: item.revenue,
            orders: item.orders,
          }));

    return res.status(200).json({ salesAnalytics });
  } catch (error) {
    return res.status(500).json({
      message: "error in fetching sales analytics",
      error,
    });
  }
};

export const getDashboardBestSellingProducts = async (req, res) => {
  try {
    const bestSellingProducts = await Order.aggregate([
      {
        $match: {
          orderStatus: "DELIVERED",
      
        },
      },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          sold: { $sum: "$items.quantity" },
          revenue: {
            $sum: {
              $multiply: ["$items.quantity", "$items.price"],
            },
          },
        },
      },
      {$sort:{sold:-1}},
      { $limit: 5 },
    ]);

  
   const populatedProducts = await Product.populate(bestSellingProducts, {
      path: "_id",
      select: "name price img",
    });
  const formattedsellings = populatedProducts.map((p) => ({
      product: p._id,
      sold: p.sold,
      revenue: p.revenue,
    }));
    return res.status(200).json({ bestSellingProducts: formattedsellings });
  } catch (error) {
    return res.status(500).json({ message: "error in fetching data", error });
  }
}
export const getDashboardRecentOrders = async (req, res) => {
  try {
        const recentOrders = await Order.find()
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return res.status(200).json({ recentOrders });
  }catch(error){
    return res.status(500).json({ message: "error in fetching data", error });
  }
}
export const getDashboardTopCustomers = async (req, res) => {
  try {
     const topCustomersAgg = await Order.aggregate([
      { $match: { orderStatus: "DELIVERED" } },
      {
        $group: {
          _id: "$user",
          totalSpent: { $sum: "$total" },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
    ]);

    const topCustomers = await User.populate(topCustomersAgg, {
      path: "_id",
      select: "firstname ",
    });
    return res.status(200).json({ topCustomers });
  } catch (error) {
    return res.status(500).json({ message: "error in fetching data", error });
  }
}
export const topCategories = async (req, res) => {
  try {
   

    const topCategories = await Order.aggregate([
      // 1️⃣ Only delivered orders
      {
        $match: { orderStatus: "DELIVERED" },
      },

      // 2️⃣ Break items
      { $unwind: "$items" },

      // 3️⃣ Group by product (to find best-selling product)
      {
        $group: {
          _id: "$items.product",
          soldQty: { $sum: "$items.quantity" },
        },
      },

      // 4️⃣ Join products
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },

      // 5️⃣ Join categories
      {
        $lookup: {
          from: "categories",
          localField: "product.category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },

      // 6️⃣ Sort → so most sold product comes first
      { $sort: { soldQty: -1 } },

      // 7️⃣ Group by category
      {
        $group: {
          _id: "$category._id",
          categoryName: { $first: "$category.name" },

          // top selling product (from delivered orders)
          topProduct: {
            $first: {
              _id: "$product._id",
              name: "$product.name",
              image: { $arrayElemAt: ["$product.img", 0] },
            },
          },
        },
      },

      // 8️⃣ Lookup ALL products in that category
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "allProducts",
        },
      },

      // 9️⃣ Count total products under category
      {
        $addFields: {
          productCount: { $size: "$allProducts" },
        },
      },

      // 🔟 Sort & limit
      { $sort: { productCount: -1 } },
      { $limit: 5 },

      // 1️⃣1️⃣ Final shape
      {
        $project: {
          _id: 0,
          categoryId: "$_id",
          categoryName: 1,
          productCount: 1,
          topProduct: 1,
        },
      },
    ]);

    /* =========================
       FINAL RESPONSE
    ========================= */

    res.status(200).json({
      success: true,
      topCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getTopRatedProducts = async (req, res) => {
  try {
    // 1️⃣ Get delivered product IDs
    const deliveredProducts = await Order.aggregate([
      { $match: { orderStatus: "DELIVERED" } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
        },
      },
    ]);

    const deliveredProductIds = deliveredProducts.map(p => p._id);

    // 2️⃣ Aggregate ratings
    const topRatedAgg = await Rating.aggregate([
      {
        $match: {
          product: { $in: deliveredProductIds },
        },
      },
      {
        $group: {
          _id: "$product",
          avgRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
        },
      },

      // ⭐ Optional but recommended
      // { $match: { totalRatings: { $gte: 3 } } },

      { $sort: { avgRating: -1 } },
      { $limit: 5 },
    ]);

    // 3️⃣ Populate product details
    let topRatedProducts = await Product.populate(topRatedAgg, {
      path: "_id",
      select: "name price img",
    });
    topRatedProducts = topRatedProducts.map(item => ({
      productId: item._id._id,
      name: item._id.name,
      price: item._id.price,
      image: item._id.img?.[0] || null, // ✅ only first image
      avgRating: Number(item.avgRating.toFixed(1)),
      totalRatings: item.totalRatings,
    }));

    return res.status(200).json({
      success: true,
      topRatedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching top rated products",
      error,
    });
  }
};
export const RecentExpense=async(req,res)=>{
  try {
    const expenses = await Expense.find({}).sort({ createdAt: -1 }).limit(5);
    res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching recent expenses",
      error,
    });
  }
}