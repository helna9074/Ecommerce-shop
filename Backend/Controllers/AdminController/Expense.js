import Expense from "../../models/Expense.js";

export const addExpense = async (req, res, next) => {
    try {
        console.log("api geted");
        const { title, category, amount, note,date } = req.body;
        const adminId=req.adminId
        if(!adminId) return res.status(401).json({message:"not authorized"})
            if(!title||!category||!amount) return res.status(400).json({message:"All fields are required"})
        const expense = await Expense.create({
    title,
    category,
    amount,
    note,
    expenseDate:date,
    createdBy:adminId
    });
        console.log(expense);
        return res.status(201).json({
            expense,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "error in adding expense", error });
    }
};
export const GetExpense = async (req, res, next) => {
    try {
        console.log("api geted");
        const {limit=10,search}=req.query
          const page = Number(req.query.page) || 1;
       const query={}
         if(search){
           query.$or=[
              {title:{$regex:search,$options:"i"}},
              {category:{$regex:search,$options:"i"}}
           ]
        }
       const skip=(page-1)*limit
       const totalExpense=await Expense.countDocuments(query)
        const expense = await Expense.find(query).populate("createdBy").sort({createdAt:-1}).skip(skip).limit(limit);
        if(!expense) return res.status(400).json({message:"no expense found"})
        console.log(expense);
        return res.status(200).json({
            expense,
            Pagination: {
                totalExpense,
                totalPages: Math.ceil(totalExpense / limit),
                currentPage: page,
            }
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "error in fetching expense", error });
    }
};
export const DeleteExpense = async (req, res, next) => {
    try {
        console.log("api geted");
        const { id } = req.params;
        if(!id) return
        const expense = await Expense.findByIdAndDelete(id);
        console.log(expense);
        return res.status(200).json({
            expense,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "error in deleting expense", error });
    }
};
export const UpdateExpense = async (req, res, next) => {
    try {
        console.log("api geted");
        const { id } = req.params;
        if(!id) return res.status(400).json({message:"id is required"})
        const { title, category, amount, note,date } = req.body;
    if(!title||!category||!amount||!date) return res.status(400).json({message:"All fields are required"})
        const expense = await Expense.findByIdAndUpdate(id,{title,category,amount,note,expenseDate:date});
        console.log(expense);
        return res.status(201).json({
            expense,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "error in updating expense", error });
    }
};