import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  site: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Expense", ExpenseSchema);
