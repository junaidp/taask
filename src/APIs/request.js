import axios from "axios";
import { toast } from "react-toastify";
/**
 * Create an Axios Client with defaults
 */

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

client.interceptors.request.use((req) => {
  let token = localStorage.getItem('token')
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

/**
 * Request Wrapper with default success/error actions
 */
const request = (options) => {
  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    if (error.response) {
      debugger;
      if (error.response.status === 401) {
        // Router.push(redirectTo);
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
    }
    // toast.error(error.response || error.message, {
    //   position: toast.POSITION.TOP_RIGHT,
    // });

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;