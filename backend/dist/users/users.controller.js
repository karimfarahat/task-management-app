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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.get = get;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_model_1 = require("./users.model");
const usersService = __importStar(require("./users.service"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
async function get(req, res, next) {
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
    }
    catch (err) {
        console.error(`Error while getting the user`, err.message);
        next(err);
    }
}
async function register(req, res) {
    try {
        const { username, password } = req.body;
        const existingUser = await usersService.get(username);
        if (existingUser) {
            res.status(400).json({ error: "Username already taken" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new users_model_1.Users({ username, password: hashedPassword });
        await user.save();
        console.log("User registered successfully:", user);
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: error.message || "Registration failed" });
    }
}
async function login(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(403).json({ error: "Forbidden" });
        }
        const user = await usersService.get(username);
        if (!user) {
            res.status(401).json({ error: "Authentication failed" });
        }
        const passwordMatch = await bcryptjs_1.default.compare(password, user?.password);
        if (!passwordMatch) {
            res.status(401).json({ error: "Authentication failed" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user?._id.toString() }, JWT_SECRET, {
            expiresIn: "2h",
        });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed" });
    }
}
