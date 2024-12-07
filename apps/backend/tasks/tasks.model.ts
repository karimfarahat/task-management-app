import mongoose from "mongoose";
import { TaskSchema } from "./tasks.types";
import { taskSchema } from "./tasks.schema";

export const Tasks = mongoose.model<TaskSchema>("Tasks", taskSchema);
