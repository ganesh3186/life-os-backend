import express from "express";
import * as expenseController from "../controllers/expense.controller";
import protect from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, expenseController.addExpense);

router.get("/", protect, expenseController.getExpenses);

router.put("/:id", protect, expenseController.editExpense);

router.delete("/:id", protect, expenseController.removeExpense);

router.get("/analytics/category", protect, expenseController.categoryAnalytics);

export default router;
