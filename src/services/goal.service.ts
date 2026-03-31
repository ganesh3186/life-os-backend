import Goal from "../models/goal.model";

export const createGoal = async (data: any, userId: string) => {
  return await Goal.create({ ...data, userId });
};

export const getGoals = async (userId: string) => {
  return await Goal.find({ userId }).sort({ createdAt: -1 });
};

export const toggleGoal = async (id: string, userId: string) => {
  const goal = await Goal.findOne({ _id: id, userId });

  if (!goal) throw new Error("Goal not found");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const exists = goal.completedDates.some((d: Date) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
  });

  if (exists) {
    goal.completedDates = goal.completedDates.filter((d: Date) => {
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      return date.getTime() !== today.getTime();
    });
  } else {
    goal.completedDates.push(today);
  }

  await goal.save();
  return goal;
};

export const updateGoal = async (id: string, userId: string, data: any) => {
  return await Goal.findOneAndUpdate(
    { _id: id, userId },
    {
      title: data.title,
      description: data.description,
      category: data.category,
    },
    { new: true },
  );
};

export const deleteGoal = async (id: string) => {
  return await Goal.findByIdAndDelete(id);
};
