import Goal from "../models/goal.model";

export const getInsights = async (userId: string, type: string = "monthly") => {
  const goals = await Goal.find({ userId });

  const now = new Date();

  /* ---------------- DATE RANGE ---------------- */

  let startDate = new Date();
  let endDate = new Date();

  if (type === "weekly") {
    startDate.setDate(now.getDate() - 7);
  } else if (type === "monthly") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  } else {
    startDate = new Date(0); // overall
  }

  endDate = new Date();

  /* ---------------- COLLECT DATA ---------------- */

  let totalCompletions = 0;
  let dailyMap: Record<string, number> = {};
  let categoryStats: Record<string, number> = {};
  let goalCountMap: Record<string, number> = {};

  goals.forEach((goal) => {
    const dates = goal.completedDates || [];

    dates.forEach((d: Date) => {
      const date = new Date(d);

      if (date >= startDate && date <= endDate) {
        totalCompletions++;

        const key = date.toISOString().split("T")[0];

        /* daily stats */
        dailyMap[key] = (dailyMap[key] || 0) + 1;

        /* category stats */
        categoryStats[goal.category] = (categoryStats[goal.category] || 0) + 1;

        /* top goal */
        goalCountMap[goal.title] = (goalCountMap[goal.title] || 0) + 1;
      }
    });
  });

  /* ---------------- DAILY ARRAY ---------------- */

  const dailyStats = Object.keys(dailyMap).map((date) => ({
    date,
    count: dailyMap[date],
  }));

  /* ---------------- ACTIVE DAYS ---------------- */

  const activeDays = Object.keys(dailyMap).length;

  const totalDays =
    Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1;

  const missedDays = totalDays - activeDays;

  /* ---------------- COMPLETION RATE ---------------- */

  const totalPossible = goals.length * totalDays;

  const completionRate =
    totalPossible === 0
      ? 0
      : Math.round((totalCompletions / totalPossible) * 100);

  /* ---------------- TOP GOAL ---------------- */

  let topGoal = { title: "", count: 0 };

  for (let key in goalCountMap) {
    if (goalCountMap[key] > topGoal.count) {
      topGoal = { title: key, count: goalCountMap[key] };
    }
  }

  /* ---------------- STREAK ---------------- */

  const allDates: Date[] = [];

  goals.forEach((g) => {
    g.completedDates.forEach((d: Date) => {
      const date = new Date(d);
      if (date >= startDate && date <= endDate) {
        allDates.push(date);
      }
    });
  });

  const uniqueDates = Array.from(
    new Set(allDates.map((d) => new Date(d).toDateString())),
  ).map((d) => new Date(d));

  uniqueDates.sort((a, b) => b.getTime() - a.getTime());

  let currentStreak = 0;
  let bestStreak = 0;

  let tempStreak = 0;
  let prevDate: Date | null = null;

  uniqueDates.forEach((date, i) => {
    const current = new Date(date);
    current.setHours(0, 0, 0, 0);

    if (i === 0) {
      tempStreak = 1;
    } else {
      const prev = new Date(prevDate!);
      prev.setHours(0, 0, 0, 0);

      const diff = (prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    }

    bestStreak = Math.max(bestStreak, tempStreak);

    prevDate = current;
  });

  /* current streak (from today) */
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let date of uniqueDates) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    if (d.getTime() === today.getTime()) {
      currentStreak++;
      today.setDate(today.getDate() - 1);
    } else {
      break;
    }
  }

  /* ---------------- RESPONSE ---------------- */

  return {
    completionRate,
    totalCompletions,
    activeDays,
    missedDays,
    bestStreak,
    currentStreak,
    categoryStats,
    dailyStats,
    topGoal,
  };
};
