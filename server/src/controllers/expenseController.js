import ExpenseModel from "../models/ExpenseModel.js";

export const createExpense = async (req, res) => {
  try {
    console.log(req.body)
    const { date, amount, category, reason, site, photo } = req.body;

    const data = new ExpenseModel({
      date,
      amount,
      category,
      reason,
      photo,
      site,
    });

    await data.save();

    res.status(201).json({
      success: true,
      data,
      message: "Expense created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
