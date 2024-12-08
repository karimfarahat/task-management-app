"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "completed"],
    },
    description: {
        type: String,
        required: false,
    },
});
