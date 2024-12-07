// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { Tasks } from "./tasks/tasks.model";

// dotenv.config(); //momkn akoon 3ayzo

// const app = express();

// app.use(express.json());

// mongoose.connect(process.env.MONGODB_CONNECTION_STRING!);

// app.get("/tasks", (req, res) => {});

// // app.get("/tasks/:id", get);

// app.post("/tasks/create", async (req, res) => {
//   const { title } = req.body;
//   console.log("received title", title);

//   await Tasks.create({
//     title: title,
//     status: "",
//   });
//   res.status(200).json({
//     status: "success",
//   });
// });
// app.put("/tasks/update/:id", async (req, res) => {
//   const { title, description, status } = req.body;
//   if (typeof title !== "string" || typeof description !== "string") {
//     res.status(400).json({
//       code: "INVALID_REQUEST",
//       message: "Title and description should be strings",
//     });
//   }
//   const { id } = req.params;

//   await Tasks.findByIdAndUpdate(id, { title, description, status });
//   res.status(200).json({
//     status: "success",
//   });
// });

// app.get("/users", (req, res) => {
//   console.log("calling /users");
//   console.log(req);
// });
