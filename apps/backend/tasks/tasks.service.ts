import { Tasks } from "./tasks.model";

const getAll = async () => {
  return Tasks.find();
};
const get = async (id: any) => {
  return Tasks.findOne({ _id: id });
};

const create = async (data: any) => {
  return new Tasks(data).save();
};

const update = async (id: any, data: any) => {
  return Tasks.findOneAndUpdate({ _id: id }, data, { new: true });
};

const remove = async (id: any) => {
  return Tasks.findByIdAndDelete(id);
};

export { getAll, get, create, update, remove };
