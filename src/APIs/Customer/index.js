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
      return await Service.post({
        url: "/api/customer/saveCustomer",
        data,
      });
    } catch (error) {
      throw error;
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
      return await Service.get("/api/customer/getAllCustomers");
    } catch (error) {
      throw error;
    }
  },
  saveResources: async (data) => {
    try {
      return await Service.post({
        url: "/api/resources/saveResources",
        data,
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
  saveTask: async (data) => {
    try {
      return await Service.post({
        url: "/api/task/saveTask",
        data,
      });
    } catch (error) {
      throw error;
    }
  },
  getTasks: async (customerId) => {
    try {
      return await Service.get(`api/task/getTasks?userid=${customerId}`);
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
