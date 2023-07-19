import React from "react";
import "./navbar.css";

// Mui imports
import {
  Typography,
  Box,
  List,
  ListItem,
  Menu,
  MenuItem,
  Fade,
  ListItemText,
  Tooltip,
  Button,
  Popover,
} from "@mui/material";

// Images and icons
import NotificationIcon from "../../assets/icons/notification.svg";
import HelpIcon from "../../assets/icons/help.svg";
import SettingIcon from "../../assets/icons/setting.svg";
import UserImg from "../../assets/Images/user.png";
import IImg from "../../assets/icons/i.svg";
import {useNavigate} from "react-router-dom";
import UserProfile from "../UserProfile";

const fakeNotifications = [
  { id: 1, message: "Lorem ipsum dolor sit amet." },
  { id: 2, message: "Lorem ipsum dolor sit amet." },
  { id: 3, message: "Lorem ipsum dolor sit amet." },
  { id: 4, message: "Lorem ipsum dolor sit amet." },
];

const Navbar = ({ activePage }) => {
  const navigate = useNavigate()
  const [anchorElPopover, setAnchorElPopover] = React.useState(null);
  // const {logout} = useAuth()
  const handleClickPopover = (event) => {
    setAnchorElPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorElPopover(null);
  };

  const openPopover = Boolean(anchorElPopover);
  const id = openPopover ? "simple-popover" : undefined;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login")
  };
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  return (
    <Box className="navbarHead">
      <nav className="navbar">
        <Typography variant="h1">
          {activePage === "Resources" || activePage === "Integrations" ? (
            <>
              {activePage} <img src={IImg} onClick={handleClickPopover} />
            </>
          ) : (
            activePage
          )}
        </Typography>
        <List className="navLinks">
          <ListItem disablePadding className="NotificationsHead">
            <Tooltip title="Notifications">
              <img
                src={NotificationIcon}
                alt="img not found"
                onClick={handleClick1}
                aria-controls={open1 ? "notifications" : undefined}
                aria-haspopup="true"
                aria-expanded={open1 ? "true" : undefined}
              />
            </Tooltip>
            <Menu
              anchorEl={anchorEl1}
              id="notifications"
              className="notifications"
              open={open1}
              onClose={handleClose1}
              onClick={handleClose1}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 4px 15px rgba(58, 96, 110, 0.15))",
                  transform: "translateX(30px)",
                  width: "402px",
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 10,
                    width: 32,
                    borderRadius: "4px",
                    height: 32,
                    bgcolor: "background.paper",
                    transform: "translateY(-5px) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box className="head">
                <Typography variant="h6">Notifications</Typography>
                <span>Mark all as read</span>
              </Box>
              {fakeNotifications.map((item) => (
                <MenuItem onClick={handleClose1}>{item.message}</MenuItem>
              ))}
              <Box sx={{ padding: "24px" }}>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  View All
                </Typography>
              </Box>
            </Menu>
          </ListItem>
          <ListItem disablePadding>
            <img src={SettingIcon} alt="img not found" />
          </ListItem>
          <ListItem disablePadding>
            <img src={HelpIcon} alt="img not found" />
          </ListItem>
          <ListItem disablePadding>
            <Box className="profileHead">
              <Box
                className="profileBox"
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <img src={UserImg} alt="" className="avatar" />
              </Box>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 4px 15px rgba(58, 96, 110, 0.15))",
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 10,
                      width: 32,
                      borderRadius: "4px",
                      height: 32,
                      bgcolor: "background.paper",
                      transform: "translateY(-5px) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClickOpen}>View Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </Box>
          </ListItem>
        </List>
        <Popover
          id={id}
          open={openPopover}
          anchorEl={anchorElPopover}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          className="navbarPopover"
        >
          <Typography sx={{ p: 2 }} className="navbarPopoverHeading">
            {activePage === "Resources"
              ? "Here you can store templates, copies of regularly used emails, important documents."
              : activePage === "Integrations"
              ? "Please filter for customer(s) to view related information."
              : null}
          </Typography>
        </Popover>
      </nav>
    <UserProfile open={open2} onClose={handleClose2}/>
    </Box>
  );
};

export default Navbar;
