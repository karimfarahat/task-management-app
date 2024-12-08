import { AuthPayload } from "@/types/tasks";
import { authClient, axiosClient } from "./axiosClient";

const path = "/users";

export const getUser = () => {
  return authClient
    .get(path)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error fetching this user`, err);
      throw err;
    });
};

export const login = (payload: AuthPayload) => {
  return axiosClient
    .post(`${path}/login`, payload)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error logging in`, err);
      throw err;
    });
};

export const register = (payload: AuthPayload) => {
  return axiosClient
    .post(`${path}/register`, payload)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error registering new account`, err);
      throw err;
    });
};
