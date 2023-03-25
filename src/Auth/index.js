import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";


const AuthContext = createContext();
const baseURL = process.env.REACT_APP_BASE_URL;
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const login = async (email, password) => {
    return axios
      .post(`${baseURL}api/login/loginUser?email=${email}&password=${password}`)
      .then((res) => {
        const token = res?.data?.id;
        localStorage.setItem("token", token);
        setUser(res?.data);
        return res;
      })
      .catch((error) => {
        throw error;
      });
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

  };

  const value = { user, login, logout, isLoading };
  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};
