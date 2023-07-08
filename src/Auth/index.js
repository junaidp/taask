import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

import { Routes, Route, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();
const baseURL = process.env.REACT_APP_BASE_URL;
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const login = async (body) => {
    return axios
      .post(`${baseURL}/login`,{
        email:body.email,
        password:body.password
      })
      .then((res) => {
        debugger;
        if(typeof res.data == "string"){
          toast.error(res.data, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        else{
          toast.success("Login Sucessfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          const{token,...data} = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user",data);
          setUser(data);
          
          return res;

        }
        
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        throw error;
      });
  };
  const register = async (body) => {
    return axios
      .post(`${baseURL}/register`,{
        firstname:body.firstName,
        lastname:body.lastName,
        email:body.email,
        password:body.password
      })
      .then((res) => {
        debugger;
        if(typeof res.data == "string"){
          toast.error(res.data, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        else{
          toast.success("Register Sucessfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          window.location.href = "/"
          return res;

        }
        
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        throw error;
      });
  };
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const value = { user, login, logout, isLoading,register };
  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};
