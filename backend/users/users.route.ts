import express from "express";
import * as usersController from "./users.controller";

export const router = express.Router();
export default router;

router.post("/register", usersController.register);

router.post("/login", usersController.login);
