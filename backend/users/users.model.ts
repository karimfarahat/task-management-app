import { UserSchema } from "./users.types";
import { userSchema } from "./users.schema";
import mongoose from "mongoose";

export const Users = mongoose.model<UserSchema>("Users", userSchema);
