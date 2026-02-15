import Address from "../../models/Address.js";
import Cart from "../../models/Cart.js";
import Order from "../../models/Orders.js";
import crypto from "crypto";
import Rating from "../../models/Rating.js";
import Products from "../../models/Products.js";
import Payment from "../../models/Payment.js";
import mongoose from "mongoose";
import { io } from "../../server.js";
import LowStockAlert from "../../models/Notifications.js";

const calculateShipping = (orderItems, subtotal) => {
  if (subtotal > 1000) return 0;

  const hasCash = orderItems.some((i) => i.productId?.delivery?.cashdelivery);
  const allFree = orderItems.every((i) => i.productId?.delivery?.freedelivery);

  if (hasCash) return 50;
  if (allFree) return 0;

  return 30;
};
const getFinalPrice = (product) => {
  const price = product.amount;

  if (!product.offer || !product.offer.enabled) {
    return {
      finalPrice: price,
      discount: 0,
    };
  }

  const now = new Date();
  const start = new Date(product.offer.startdate);
  const end = new Date(product.offer.enddate);

  // Offer expired or not started
  if (now < start || now > end) {
    return {
      finalPrice: price,
      discount: 0,
    };
  }

  const discount = Math.ceil((price * product.offer.Percentage) / 100);
  const finalPrice = price - discount;

  return {
    finalPrice,
    discount,
  };
};

export const CreateOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const LOW_STOCK_LIMIT = 5;
    const LOW_SIZE_LIMIT = 2;
    const userId = req.userId;
    const {
      address,
      paymentMethod,
      saveAddress,
      addressId,
      razorpay_order_id,
      razorpay_signature,
      razorpay_payment_id,
    } = req.body;
    let finalAddress;
    console.log("the address is getted here in the backend", address);
    if (paymentMethod === "BANK") {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Payment details missing" });
      }
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");
      if (expectedSignature !== razorpay_signature) {
        await session.abortTransaction();
        return res.status(400).json({
          message: "Payment verification failed",
        });
      }
    }

    const cart = await Cart.findOne({ userId })
      .populate("items.productId")
      .session(session);
    if (!cart || !cart.items.length) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (addressId) {
      const savedAddress = await Address.findOne({
        _id: addressId,
        user: userId,
      }).session(session);

      if (!savedAddress) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Address not found" });
      }
      finalAddress = savedAddress.address;
    } else if (address) {
      const requiredFields = ["firstName", "street", "city", "phone"];
      for (const field of requiredFields) {
        if (!address[field]) {
          await session.abortTransaction();
          return res.status(400).json({ message: "Incomplete address" });
        }
      }

      finalAddress = address;
    } else {
      await session.abortTransaction();
      return res.status(400).json({ message: "Address is required" });
    }

    const buyNowItems = cart.items.filter((i) => i.mode === "BUY_NOW");
    const cartItems = cart.items.filter((i) => i.mode === "CART");

    let orderItems = [];
    let orderType = "";

    if (buyNowItems.length > 0) {
      orderItems = buyNowItems;
      orderType = "BUY_NOW";
    } else {
      orderItems = cartItems;
      orderType = "CART";
    }
    if (!orderItems.length) {
      return res.status(400).json({ message: "No items to order" });
    }

    let subtotal = 0;
    let totalDiscount = 0;

    orderItems.forEach((i) => {
      const { finalPrice, discount } = getFinalPrice(i.productId);

      subtotal += finalPrice * i.quantity;
      totalDiscount += discount * i.quantity;
    });

    const shipping = calculateShipping(orderItems, subtotal);
    const total = subtotal + shipping;

    const items = orderItems.map((i) => {
      const { finalPrice, discount } = getFinalPrice(i.productId);
      return {
        product: i.productId._id,
        name: i.productId.name,
        price: finalPrice,
        discount,
        quantity: i.quantity,
        size: i.size,
        image: i.productId.img?.[0]?.url || "",
      };
    });
    const lowStockAlerts = [];
    for (const item of items) {
      let result;
      if (item.size) {
        result = await Products.updateOne(
          {
            _id: item.product,
            stock: { $gte: item.quantity },
            sizes: {
              $elemMatch: {
                value: item.size,
                qty: { $gte: item.quantity },
              },
            },
            // ensure enough stock
          },
          {
            $inc: {
              stock: -item.quantity,
              "sizes.$.qty": -item.quantity,
            },
          },
          { session },
        );
      } else {
        result = await Products.updateOne(
          {
            _id: item.product,
            stock: { $gte: item.quantity }, // ensure enough stock
          },
          {
            $inc: { stock: -item.quantity },
          },
          { session },
        );
      }
      if (result.modifiedCount === 0) {
        await session.abortTransaction();
        return res.status(400).json({
          message: `Insufficient stock for ${item.name}`,
        });
      }
      const updatedProduct = await Products.findById(item.product).session(
        session,
      );
      if (updatedProduct.stock <= LOW_STOCK_LIMIT) {
        lowStockAlerts.push({
          message: `Low stock alert:${updatedProduct.name}-only ${updatedProduct.stock} items left`,
          productId: updatedProduct._id,
        });
        if (item.size && updatedProduct.sizes?.length) {
          const sizeData = updatedProduct.sizes.find(
            (s) => s.value === item.size,
          );
          console.log("this is the sizeData", sizeData);
          if (sizeData && sizeData.qty <= LOW_SIZE_LIMIT) {
            lowStockAlerts.push({
              message: `Low stock alert:${updatedProduct.name}-${item.size}-(Size ${sizeData.value})-only ${sizeData.qty}  left`,
              productId: updatedProduct._id,
            });
          }
        }
      }
    }

    const order = await Order.create(
      [
        {
          user: userId,
          items,
          address: finalAddress,

          discount: totalDiscount,
          subtotal,
          shipping,
          total,
        },
      ],
      { session },
    );
    const payment = await Payment.create(
      [
        {
          order: order[0]._id,
          user: userId,
          method: paymentMethod === "BANK" ? "RAZORPAY" : "COD",
          amount: total,
          status: paymentMethod === "COD" ? "PENDING" : "SUCCESS",
          gateway:
            paymentMethod === "BANK"
              ? {
                  orderId: razorpay_order_id,
                  paymentId: razorpay_payment_id,
                  signature: razorpay_signature,
                }
              : undefined,
        },
      ],
      { session },
    );

    if (saveAddress && !addressId) {
      await Address.updateMany(
        { user: userId },
        { isDefault: false },
        { session },
      );

      await Address.create(
        [
          {
            user: userId,
            address,
            isDefault: true,
          },
        ],
        { session },
      );
    }

    cart.items =
      orderType === "BUY_NOW"
        ? cart.items.filter((i) => i.mode !== "BUY_NOW")
        : cart.items.filter((i) => i.mode !== "CART");

    await cart.save({ session });
    order[0].payment = payment[0]._id;
    await order[0].save({ session });
    await session.commitTransaction();
    session.endSession();

    for (const alert of lowStockAlerts) {
      let savedAlert = await LowStockAlert.findOne({
        product: alert.productId,
        seen: false,
      });
      if (!savedAlert) {
        savedAlert = await LowStockAlert.create({
          product: alert.productId,
          message: alert.message,
          seen: false,
        });
      }
      io.to("admins").emit("lowStockAlert", {
        _id: savedAlert._id,
        message: savedAlert.message,
      });
    }
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};
export const GetOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query?.search || "";
    const limit = 8;
    const skip = (page - 1) * limit;
    const query = { user: req.userId };
    if (search) {
      query["items.name"] = {
        $regex: search,
        $options: "i",
      };
    }
    const orders = await Order.find(query)
      .populate("items.product")
      .populate("payment")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    //Get productIds from orders
    const productIds = orders.flatMap((order) =>
      order.items.map((item) => item.product?._id),
    );
    //Fetch ratting for the user
    const ratings = await Rating.find({
      user: req.userId,
      product: { $in: productIds },
    }).lean();
    const ratingMap = {};
    ratings.forEach((r) => {
      ratingMap[r.product.toString()] = {
        rating: r.rating,
        reviewWritten: Boolean(r.review),
      };
    });
    //rating to order
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const productId = item.product?._id?.toString();
        item.rating = ratingMap[productId] || {
          rating: 0,
          reviewWritten: false,
        };
      });
    });
    const totalOrders = await Order.countDocuments(query);
    return res.status(200).json({
      message: "fetched successfully",
      orders,
      pagination: {
        totalOrders,
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        limit,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};
export const GetOrderProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id is not provided" });
    const order = await Order.findOne({ _id: id })
      .populate("items.product")
      .populate("payment")
      .lean();
    return res.status(200).json({ message: "fetched successfully", order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};
export const CancelOrder = async (req, res) => {
  try {
    console.log("call getted here in the cancel order");
    const { id } = req.params;
    const userId = req.userId;
    if (!id) return res.status(400).json({ message: "id is not provided" });
    const order = await Order.findOne({ _id: id });
    if (!order) return res.status(400).json({ message: "order not found" });
    if (["DELIVERED", "SHIPPED"].includes(order.orderStatus)) {
      return res.status(400).json({
        message: "Order cannot be cancelled at this stage",
      });
    }
    const payment = await Payment.findOne({ order: order._id, user: userId });
    if (!payment) return res.status(400).json({ message: "payment not found" });

    if (payment.method === "COD") {
      payment.status = "CANCELLED";
    } else {
      if (payment.status === "SUCCESS") {
        payment.status = "REFUND_INITIATED";
        payment.refund = {
          refundRequestedAt: new Date(),
        };
      } else {
        payment.status = "CANCELLED";
      }
    }

    await payment.save();

    order.orderStatus = "CANCEL_REQUESTED";
    order.cancellrequestedAt = new Date();
    // order.cancelledAt=new Date();
    await order.save();
    return res
      .status(200)
      .json({ message: "order cancelled successfully", order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};
