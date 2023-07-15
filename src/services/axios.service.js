import axios from 'axios';
import { toast } from 'react-toastify';
// Create an instance of Axios
export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Add an interceptor for requests
api.interceptors.request.use(
  async (config) => {
    // Modify the request config here
    const token =  localStorage.getItem('token')
    debugger;
    if(token){
      config.headers['Authorization'] = 'Bearer '+ token;
    }
  
    return config;
  }
)
// Add an interceptor for responses
api.interceptors.response.use(
  async (response) => {
    // Do something with the response data
    return response;
  },
  async (error) => {
    if(error && error?.response?.status === 401){
      localStorage.clear();
      window.location.href = '/'
    }
    toast.error(`${error.message}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return Promise.reject(error);
  }
);






