import express from "express";
import * as tasksController from "./tasks.controller";

export const router = express.Router();

router.get("/", tasksController.getAll);

router.get("/:id", tasksController.get);

router.post("/", tasksController.create);

router.patch("/:id", tasksController.update);

router.delete("/:id", tasksController.remove);
