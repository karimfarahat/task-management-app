import express, { Express } from "express";
import connectDB from "./config/db";
import { tasks } from "./tasks";
import cors from "cors";

const app: Express = express();

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/tasks", tasks);

export { app };
