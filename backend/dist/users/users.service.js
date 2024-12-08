"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const users_model_1 = require("./users.model");
const get = async (username) => {
    return users_model_1.Users.findOne({ username });
};
exports.get = get;
