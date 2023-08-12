import { api } from "./axios.service";
export async function getAllTask() {
  return await api.get("/api/task/getAllTasks");
}

export async function saveTask(formData) {
  return await api.post("/customerTask", formData);
}
export async function getTask() {
  return await api.get("/customerTask?page=0&size=10");
}
