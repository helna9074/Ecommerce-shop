import PDFDocument from "pdfkit";
import Order from "../../models/Orders.js";

export const generateInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ===== HEADERS =====
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // ===== PAGE CONSTANTS =====
    const startX = 50;
    const endX = 550;

    const itemX = 50;
    const qtyX = 320;
    const amountX = 450;

    // ===== SAFE ROUNDING =====
    const round = (value) => Math.round(Number(value || 0));

    // ===== TITLE =====
    doc.fontSize(20).font("Helvetica-Bold")
      .text("INVOICE", { align: "center" });

    doc.moveDown(2);

    // ===== DATE (LEFT) & ORDER ID (RIGHT) =====
    const currentY = doc.y;

    doc.fontSize(10).font("Helvetica")
      .text(`Date: ${new Date(order.createdAt).toDateString()}`, startX, currentY);

    doc.text(`Order ID: ${order._id}`, 350, currentY);

    doc.moveDown(2);

    // ===== TABLE HEADER =====
    const tableTop = doc.y + 10;

    doc.fontSize(11).font("Helvetica-Bold");

    doc.text("Item", itemX, tableTop);
    doc.text("Qty", qtyX, tableTop);
    doc.text("Amount", amountX, tableTop);

    doc.moveTo(startX, tableTop + 15)
      .lineTo(endX, tableTop + 15)
      .stroke();

    // ===== TABLE ROWS =====
    doc.font("Helvetica");
    let y = tableTop + 25;

    order.items.forEach((item) => {
      const qty = round(item.quantity);
      const price = round(item.price);
      const amount = round(qty * price);

      doc.text(item.name, itemX, y, { width: 250 });
      doc.text(qty.toString(), qtyX, y);
      doc.text(`${amount}`, amountX, y);

      y += 20;
    });

    // ===== TOTALS =====
    y += 10;

    doc.moveTo(qtyX, y)
      .lineTo(endX, y)
      .stroke();

    y += 10;

    const subtotal = round(order.subtotal);
    const shipping = round(order.shipping);
    const discount = round(order.discount);
    const total = round(order.total);

    doc.text("Subtotal", qtyX, y);
    doc.text(`Rs.${subtotal}`, amountX, y);

    y += 15;

    if (shipping > 0) {
      doc.text("Shipping", qtyX, y);
      doc.text(`₹${shipping}`, amountX, y);
      y += 15;
    }

    if (discount > 0) {
      doc.text("Discount", qtyX, y);
      doc.text(`-₹${discount}`, amountX, y);
      y += 15;
    }

    // ===== GRAND TOTAL =====
    doc.font("Helvetica-Bold");
    doc.text("Total", qtyX, y + 5);
    doc.text(`Rs.${total}`, amountX, y + 5);

    // ===== FOOTER =====
    doc.moveDown(4);
    doc.fontSize(9).font("Helvetica")
      .text("Thank you for shopping with us!", { align: "center" });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate invoice" });
  }
};
