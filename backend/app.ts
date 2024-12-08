import express, { Express } from "express";
import connectDB from "./config/db";
import { tasks } from "./tasks";
import cors from "cors";
import { users } from "./users";

const app: Express = express();

connectDB();

app.use(express.json());

app.use(cors());

app.use("/tasks", tasks);
app.use("/users", users);

export { app };
