import express, { Express } from "express";
import connectDB from "./config/db";
import bodyParser from "body-parser";

const app: Express = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import { tasks } from "./tasks";

app.use("/tasks", tasks);

export { app };
