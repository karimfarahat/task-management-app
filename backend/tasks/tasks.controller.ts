import { Request, Response, NextFunction } from "express";
import * as tasksService from "./tasks.service";

async function getAll(req: Request, res: Response, next: NextFunction) {
  const userId = req.userId;

  if (!userId) {
    res.status(401);
    return;
  }

  try {
    const tasks = await tasksService.getAll(userId);

    res.json(tasks);
  } catch (err: any) {
    console.error(`Error while getting all tasks`, err.message);
    next(err);
  }
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await tasksService.get(req.params.id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err: any) {
    console.error(`Error while getting the task`, err.message);
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description } = req.body;
    const userId = req.userId;

    const validFields = ["title", "description"];
    const invalidFields = Object.keys(req.body).filter(
      (key) => !validFields.includes(key)
    );

    if (invalidFields.length > 0) {
      res
        .status(400)
        .json({ error: `Invalid fields: ${invalidFields.join(", ")}` });
    }

    if (!title) {
      res.status(400).json({ error: "Title is required." });
    }

    const newTaskData = {
      title,
      description,
      userId,
    };

    const newTask = await tasksService.create(newTaskData);
    res.status(201).json(newTask);
  } catch (err: any) {
    console.error(`Error while creating the task`, err.message);
    next(err);
  }
}
async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const validFields = ["title", "status", "description"];
    const invalidFields = Object.keys(req.body).filter(
      (key) => !validFields.includes(key)
    );

    if (invalidFields.length > 0) {
      res
        .status(400)
        .json({ error: `Invalid fields: ${invalidFields.join(", ")}` });
    }

    const updatedTask = await tasksService.update(req.params.id, req.body);

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err: any) {
    console.error(`Error while updating the task`, err.message);
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const deletedTask = await tasksService.remove(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err: any) {
    console.error(`Error while deleting the task`, err.message);
    next(err);
  }
}

export { getAll, get, create, update, remove };
