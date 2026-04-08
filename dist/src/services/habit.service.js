"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHabit = exports.updateHabit = exports.getHabits = exports.createHabit = void 0;
const habit_model_1 = __importDefault(require("../models/habit.model"));
const createHabit = async (data) => {
    return await habit_model_1.default.create(data);
};
exports.createHabit = createHabit;
const getHabits = async (userId) => {
    return await habit_model_1.default.find({ userId }).sort({ createdAt: -1 });
};
exports.getHabits = getHabits;
const updateHabit = async (id, data) => {
    return await habit_model_1.default.findByIdAndUpdate(id, data, { new: true });
};
exports.updateHabit = updateHabit;
const deleteHabit = async (id) => {
    return await habit_model_1.default.findByIdAndDelete(id);
};
exports.deleteHabit = deleteHabit;
