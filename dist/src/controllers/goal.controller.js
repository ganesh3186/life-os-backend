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
exports.deleteGoal = exports.updateGoal = exports.toggleGoal = exports.getGoals = exports.addGoal = void 0;
const goalService = __importStar(require("../services/goal.service"));
/* CREATE */
const addGoal = async (req, res) => {
    try {
        const goal = await goalService.createGoal(req.body, req.userId);
        res.json({
            success: true,
            data: goal,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.addGoal = addGoal;
/* GET ALL */
const getGoals = async (req, res) => {
    try {
        const goals = await goalService.getGoals(req.userId);
        res.json({
            success: true,
            data: goals,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.getGoals = getGoals;
/* 🔥 TOGGLE (MAIN FEATURE) */
const toggleGoal = async (req, res) => {
    try {
        const goal = await goalService.toggleGoal(req.params.id, req.userId);
        res.json({
            success: true,
            data: goal,
        });
    }
    catch (err) {
        res.status(404).json({ success: false, message: err.message });
    }
};
exports.toggleGoal = toggleGoal;
/* UPDATE (ONLY EDIT FIELDS) */
const updateGoal = async (req, res) => {
    try {
        const goal = await goalService.updateGoal(req.params.id, req.userId, req.body);
        res.json({
            success: true,
            data: goal,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.updateGoal = updateGoal;
/* DELETE (SAFE) */
const deleteGoal = async (req, res) => {
    try {
        await goalService.deleteGoal(req.params.id);
        res.json({
            success: true,
            message: "Goal deleted",
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.deleteGoal = deleteGoal;
