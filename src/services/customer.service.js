import { api } from "./axios.service";

export async function saveCustomer(formData){
    return await api.post("/customer/saveCustomer", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }});
}

export async function updateCustomer(formData,userId){
  return await api.put("/customer/updateCustomer?userid="+userId, formData, {
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


export async function deleteCustomerBySerialNumber(userid){
  return await api.delete("/customer/DeleteCustomer?userid="+userid);
}
export async function addResources(userid,data){
  if(!userid)  return await api.post("/resources",data);
  return await api.post("/resources?customerId="+userid,data);
}
export async function deleteResource(userid,type){
  return await api.delete("/resources?resourceId="+userid+"&resourceType="+type);
}
export async function getResource(){
  return await api.get("/resources");
}
