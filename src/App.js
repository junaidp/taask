import React,{useState} from "react";
import "./App.css";

// components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";

// Mui imports
import { Box } from "@mui/material";

const App = () => {
  const [activePage, setActivePage] = useState(" ")
  return (
    <Box className="dashboard">
      <Box className="SidebarHead">
        <Sidebar setActivePage={setActivePage} />
      </Box>
      <Box className="ContentHead">
        <Navbar activePage={activePage} />
        <Box className="TabsContent">
          <Navigation />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
