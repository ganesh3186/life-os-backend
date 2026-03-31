import { Types } from "mongoose";

export interface IExpense {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;

  title: string;
  amount: number;
  category: string;
  note?: string;
  date: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateExpenseInput {
  title: string;
  amount: number;
  category: string;
  note?: string;
  date: Date;
}

export interface IUpdateExpenseInput {
  title?: string;
  amount?: number;
  category?: string;
  note?: string;
  date?: Date;
}
