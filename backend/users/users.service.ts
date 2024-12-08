import { Users } from "./users.model";

const get = async (username: string) => {
  return Users.findOne({ username });
};

export { get };
