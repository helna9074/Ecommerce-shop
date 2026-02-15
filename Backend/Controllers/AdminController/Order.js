
import Orders from "../../models/Orders.js";
import Payment from "../../models/Payment.js";

export const GetAllOrders = async (req, res, next) => {
   try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status,
      startDate,
      endDate,
    } = req.query;

    const skip = (page - 1) * limit;

    let matchStage = {};
    

    //  Filter by order status
    if (status) {
      matchStage.orderStatus = status;
    }

    //  Filter by date range
    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = new Date(startDate);
      if (endDate) matchStage.createdAt.$lte = new Date(endDate);
    }

    const pipeline = [
  { $match: matchStage },

  // User lookup
  {
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "user",
    },
  },
  { $unwind: "$user" },

  // Payment lookup
  {
    $lookup: {
      from: "payments",
      localField: "payment",
      foreignField: "_id",
      as: "payment",
    },
  },
  {
    $unwind: {
      path: "$payment",
      preserveNullAndEmptyArrays: true,
    },
  },

  // 🔹 UNWIND ITEMS (IMPORTANT)
  { $unwind: "$items" },
        ...(search
        ? [
            {
              $match: {
                $or: [
                  { "items.name": { $regex: search, $options: "i" } },       // product name
                  { "address.firstName": { $regex: search, $options: "i" } }, // customer name
                       // email
                ],
              },
            },
          ]
        : []),



  // 🔹 LOOKUP RATING FOR THIS USER + PRODUCT
  {
    $lookup: {
      from: "ratings",
      let: {
        productId: "$items.product",
        userId: "$user._id",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$product", "$$productId"] },
                { $eq: ["$user", "$$userId"] },
              ],
            },
          },
        },
        {
          $project: {
            rating: 1,
            review: 1,
            _id: 0,
          },
        },
      ],
      as: "items.rating",
    },
  },

  // 🔹 convert array → object
  {
    $addFields: {
      "items.rating": { $arrayElemAt: ["$items.rating", 0] },
    },
  },

  // 🔹 group items back
  {
    $group: {
      _id: "$_id",
      order: { $first: "$$ROOT" },
      items: { $push: "$items" },
    },
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: ["$order", { items: "$items" }],
      },
    },
  },

  { $sort: { createdAt: -1 } },

  {
    $facet: {
      orders: [{ $skip: skip }, { $limit: Number(limit) }],
      totalCount: [{ $count: "count" }],
    },
  },
];


      // 3️ Search (product name OR user firstname)
      


    const result = await Orders.aggregate(pipeline);

    const orders = result[0].orders;
    const totalOrders = result[0].totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalOrders / limit);
       
    
    res.status(200).json({
      success: true,
      orders,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalOrders,
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error("Admin Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
}
;   
export const UpdateOrderStatus=async(req,res,next)=>{ 
  console.log("api reached here")

    try {
        const {id}=req.params
        const {status}=req.body
         const allowed = ["CONFIRMED", "SHIPPED", "DELIVERED","CANCELLED",];
        
          
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
        if(!id) return res.status(400).json({ message: "id is not provided" });
        const order=await Orders.findById(id)
       
        if(!order) return res.status(400).json({ message: "order not found" });
        const validTransitions = {
  PLACED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED"],
  CANCEL_REQUESTED: ["CANCELLED"],
};

        if (
  !validTransitions[order.orderStatus]?.includes(status)
) {
  return res.status(400).json({
    message: "Invalid status transition",
  });
}
if (order.orderStatus === "CANCELLED") {
  return res.status(400).json({ message: "Already cancelled" });
}


        const now=new Date();
        switch(status){
          case "CONFIRMED":
            order.confirmedAt??=now;
            break;
          case "SHIPPED":
            order.shippedAt??=now;
            break;
          case "DELIVERED":
            order.deliveredAt??=now;
            break;
            case "CANCELLED":
            order.cancelledAt??=now;
            break;

        }
        order.orderStatus=status
       
        await order.save()
        
        if (status === "DELIVERED") {
      const payment = await Payment.findOne({ order: id});

      if (payment&&payment.method==="COD") {
        payment.status = "SUCCESS"; // recommended
        await payment.save();
      }
        }
        
        
        return res.status(200).json({success:true,message:"order status updated successfully",order})
    } catch (error) {
        console.log("this is the error",error)
        return res.status(500).json({success:false,message:"internal server error"})
    }
}