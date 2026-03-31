import express from "express";
import * as habitController from "../controllers/habit.controller";
import protect from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, habitController.createHabit);

router.get("/", protect, habitController.getHabits);

router.put("/:id", protect, habitController.updateHabit);

router.delete("/:id", protect, habitController.deleteHabit);

export default router;
