import express from "express";
import * as usersController from "./users.controller";
import verifyToken from "../middleware/authMiddleware";

export const router = express.Router();

router.post("/register", usersController.register);

router.post("/login", usersController.login);

router.get("/", verifyToken, usersController.get);

export default router;
