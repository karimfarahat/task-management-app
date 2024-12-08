"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.get = exports.getAll = void 0;
const tasks_model_1 = require("./tasks.model");
const getAll = async () => {
    return tasks_model_1.Tasks.find();
};
exports.getAll = getAll;
const get = async (id) => {
    return tasks_model_1.Tasks.findOne({ _id: id });
};
exports.get = get;
const create = async (data) => {
    return new tasks_model_1.Tasks(data).save();
};
exports.create = create;
const update = async (id, data) => {
    return tasks_model_1.Tasks.findOneAndUpdate({ _id: id }, data, { new: true });
};
exports.update = update;
const remove = async (id) => {
    return tasks_model_1.Tasks.findByIdAndDelete(id);
};
exports.remove = remove;
