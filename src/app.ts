import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/auth.routes";
// import userRoutes from "./routes/user.routes";
import expenseRoutes from "./routes/expense.routes";
import goalsRoutes from "./routes/goal.routes";
import habitsRoutes from "./routes/habit.routes";
import insightsRouter from "./routes/insight.routes";
import { connectDB } from "./config/db";

const app = express();
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (
        origin === "http://localhost:5173" ||
        origin.includes(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/habits", habitsRoutes);
app.use("/api/insights", insightsRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Life OS API running" });
});

export default app;
