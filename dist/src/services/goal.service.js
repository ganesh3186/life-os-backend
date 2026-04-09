"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGoal = exports.updateGoal = exports.toggleGoal = exports.getGoals = exports.createGoal = void 0;
const goal_model_1 = __importDefault(require("../models/goal.model"));
const createGoal = async (data, userId) => {
    return await goal_model_1.default.create({ ...data, userId });
};
exports.createGoal = createGoal;
const getGoals = async (userId) => {
    return await goal_model_1.default.find({ userId }).sort({ createdAt: -1 });
};
exports.getGoals = getGoals;
const toggleGoal = async (id, userId) => {
    const goal = await goal_model_1.default.findOne({ _id: id, userId });
    if (!goal)
        throw new Error("Goal not found");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exists = goal.completedDates.some((d) => {
        const date = new Date(d);
        date.setHours(0, 0, 0, 0);
        return date.getTime() === today.getTime();
    });
    if (exists) {
        goal.completedDates = goal.completedDates.filter((d) => {
            const date = new Date(d);
            date.setHours(0, 0, 0, 0);
            return date.getTime() !== today.getTime();
        });
    }
    else {
        goal.completedDates.push(today);
    }
    await goal.save();
    return goal;
};
exports.toggleGoal = toggleGoal;
const updateGoal = async (id, userId, data) => {
    return await goal_model_1.default.findOneAndUpdate({ _id: id, userId }, {
        title: data.title,
        description: data.description,
        category: data.category,
    }, { new: true });
};
exports.updateGoal = updateGoal;
const deleteGoal = async (id) => {
    return await goal_model_1.default.findByIdAndDelete(id);
};
exports.deleteGoal = deleteGoal;
