import { Users } from "./users.model";

const get = async (username: string) => {
  return Users.findOne({ username });
};

const getById = async (id: string) => {
  return Users.findById(id);
};

export { get, getById };
