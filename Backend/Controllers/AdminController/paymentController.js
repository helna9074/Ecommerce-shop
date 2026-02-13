import Orders from "../../models/Orders.js";
import Payment from "../../models/Payment.js";

export const refundPayment = async (req, res) => {
  try {
    const { id } = req.params; //id = req.params;
    if(!id) return res.status(400).json({message:"id is not provided"})
   const order = await Orders.findById(id);
   console.log("Refund check order status:", order?.orderStatus);
    if (!order || order.orderStatus !== "CANCELLED") {
      return res.status(400).json({
        message: "Refund allowed only for cancelled orders",
      });
    }
    const payment = await Payment.findOne({ order: id });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.method === "COD") {
      return res.status(400).json({
        message: "COD payments do not require refund",
      });
    }

    if (payment.status !== "REFUND_INITIATED") {
      return res.status(400).json({
        message: "Refund already processed or invalid state",
      });
    }

    payment.status = "REFUNDED";
    payment.refund.refundedAt = new Date();
    await payment.save();

    return res.json({
      success: true,
      message: "Refund successful",
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
