import { Response } from "express";
import * as goalService from "../services/goal.service";
import { AuthRequest } from "../middlewares/auth.middleware";

/* CREATE */
export const addGoal = async (req: AuthRequest, res: Response) => {
  try {
    const goal = await goalService.createGoal(req.body, req.userId!);

    res.json({
      success: true,
      data: goal,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* GET ALL */
export const getGoals = async (req: AuthRequest, res: Response) => {
  try {
    const goals = await goalService.getGoals(req.userId!);

    res.json({
      success: true,
      data: goals,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* 🔥 TOGGLE (MAIN FEATURE) */
export const toggleGoal = async (req: AuthRequest, res: Response) => {
  try {
    const goal = await goalService.toggleGoal(
      req.params.id as string,
      req.userId!,
    );

    res.json({
      success: true,
      data: goal,
    });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

/* UPDATE (ONLY EDIT FIELDS) */
export const updateGoal = async (req: AuthRequest, res: Response) => {
  try {
    const goal = await goalService.updateGoal(
      req.params.id as string,
      req.userId!,
      req.body,
    );

    res.json({
      success: true,
      data: goal,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* DELETE (SAFE) */
export const deleteGoal = async (req: AuthRequest, res: Response) => {
  try {
    await goalService.deleteGoal(req.params.id as string);

    res.json({
      success: true,
      message: "Goal deleted",
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
