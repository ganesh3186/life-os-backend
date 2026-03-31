import mongoose, { Schema, Document } from "mongoose";

export interface IHabit extends Document {
  title: string;
  category: string;
  completed: boolean;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const HabitSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IHabit>("Habit", HabitSchema);
