import { api } from "./axios.service";

export async function saveCustomer(formData){
    return await api.post("/customer/saveCustomer", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }});
}