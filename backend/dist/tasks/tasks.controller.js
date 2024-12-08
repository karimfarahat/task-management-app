"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.get = get;
exports.create = create;
exports.update = update;
exports.remove = remove;
const tasksService = __importStar(require("./tasks.service"));
async function getAll(req, res, next) {
    try {
        const tasks = await tasksService.getAll();
        if (!tasks) {
            res.status(404).json({ error: "No tasks found" });
        }
        res.json(tasks);
    }
    catch (err) {
        console.error(`Error while getting all tasks`, err.message);
        next(err);
    }
}
async function get(req, res, next) {
    try {
        const task = await tasksService.get(req.params.id);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    }
    catch (err) {
        console.error(`Error while getting the task`, err.message);
        next(err);
    }
}
async function create(req, res, next) {
    try {
        const { title, description } = req.body;
        const validFields = ["title", "description"];
        const invalidFields = Object.keys(req.body).filter((key) => !validFields.includes(key));
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
        };
        const newTask = await tasksService.create(newTaskData);
        res.status(201).json(newTask);
    }
    catch (err) {
        console.error(`Error while creating the task`, err.message);
        next(err);
    }
}
async function update(req, res, next) {
    try {
        const validFields = ["title", "status", "description"];
        const invalidFields = Object.keys(req.body).filter((key) => !validFields.includes(key));
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
    }
    catch (err) {
        console.error(`Error while updating the task`, err.message);
        next(err);
    }
}
async function remove(req, res, next) {
    try {
        const deletedTask = await tasksService.remove(req.params.id);
        if (!deletedTask) {
            res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    }
    catch (err) {
        console.error(`Error while deleting the task`, err.message);
        next(err);
    }
}
