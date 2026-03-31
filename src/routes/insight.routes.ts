import express from "express";
import protect from "../middlewares/auth.middleware";
import { getInsightsController } from "../controllers/insight.controller";

const router = express.Router();

router.get("/", protect, getInsightsController);

export default router;
