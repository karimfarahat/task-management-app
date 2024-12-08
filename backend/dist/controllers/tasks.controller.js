"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const tasks_model_1 = require("../tasks/tasks.model");
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield tasks_model_1.Tasks.findById(id);
    res.status(200).json({
        id: task === null || task === void 0 ? void 0 : task.id,
        title: task === null || task === void 0 ? void 0 : task.title,
        description: task === null || task === void 0 ? void 0 : task.description,
        status: task === null || task === void 0 ? void 0 : task.status,
    });
});
exports.get = get;
