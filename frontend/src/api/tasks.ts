import { CreateTaskPayload, UpdateTaskPayload } from "@/types/tasks";
import axiosClient from "./axiosClient";

const path = "/tasks";

export const getAll = () => {
  return axiosClient
    .get(path)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error fetching all tasks`, err);
      throw err;
    });
};

export const get = (id: string) => {
  return axiosClient
    .get(`${path}/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error fetching this task`, err);
      throw err;
    });
};

export const create = (payload: CreateTaskPayload) => {
  return axiosClient
    .post(path, payload)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error creating task`, err);
      throw err;
    });
};
export const update = ({ _id, ...payload }: UpdateTaskPayload) => {
  return axiosClient
    .patch(`${path}/${_id}`, payload)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error updatng task`, err);
      throw err;
    });
};

export const remove = (id: string) => {
  return axiosClient
    .delete(`${path}/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error deleting task`, err);
      throw err;
    });
};
