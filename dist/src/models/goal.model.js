"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/* ✅ SCHEMA */
const goalSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    category: {
        type: String,
        required: true,
        index: true,
    },
    completedDates: {
        type: [Date], // ✅ important
        default: [],
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Goal", goalSchema);
