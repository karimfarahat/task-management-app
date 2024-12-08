import mongoose from "mongoose";
import { UserSchema } from "./users.types";

export const userSchema = new mongoose.Schema<UserSchema>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
