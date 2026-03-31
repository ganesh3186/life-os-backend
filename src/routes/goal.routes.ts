import express from "express";
import protect from "../middlewares/auth.middleware";
import * as goalController from "../controllers/goal.controller";

const router = express.Router();

/* CREATE */
router.post("/", protect, goalController.addGoal);

/* GET ALL */
router.get("/", protect, goalController.getGoals);

/* 🔥 MAIN FEATURE → DAILY TOGGLE */
router.put("/:id/toggle", protect, goalController.toggleGoal);

/* EDIT GOAL (title, desc, category only) */
router.put("/:id", protect, goalController.updateGoal);

/* DELETE */
router.delete("/:id", protect, goalController.deleteGoal);

export default router;
