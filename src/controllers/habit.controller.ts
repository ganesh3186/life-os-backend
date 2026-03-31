import { Request, Response } from "express";
import * as habitService from "../services/habit.service";

export const createHabit = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const habit = await habitService.createHabit({
      ...req.body,
      userId,
    });

    res.status(201).json({
      success: true,
      data: habit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create habit",
    });
  }
};

export const getHabits = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const habits = await habitService.getHabits(userId);

    res.json({
      success: true,
      data: habits,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      success: false,
      message: "Failed to get habits",
    });
  }
};

export const updateHabit = async (req: Request, res: Response) => {
  try {
    const habit = await habitService.updateHabit(
      req.params.id as string,
      req.body,
    );

    res.json({
      success: true,
      data: habit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update habit",
    });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    await habitService.deleteHabit(req.params.id as string);

    res.json({
      success: true,
      message: "Habit deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
