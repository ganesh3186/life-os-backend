"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// import userRoutes from "./routes/user.routes";
const expense_routes_1 = __importDefault(require("./routes/expense.routes"));
const goal_routes_1 = __importDefault(require("./routes/goal.routes"));
const habit_routes_1 = __importDefault(require("./routes/habit.routes"));
const insight_routes_1 = __importDefault(require("./routes/insight.routes"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
app.use(async (req, res, next) => {
    await (0, db_1.connectDB)();
    next();
});
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// API Routes
app.use("/api/auth", auth_routes_1.default);
// app.use("/api/users", userRoutes);
app.use("/api/expenses", expense_routes_1.default);
app.use("/api/goals", goal_routes_1.default);
app.use("/api/habits", habit_routes_1.default);
app.use("/api/insights", insight_routes_1.default);
// Health check
app.get("/", (req, res) => {
    res.json({ message: "Life OS API running" });
});
exports.default = app;
