import Habit from "../models/habit.model";

export const createHabit = async (data: any) => {
  return await Habit.create(data);
};

export const getHabits = async (userId: string) => {
  return await Habit.find({ userId }).sort({ createdAt: -1 });
};

export const updateHabit = async (id: string, data: any) => {
  return await Habit.findByIdAndUpdate(id, data, { new: true });
};

export const deleteHabit = async (id: string) => {
  return await Habit.findByIdAndDelete(id);
};
