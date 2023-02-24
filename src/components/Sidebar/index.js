import React, { useState } from "react";
import "./sidebar.css";
import { Link ,useLocation} from "react-router-dom";

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
import HomeIcon from "../../assets/icons/home.svg";
import PortfolioIcon from "../../assets/icons/Portfolio.svg";
import LifecycleIcon from "../../assets/icons/Lifecycle.svg";
import ProjectsIcon from "../../assets/icons/Projects.svg";
import ResourcesIcon from "../../assets/icons/Resources.svg";
import ReportingIcon from "../../assets/icons/Reporting.svg";

const Sidebar = ({ setActivePage }) => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(getActiveIndex());

  function getActiveIndex() {
    const paths = ["/", "/portfolio", "/lifecycle", "/project", "/resources", "/reporting"];
    const index = paths.indexOf(location.pathname);
    return index === -1 ? 0 : index;
  }
  const addActiveClass = (index) => {
    setActiveIndex(index);
    setActivePage(
      index == 0
        ? "Home"
        : index == 1
        ? "Portfolio"
        : index === 2
        ? "Lifecycle"
        : index === 3
        ? "Projects"
        : index === 4
        ? "Resources"
        : index === 5
        ? "Reporting"
        : "Home"
    );
  };
  return (
    <Box className="sidebar">
      <a href="#">Traaak</a>
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
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/portfolio">
          <ListItem disablePadding>
            <ListItemButton
              variant="soft"
              className={activeIndex === 1 ? "active" : ""}
              onClick={() => addActiveClass(1)}
            >
              <ListItemIcon>
                <img src={PortfolioIcon} alt="Img not found" />
              </ListItemIcon>
              <ListItemText primary="Portfolio" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="lifecycle">
          <ListItem disablePadding>
            <ListItemButton
              variant="soft"
              className={activeIndex === 2 ? "active" : ""}
              onClick={() => addActiveClass(2)}
            >
              <ListItemIcon>
                <img src={LifecycleIcon} alt="Img not found" />
              </ListItemIcon>
              <ListItemText primary="Lifecycle" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="project">
          <ListItem disablePadding>
            <ListItemButton
              variant="soft"
              className={activeIndex === 3 ? "active" : ""}
              onClick={() => addActiveClass(3)}
            >
              <ListItemIcon>
                <img src={ProjectsIcon} alt="Img not found" />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="resources">
          <ListItem disablePadding>
            <ListItemButton
              variant="soft"
              className={activeIndex === 4 ? "active" : ""}
              onClick={() => addActiveClass(4)}
            >
              <ListItemIcon>
                <img src={ResourcesIcon} alt="Img not found" />
              </ListItemIcon>
              <ListItemText primary="Resources" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="reporting">
          <ListItem disablePadding>
            <ListItemButton
              variant="soft"
              className={activeIndex === 5 ? "active" : ""}
              onClick={() => addActiveClass(5)}
            >
              <ListItemIcon>
                <img src={ReportingIcon} alt="Img not found" />
              </ListItemIcon>
              <ListItemText primary="Reporting" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default Sidebar;
