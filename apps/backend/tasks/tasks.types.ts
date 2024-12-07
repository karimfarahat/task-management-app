import { Types } from "mongoose";

export type TaskSchema = {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
  status: "pending" | "completed";
};
