import { CreateTaskPayload, UpdateTaskPayload } from "@/types/tasks";
import { authClient } from "./axiosClient";

const path = "/tasks";

export const getAll = () => {
  return authClient
    .get(path)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error fetching all tasks`, err);
      throw err;
    });
};

export const get = (id: string) => {
  return authClient
    .get(`${path}/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error fetching this task`, err);
      throw err;
    });
};

export const create = (payload: CreateTaskPayload) => {
  return authClient
    .post(path, payload)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error creating task`, err);
      throw err;
    });
};

export const update = ({ _id, ...payload }: UpdateTaskPayload) => {
  return authClient
    .patch(`${path}/${_id}`, payload)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error updatng task`, err);
      throw err;
    });
};

export const remove = (id: string) => {
  return authClient
    .delete(`${path}/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error deleting task`, err);
      throw err;
    });
};
