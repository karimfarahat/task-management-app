import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Users } from "./users.model";
import * as usersService from "./users.service";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user = await usersService.getById(req.userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    res.json({ username: user?.username, userId: user?._id });
  } catch (err: any) {
    console.error(`Error while getting the user`, err.message);
    next(err);
  }
}

async function register(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const existingUser = await usersService.get(username);
    if (existingUser) {
      res.status(400).json({ error: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({ username, password: hashedPassword });

    await user.save();

    console.log("User registered successfully:", user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: error.message || "Registration failed" });
  }
}

async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(403).json({ error: "Forbidden" });
    }

    const user = await usersService.get(username);
    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      user?.password as string
    );
    if (!passwordMatch) {
      res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user?._id.toString() }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
}

export { register, login, get };
