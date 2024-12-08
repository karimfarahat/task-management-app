import express, { Express } from "express";
import connectDB from "./config/db";
import bodyParser from "body-parser";
import { tasks } from "./tasks";
import cors from "cors";

const app: Express = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests only from this origin
  })
);

app.use("/tasks", tasks);

export { app };
