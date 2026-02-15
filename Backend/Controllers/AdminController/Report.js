import Order from "../../models/Orders.js";
import Expense from "../../models/Expense.js";
import ExcelJS from "exceljs";

export const getReports = async (req, res) => {
  try {
    const {
      type = "sales", // sales | p&l
      view = "item", // item | category | payment

      search = "",
    } = req.query;

    /* ================= PAGINATION ================= */
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    /* ================= DATE FILTER ================= */

    /* =================================================
       SALES REPORTS
    ================================================= */
    if (type === "sales") {
      /* -------- SALES BY ITEMS -------- */
      if (view === "item") {
        const result = await Order.aggregate([
          {
            $match: {
              orderStatus: "DELIVERED",
            },
          },
          { $unwind: "$items" },
          {
            $match: {
              "items.name": { $regex: search, $options: "i" },
            },
          },
          {
            $group: {
              _id: "$items.product",
              name: { $first: "$items.name" },
              totalQty: { $sum: "$items.quantity" },
              totalAmount: {
                $sum: { $multiply: ["$items.price", "$items.quantity"] },
              },
            },
          },
          { $sort: { totalQty: -1 } },
          {
            $facet: {
              data: [{ $skip: skip }, { $limit: limit }],
              totalCount: [{ $count: "count" }],
            },
          },
        ]);

        const rows = result[0]?.data || [];
        const totalRecords = result[0]?.totalCount[0]?.count || 0;

        return res.json({
          report: rows,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalRecords / limit),
            totalRecords,
            limit,
          },
        });
      }

      /* -------- SALES BY CATEGORY -------- */
      if (view === "category") {
        const result = await Order.aggregate([
          {
            $match: {
              orderStatus: "DELIVERED",
            },
          },
          { $unwind: "$items" },
          {
            $lookup: {
              from: "products",
              localField: "items.product",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
          {
            $lookup: {
              from: "categories",
              localField: "product.category",
              foreignField: "_id",
              as: "category",
            },
          },
          { $unwind: "$category" },
          {
            $match: search
              ? { "category.name": { $regex: search, $options: "i" } }
              : {},
          },

          {
            $group: {
              _id: "$category._id",
              categoryName: { $first: "$category.name" },
              totalQty: { $sum: "$items.quantity" },
              totalAmount: {
                $sum: { $multiply: ["$items.price", "$items.quantity"] },
              },
            },
          },
          { $sort: { totalAmount: -1 } },
          {
            $facet: {
              data: [{ $skip: skip }, { $limit: limit }],
              totalCount: [{ $count: "count" }],
            },
          },
        ]);

        const rows = result[0]?.data || [];
        const totalRecords = result[0]?.totalCount[0]?.count || 0;

        return res.json({
          report: rows,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalRecords / limit),
            totalRecords,
            limit,
          },
        });
      }

      /* -------- SALES BY PAYMENT METHOD -------- */
      if (view === "payment") {
        const result = await Order.aggregate([
          {
            $match: {
              orderStatus: "DELIVERED",
            },
          },
          {
            $lookup: {
              from: "payments",
              localField: "payment",
              foreignField: "_id",
              as: "payment",
            },
          },
          { $unwind: "$payment" },
          {
            $match: search
              ? { "payment.method": { $regex: search, $options: "i" } }
              : {},
          },

          {
            $group: {
              _id: "$payment.method",
              totalAmount: { $sum: "$total" },
              totalOrders: { $sum: 1 },
            },
          },
          { $sort: { totalAmount: -1 } },
          {
            $facet: {
              data: [{ $skip: skip }, { $limit: limit }],
              totalCount: [{ $count: "count" }],
            },
          },
        ]);

        const rows = result[0]?.data || [];
        const totalRecords = result[0]?.totalCount[0]?.count || 0;

        return res.json({
          report: rows,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalRecords / limit),
            totalRecords,
            limit,
          },
        });
      }
    }

    /* =================================================
       PROFIT & LOSS
    ================================================= */
    if (type === "p&l") {
      const sales = await Order.aggregate([
        {
          $match: {
            orderStatus: "DELIVERED",
          },
        },
        {
          $group: {
            _id: null,
            totalIncome: { $sum: "$total" },
          },
        },
      ]);

      const expenses = await Expense.aggregate([
        {
          $group: {
            _id: null,
            totalExpense: { $sum: "$amount" },
          },
        },
      ]);

      const income = sales[0]?.totalIncome || 0;
      const expense = expenses[0]?.totalExpense || 0;

      return res.json({
        income,
        expense,
        profit: income - expense,
      });
    }

    return res.status(400).json({ message: "Invalid report type" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Report generation failed" });
  }
};

export const downloadReport = async (req, res) => {
  try {
    const {
      type = "sales",
      view = "item",
      search = "",
      page = 1,
      limit = 10,
    } = req.query;

    const skip = (page - 1) * limit;

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Report");

    /* ================= SALES REPORT ================= */
    if (type === "sales") {
      /* -------- SALES BY ITEMS -------- */
      if (view === "item") {
        const result = await Order.aggregate([
          { $match: { orderStatus: "DELIVERED" } },
          { $unwind: "$items" },
          {
            $match: {
              "items.name": { $regex: search, $options: "i" },
            },
          },
          {
            $group: {
              _id: "$items.product",
              name: { $first: "$items.name" },
              totalQty: { $sum: "$items.quantity" },
              totalAmount: {
                $sum: { $multiply: ["$items.price", "$items.quantity"] },
              },
            },
          },
          { $sort: { totalQty: -1 } },
          { $skip: skip },
          { $limit: Number(limit) },
        ]);

        sheet.columns = [
          { header: "Item Name", key: "name", width: 30 },
          { header: "Quantity", key: "totalQty", width: 15 },
          { header: "Total Amount", key: "totalAmount", width: 20 },
        ];

        result.forEach((row) => sheet.addRow(row));
      }

      /* -------- SALES BY CATEGORY -------- */
      if (view === "category") {
        const result = await Order.aggregate([
          { $match: { orderStatus: "DELIVERED" } },
          { $unwind: "$items" },
          {
            $lookup: {
              from: "products",
              localField: "items.product",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
          {
            $lookup: {
              from: "categories",
              localField: "product.category",
              foreignField: "_id",
              as: "category",
            },
          },
          { $unwind: "$category" },
          {
            $group: {
              _id: "$category._id",
              categoryName: { $first: "$category.name" },
              totalQty: { $sum: "$items.quantity" },
              totalAmount: {
                $sum: { $multiply: ["$items.price", "$items.quantity"] },
              },
            },
          },
          { $sort: { totalAmount: -1 } },
          { $skip: skip },
          { $limit: Number(limit) },
        ]);

        sheet.columns = [
          { header: "Category", key: "categoryName", width: 30 },
          { header: "Quantity", key: "totalQty", width: 15 },
          { header: "Total Amount", key: "totalAmount", width: 20 },
        ];

        result.forEach((row) => sheet.addRow(row));
      }

      /* -------- SALES BY PAYMENT -------- */
      if (view === "payment") {
        const result = await Order.aggregate([
          { $match: { orderStatus: "DELIVERED" } },
          {
            $lookup: {
              from: "payments",
              localField: "payment",
              foreignField: "_id",
              as: "payment",
            },
          },
          { $unwind: "$payment" },
          {
            $group: {
              _id: "$payment.method",
              totalOrders: { $sum: 1 },
              totalAmount: { $sum: "$total" },
            },
          },
          { $sort: { totalAmount: -1 } },
          { $skip: skip },
          { $limit: Number(limit) },
        ]);

        sheet.columns = [
          { header: "Payment Method", key: "_id", width: 30 },
          { header: "Orders", key: "totalOrders", width: 15 },
          { header: "Total Amount", key: "totalAmount", width: 20 },
        ];

        result.forEach((row) => sheet.addRow(row));
      }
    }

    /* ================= PROFIT & LOSS ================= */
    if (type === "p&l") {
      const sales = await Order.aggregate([
        { $match: { orderStatus: "DELIVERED" } },
        { $group: { _id: null, income: { $sum: "$total" } } },
      ]);

      const expenses = await Expense.aggregate([
        { $group: { _id: null, expense: { $sum: "$amount" } } },
      ]);

      const income = sales[0]?.income || 0;
      const expense = expenses[0]?.expense || 0;

      sheet.columns = [
        { header: "Type", key: "type", width: 25 },
        { header: "Amount", key: "amount", width: 20 },
      ];

      sheet.addRow({ type: "Income", amount: income });
      sheet.addRow({ type: "Expense", amount: expense });
      sheet.addRow({ type: "Net Profit", amount: income - expense });
    }

    /* ================= DOWNLOAD ================= */
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader("Content-Disposition", "attachment; filename=report.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Excel download failed" });
  }
};
