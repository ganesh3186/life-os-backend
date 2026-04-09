"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryAnalytics = exports.getExpenses = exports.deleteExpense = exports.updateExpense = exports.createExpense = void 0;
const expense_model_1 = __importDefault(require("../models/expense.model"));
const mongoose_1 = require("mongoose");
/**
 * Create Expense
 */
const createExpense = async (userId, data) => {
    return await expense_model_1.default.create({
        ...data,
        date: Date.now(),
        userId: new mongoose_1.Types.ObjectId(userId),
    });
};
exports.createExpense = createExpense;
/**
 * Update Expense
 */
const updateExpense = async (userId, expenseId, data) => {
    return await expense_model_1.default.findOneAndUpdate({ _id: expenseId, userId }, data, {
        new: true,
    });
};
exports.updateExpense = updateExpense;
/**
 * Delete Expense
 */
const deleteExpense = async (userId, expenseId) => {
    return await expense_model_1.default.findOneAndDelete({
        _id: expenseId,
        userId,
    });
};
exports.deleteExpense = deleteExpense;
/**
 * Get All Expenses with Filter
 */
const getExpenses = async (userId, filter) => {
    const today = new Date();
    let startDate = null;
    let endDate = null;
    if (filter === "today") {
        startDate = new Date(today.setHours(0, 0, 0, 0));
        endDate = new Date(today.setHours(23, 59, 59, 999));
    }
    if (filter === "month") {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
    }
    if (filter === "year") {
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59);
    }
    const query = { userId };
    if (startDate && endDate) {
        query.date = { $gte: startDate, $lte: endDate };
    }
    return await expense_model_1.default.find(query).sort({ date: -1 });
};
exports.getExpenses = getExpenses;
/**
 * Category Analytics
 */
const getCategoryAnalytics = async (userId, year, month) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);
    return await expense_model_1.default.aggregate([
        {
            $match: {
                userId: new mongoose_1.Types.ObjectId(userId),
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
exports.getCategoryAnalytics = getCategoryAnalytics;
