import Address from "../../models/Address.js";
import Cart from "../../models/Cart.js";
import Order from "../../models/Orders.js";
import crypto from "crypto";

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
  try {
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

    if (paymentMethod === "BANK") {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ message: "Payment details missing" });
      }
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");
      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({
          message: "Payment verification failed",
        });
      }
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || !cart.items.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (addressId) {
      const savedAddress = await Address.findOne({
        _id: addressId,
        user: userId,
      });

      if (!savedAddress) {
        return res.status(400).json({ message: "Address not found" });
      }

      finalAddress = savedAddress.address;
    } else if (address) {
      const requiredFields = ["firstName", "street", "city", "phone"];
      for (const field of requiredFields) {
        if (!address[field]) {
          return res.status(400).json({ message: "Incomplete address" });
        }
      }

      finalAddress = address;

      if (saveAddress) {
        await Address.updateMany({ user: userId }, { isDefault: false });

        await Address.create({
          user: userId,
          address,
          isDefault: true,
        });
      }
    } else {
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

    const order = await Order.create({
      user: userId,
      items,
      address: finalAddress,
      payment: {
        method: paymentMethod,
        status: paymentMethod === "COD" ? "PENDING" : "PAID",
      },
      discount: totalDiscount,
      subtotal,
      shipping,
      total,
    });
    cart.items =
      orderType === "BUY_NOW"
        ? cart.items.filter((i) => i.mode !== "BUY_NOW")
        : cart.items.filter((i) => i.mode !== "CART");

    await cart.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};
