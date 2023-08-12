import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./layout.css";
export default function Layout() {
  return (
    <Box className="dashboard">
      <Box className="SidebarHead">
        <Sidebar />
      </Box>
      <Box className="ContentHead">
        <Navbar />
        <Box className="TabsContent">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
