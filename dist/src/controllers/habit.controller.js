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
exports.deleteHabit = exports.updateHabit = exports.getHabits = exports.createHabit = void 0;
const habitService = __importStar(require("../services/habit.service"));
const createHabit = async (req, res) => {
    try {
        const userId = req.userId;
        const habit = await habitService.createHabit({
            ...req.body,
            userId,
        });
        res.status(201).json({
            success: true,
            data: habit,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create habit",
        });
    }
};
exports.createHabit = createHabit;
const getHabits = async (req, res) => {
    try {
        const userId = req.userId;
        const habits = await habitService.getHabits(userId);
        res.json({
            success: true,
            data: habits,
        });
    }
    catch (error) {
        res.status(500).json({
            error: error,
            success: false,
            message: "Failed to get habits",
        });
    }
};
exports.getHabits = getHabits;
const updateHabit = async (req, res) => {
    try {
        const habit = await habitService.updateHabit(req.params.id, req.body);
        res.json({
            success: true,
            data: habit,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update habit",
        });
    }
};
exports.updateHabit = updateHabit;
const deleteHabit = async (req, res) => {
    try {
        await habitService.deleteHabit(req.params.id);
        res.json({
            success: true,
            message: "Habit deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Delete failed",
        });
    }
};
exports.deleteHabit = deleteHabit;
