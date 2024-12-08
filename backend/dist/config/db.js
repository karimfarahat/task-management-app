"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connectDB() {
    const url = process.env.MONGODB_CONNECTION_STRING;
    try {
        mongoose_1.default.connect(url);
    }
    catch (err) {
        console.log(err.message);
        process.exit(1);
    }
    const dbConnection = mongoose_1.default.connection;
    dbConnection.once("open", () => {
        console.log(`Database connected: ${url}`);
    });
    dbConnection.on("error", (err) => {
        console.error(`Connection error: ${err}`);
    });
}
