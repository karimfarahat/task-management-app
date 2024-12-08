"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const users_schema_1 = require("./users.schema");
const mongoose_1 = __importDefault(require("mongoose"));
exports.Users = mongoose_1.default.model("Users", users_schema_1.userSchema);
