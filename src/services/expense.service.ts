import Expense from "../models/expense.model";
import {
  ICreateExpenseInput,
  IUpdateExpenseInput,
} from "../types/expense.types";
import { Types } from "mongoose";

/**
 * Create Expense
 */
export const createExpense = async (
  userId: string,
  data: ICreateExpenseInput,
) => {
  return await Expense.create({
    ...data,
    date: Date.now(),
    userId: new Types.ObjectId(userId),
  });
};

/**
 * Update Expense
 */
export const updateExpense = async (
  userId: string,
  expenseId: string,
  data: IUpdateExpenseInput,
) => {
  return await Expense.findOneAndUpdate({ _id: expenseId, userId }, data, {
    new: true,
  });
};

/**
 * Delete Expense
 */
export const deleteExpense = async (userId: string, expenseId: string) => {
  return await Expense.findOneAndDelete({
    _id: expenseId,
    userId,
  });
};

/**
 * Get All Expenses with Filter
 */

export const getExpenses = async (userId: string, filter: string) => {
  const today = new Date();

  let startDate: Date | null = null;
  let endDate: Date | null = null;

  if (filter === "today") {
    startDate = new Date(today.setHours(0, 0, 0, 0));
    endDate = new Date(today.setHours(23, 59, 59, 999));
  }

  if (filter === "month") {
    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    endDate = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59,
    );
  }

  if (filter === "year") {
    startDate = new Date(today.getFullYear(), 0, 1);
    endDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59);
  }

  const query: any = { userId };

  if (startDate && endDate) {
    query.date = { $gte: startDate, $lte: endDate };
  }

  return await Expense.find(query).sort({ date: -1 });
};

/**
 * Category Analytics
 */

export const getCategoryAnalytics = async (
  userId: string,
  year: number,
  month: number,
) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  return await Expense.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $sort: { total: -1 },
    },
  ]);
};
