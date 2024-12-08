import express from "express";
import * as tasksController from "./tasks.controller";
import verifyToken from "../middleware/authMiddleware";

export const router = express.Router();

router.get("/", verifyToken, tasksController.getAll);

router.get("/:id", verifyToken, tasksController.get);

router.post("/", verifyToken, tasksController.create);

router.patch("/:id", verifyToken, tasksController.update);

router.delete("/:id", verifyToken, tasksController.remove);
