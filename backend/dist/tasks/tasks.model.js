"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tasks_schema_1 = require("./tasks.schema");
exports.Tasks = mongoose_1.default.model("Tasks", tasks_schema_1.taskSchema);
