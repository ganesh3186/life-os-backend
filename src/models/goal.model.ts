import mongoose, { Document } from "mongoose";

/* ✅ INTERFACE */
export interface IGoal extends Document {
  title: string;
  description?: string;
  category: string;
  completedDates: Date[];
  startDate: Date;
  userId: mongoose.Types.ObjectId;
}

/* ✅ SCHEMA */
const goalSchema = new mongoose.Schema<IGoal>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,

    category: {
      type: String,
      required: true,
      index: true,
    },

    completedDates: {
      type: [Date], // ✅ important
      default: [],
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IGoal>("Goal", goalSchema);
