"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryAnalytics = exports.getExpenses = exports.removeExpense = exports.editExpense = exports.addExpense = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const expenseService = __importStar(require("../services/expense.service"));
/**
 * Create Expense
 */
exports.addExpense = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const expense = await expenseService.createExpense(req.userId, req.body);
    res.status(201).json({
        success: true,
        data: expense,
    });
});
/**
 * Update Expense
 */
exports.editExpense = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const updated = await expenseService.updateExpense(req.userId, req.params.id, req.body);
    res.json({
        success: true,
        data: updated,
    });
});
/**
 * Delete Expense
 */
exports.removeExpense = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await expenseService.deleteExpense(req.userId, req.params.id);
    res.json({
        success: true,
        message: "Expense deleted",
    });
});
/**
 * Get Expenses with Filter
 */
exports.getExpenses = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { filter } = req.query;
    const expenses = await expenseService.getExpenses(req.userId, filter || "all");
    res.json({
        success: true,
        data: expenses,
    });
});
/**
 * Category Analytics
 */
exports.categoryAnalytics = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { year, month } = req.query;
    const analytics = await expenseService.getCategoryAnalytics(req.userId, Number(year), Number(month));
    res.json({
        success: true,
        data: analytics,
    });
});
