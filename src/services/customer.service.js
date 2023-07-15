import { api } from "./axios.service";

export async function saveCustomer(formData){
    return await api.post("/customer/saveCustomer", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }});
}
export async function getAllCustomer(){
    return await api.get("/customer/list");
}

export async function getCustomerBySerialNumber(serialNumber){
  return await api.get("/customer/getCustomer?userid="+serialNumber);
}
