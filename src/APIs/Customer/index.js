import Service from "../Service";

const CustomerServices = {
    getAllTasks : async () =>{
        try{
            return await Service.get(
                "/api/task/getAllTasks"
            );
        }catch(error){
            throw error;
        }
    },
    savecustomer : async (data) =>{
        try{
            return await Service.post({
                url : "/api/customer/savecustomer",
                data
            });
        }catch(error){
            throw error;
        }
    },

};

export default CustomerServices;