import mongoose, { Schema } from "mongoose";
import { IExpense } from "../types/expense.types";

const expenseSchema = new Schema<IExpense>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    note: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// optimize queries
expenseSchema.index({ userId: 1, date: -1 });

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;
