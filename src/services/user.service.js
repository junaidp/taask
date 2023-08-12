import { api } from "./axios.service";
export async function getUserProfile() {
  return await api.post("/user/profile");
}

export async function updateProfile(formData) {
  return await api.post("/user/update", formData);
}
