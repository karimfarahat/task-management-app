import { Types } from "mongoose";

export type UserSchema = {
  _id?: Types.ObjectId;
  username: string;
  password: string;
};

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}
