import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";

// Mui imports
import {
  Box,
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// icons
import Logo from "../../assets/icons/logo.svg";
import HomeIcon from "../../assets/icons/home.svg";
import CustomerIcon from "../../assets/icons/Customer.svg";
import PortfolioIcon from "../../assets/icons/Portfolio.svg";
import LifecycleIcon from "../../assets/icons/Lifecycle.svg";
import ProjectsIcon from "../../assets/icons/Projects.svg";
import ResourcesIcon from "../../assets/icons/Resources.svg";
import ReportingIcon from "../../assets/icons/Reporting.svg";
import CustomerTasks from "../../assets/icons/Customer Tasks.svg";
import Snapshots from "../../assets/icons/Snapshots.svg";

const Sidebar = ({ setActivePage }) => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(getActiveIndex());

  function getActiveIndex() {
    const paths = [
      "/",
      "/Customer",
      "/lifecycle",
      "/Customer Tasks",
      "/Projects",
      "/Resources",
      "/Snapshots",
    ];
    const index = paths.indexOf(location.pathname);
    return index === -1 ? 0 : index;
  }
  useEffect(() => {
    const activeIndexFromStorage = localStorage.getItem("activeIndex");
    if (activeIndexFromStorage !== null) {
      setActiveIndex(parseInt(activeIndexFromStorage));
    }
  }, []);
  const addActiveClass = (index) => {
    setActiveIndex(index);
    localStorage.setItem("activeIndex", index);
    setActivePage(
      index == 0
        ? "Upcoming Items"
        : index == 1
        ? "Customer"
        : index === 2
        ? "Portfolio"
        : index === 3
        ? "Customer Tasks"
        : index === 4
        ? "Projects"
        : index === 5
        ? "Resources"
        : index === 6
        ? "Snapshots"
        : "UpcomingItemsTable"
    );
  };
  return (
    <Box className="sidebar">
      <a href="#">
        <img src={Logo} alt="img not found" />
      </a>
      <List>
        <Link to="/">
          <ListItem disablePadding>
            <ListItemButton
              variant="soft"
              className={activeIndex === 0 ? "active" : ""}
              onClick={() => addActiveClass(0)}
            >
              <ListItemIcon>
                <img src={HomeIcon} alt="Img not found" />
              </ListItemIcon>
              <ListItemText primary="Upcoming Items" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/customer">
          <ListItem disablePadding>
            <ListItemButton
              variant="soft"
              className={activeIndex === 1 ? "active" : ""}
              onClick={() => addActiveClass(1)}
            >
              <ListItemIcon>
                <img src={CustomerIcon} alt="Img not found" />
              </ListItemIcon>
              <ListItemText primary="Customer" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/portfolio">
          <ListItem disablePadding>
            <ListItemButton
              variant="soft"
              className={activeIndex === 2 ? "active" : ""}
              onClick={() => addActiveClass(2)}
            >
              <ListItemIcon>
                <img src={PortfolioIcon} alt="Img not found" />
              </ListItemIcon>
              <ListItemText primary="Portfolio" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/customerTasks">
          <ListItem disablePadding>
            <ListItemButton
              variant="soft"
              className={activeIndex === 3 ? "active" : ""}
              onClick={() => addActiveClass(3)}
            >
              <ListItemIcon>
                <img src={CustomerTasks} alt="Img not found" />
              </ListItemIcon>
              <ListItemText primary="Customer Tasks" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/project">
          <ListItem disablePadding>
            <ListItemButton
              variant="soft"
              className={activeIndex === 4 ? "active" : ""}
              onClick={() => addActiveClass(4)}
            >
              <ListItemIcon>
                <img src={ProjectsIcon} alt="Img not found" />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/resources">
          <ListItem disablePadding>
            <ListItemButton
              variant="soft"
              className={activeIndex === 5 ? "active" : ""}
              onClick={() => addActiveClass(5)}
            >
              <ListItemIcon>
                <img src={ResourcesIcon} alt="Img not found" />
              </ListItemIcon>
              <ListItemText primary="Resources" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/snapshots">
          <ListItem disablePadding>
            <ListItemButton
              variant="soft"
              className={activeIndex === 6 ? "active" : ""}
              onClick={() => addActiveClass(6)}
            >
              <ListItemIcon>
                <img src={Snapshots} alt="Img not found" />
              </ListItemIcon>
              <ListItemText primary="Snapshots" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default Sidebar;
