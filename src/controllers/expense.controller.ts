import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as expenseService from "../services/expense.service";

/**
 * Create Expense
 */
export const addExpense = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const expense = await expenseService.createExpense(req.userId!, req.body);

    res.status(201).json({
      success: true,
      data: expense,
    });
  },
);

/**
 * Update Expense
 */
export const editExpense = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const updated = await expenseService.updateExpense(
      req.userId!,
      req.params.id as string,
      req.body,
    );

    res.json({
      success: true,
      data: updated,
    });
  },
);

/**
 * Delete Expense
 */
export const removeExpense = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    await expenseService.deleteExpense(req.userId!, req.params.id as string);

    res.json({
      success: true,
      message: "Expense deleted",
    });
  },
);

/**
 * Get Expenses with Filter
 */
export const getExpenses = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { filter } = req.query;

    const expenses = await expenseService.getExpenses(
      req.userId!,
      (filter as string) || "all",
    );

    res.json({
      success: true,
      data: expenses,
    });
  },
);

/**
 * Category Analytics
 */
export const categoryAnalytics = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { year, month } = req.query;

    const analytics = await expenseService.getCategoryAnalytics(
      req.userId!,
      Number(year),
      Number(month),
    );

    res.json({
      success: true,
      data: analytics,
    });
  },
);
