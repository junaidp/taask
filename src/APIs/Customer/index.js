import axios from "axios";
import Service from "../Service";

const CustomerServices = {
  getAllTasks: async () => {
    try {
      return await Service.get("/api/task/getAllTasks");
    } catch (error) {
      throw error;
    }
  },
  saveCustomer: async (data) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/customer/saveCustomer",
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  },
  getAllMettings: async () => {
    try {
      return await Service.get("/api/meeting/getAllMeetings");
    } catch (error) {
      throw error;
    }
  },
  getAllContacts: async () => {
    try {
      return await Service.get("/api/contacts/getAllContacts");
    } catch (error) {
      throw error;
    }
  },
  getSnapShot: async () => {
    try {
      return await Service.get(
        "/api/snapshot/getSnapShot?userId=64130e12ba30110e1c2166c4"
      );
    } catch (error) {
      throw error;
    }
  },
  getAllCustomers: async () => {
    try {
      return await Service.get("/customer/list");
    } catch (error) {
      throw error;
    }
  },
  saveResources: async (data) => {
    try {
      return await Service.post({
        url: "/api/resources/saveResources",
        data,
        contentType: "multipart/form-data",
      });
    } catch (error) {
      throw error;
    }
  },
  saveLink: async (data) => {
    try {
      return await Service.post({
        url: "/api/resources/saveLink",
        data,
        contentType: "application/json",
      });
    } catch (error) {
      throw error;
    }
  },
  getResources: async (userId) => {
    try {
      return await Service.get(`api/resources/getResources?userId=${userId}`);
    } catch (error) {
      throw error;
    }
  },
  getLinks: async (userId) => {
    try {
      return await Service.get(`/api/resources/getLinks?userId=${userId}`);
    } catch (error) {
      throw error;
    }
  },
  saveTask: async (data) => {
    try {
      return await Service.post({
        url: "/api/task/saveTask",
        data,
        contentType: "multipart/form-data",
      });
    } catch (error) {
      throw error;
    }
  },
  getTasks: async (customerId) => {
    try {
      return await Service.get(`api/task/getTasks?customerId=${customerId}`);
    } catch (error) {
      throw error;
    }
  },
  getAllTasks: async () => {
    try {
      return await Service.get("api/task/getAllTasks");
    } catch (error) {
      throw error;
    }
  },
  getAllProjects: async () => {
    try {
      return await Service.get("/adHocProject");
    } catch (error) {
      throw error;
    }
  },
  saveProject: async (data) => {
    try {
      return await Service.post({
        url: "/adHocProject",
        data,
        contentType: "application/json",
      });
    } catch (error) {
      throw error;
    }
  },
  downloadFile: async (fileId) => {
    try {
      return await Service.get(`api/files/downloadFile?fileid=${fileId}`);
    } catch (error) {
      throw error;
    }
  },
};

export default CustomerServices;
