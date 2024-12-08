import mongoose from "mongoose";
import { TaskSchema } from "./tasks.types";

export const taskSchema = new mongoose.Schema<TaskSchema>({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "completed"],
  },
  description: {
    type: String,
    required: false,
  },
});
