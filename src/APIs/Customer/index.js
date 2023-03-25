import Service from "../Service";

const CustomerServices = {
  getAllTasks: async () => {
    try {
      return await Service.get("/api/task/getAllTasks");
    } catch (error) {
      throw error;
    }
  },
  savecustomer: async (data) => {
    try {
      return await Service.post({
        url: "/api/customer/savecustomer",
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
      return await Service.get("/api/snapshot/getSnapShot?userId=64130e12ba30110e1c2166c4");
    } catch (error) {
      throw error;
    }
  },
};

export default CustomerServices;
