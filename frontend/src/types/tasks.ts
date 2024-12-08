export type Task = {
  _id?: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
};

export type UpdateTaskPayload = {
  _id: string;
  title?: string;
  description?: string;
  status?: "pending" | "completed";
};

export type CreateTaskPayload = {
  title: string;
  description?: string;
};

export type AuthPayload = {
  username: string;
  password: string;
};
