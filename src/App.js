import React, { useState, useEffect } from "react";
import "./App.css";

// components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// Mui imports
import { Box } from "@mui/material";
import { useAuth } from "./Auth";

const App = () => {
  const [token, setToken] = useState();
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [user]);

  const [activePage, setActivePage] = useState("/upcomingItems");
  
  return (
    <>
      {token ? (
        <Box className="dashboard">
          <Box className="SidebarHead">
            <Sidebar setActivePage={setActivePage} />
          </Box>
          <Box className="ContentHead">
            <Navbar activePage={activePage} />
            <Box className="TabsContent">
              <Navigation activePage={activePage} />
            </Box>
          </Box>
        </Box>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default App;
