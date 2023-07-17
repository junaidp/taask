import React, { useState } from "react";
import "./Integrations.css";
// Mui imports
import {
  Box,
  Typography,
  TextField,
  FormGroup,
  Grid,
  Avatar,
} from "@mui/material";

import IntegrationsCard from "./card";
// images
import JohnImg from "../../assets/Images/john.png";
import MariahImg from "../../assets/Images/Mariah.png";
import SearchImg from "../../assets/icons/search.svg";
import FilterMenuImg from "../../assets/icons/filterMenu.svg";
import ZendeskImg from "../../assets/Images/Zendesk.png";
import SalesforceImg from "../../assets/Images/Salesforce.png";
import XeroImg from "../../assets/Images/Xero.png";
import PowerBiImg from "../../assets/Images/Power-Bi.png";
import MicrosoftOutlookImg from "../../assets/Images/Microsoft-Outlook.png";
import NetsuiteImg from "../../assets/Images/Netsuite.png";
import TableauImg from "../../assets/Images/Tableau.png";
import CalendlyImg from "../../assets/Images/Calendly.png";
import AddMoreImg from "../../assets/Images/addMore.png";
// *************
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
// **********
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const customers = [
  {
    id: 1,
    PhotoUrl: MariahImg,
    customerName: "Mariah Betts",
  },
  {
    id: 2,
    PhotoUrl: JohnImg,
    customerName: "John Doe",
  },
  {
    id: 3,
    PhotoUrl: MariahImg,
    customerName: "Mariah Betts",
  },
  {
    id: 4,
    PhotoUrl: JohnImg,
    customerName: "John Doe",
  },
];
const Integrations = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [selectedFields, setSelectedFields] = useState([]);
  const [newTaskCustomers, setNewTaskCustomers] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    if (event.target.checked === true) {
      const allIDs = filteredCustomers?.map((item) => {
        return item?.id;
      });
      setNewTaskCustomers(allIDs);
    } else {
      setNewTaskCustomers([]);
    }
  };
  const handleSelectCustomer = (e, id) => {
    if (e.target.checked === true) {
      setNewTaskCustomers((oldState) => [...oldState, id]);
    } else {
      // setSelectedFields([])
      const newIds = newTaskCustomers.filter((item) => {
        if (item !== id) {
          return item;
        }
      });

      setNewTaskCustomers(newIds);
    }
  };


  const handleFilterChange = (event) => {
    const { value } = event.target;
    if (!value) {
      setFilteredCustomers(customers);
      return;
    }
    const filtered = customers.filter((customer) =>
      customer.customerName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  return (
    <Box className="integrations">
      <Box className="topHead">
        <Box>
          {/* <span>
            <img src={IImg} alt="not found" />
          </span> */}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormGroup>
            <TextField variant="outlined" placeholder="Search" />
          </FormGroup>
          <span>
            <img src={SearchImg} alt="not found" />
          </span>
          <span>
            <img
              src={FilterMenuImg}
              alt="not found"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
          </span>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={3} xs={12}>
          <Grid xs={12} md={6} lg={4} xl={3} item>
            <IntegrationsCard ImgUrl={ZendeskImg} title="Zendesk" />
          </Grid>
          <Grid xs={12} md={6} lg={4} xl={3} item>
            <IntegrationsCard ImgUrl={SalesforceImg} title="Salesforce" />
          </Grid>
          <Grid xs={12} md={6} lg={4} xl={3} item>
            <IntegrationsCard ImgUrl={XeroImg} title="Xero" />
          </Grid>
          <Grid xs={12} md={6} lg={4} xl={3} item>
            <IntegrationsCard ImgUrl={PowerBiImg} title="Power Bi" />
          </Grid>
          <Grid xs={12} md={6} lg={4} xl={3} item>
            <IntegrationsCard
              ImgUrl={MicrosoftOutlookImg}
              title="Microsoft Outlook"
            />
          </Grid>
          <Grid xs={12} md={6} lg={4} xl={3} item>
            <IntegrationsCard ImgUrl={NetsuiteImg} title="Netsuite" />
          </Grid>
          <Grid xs={12} md={6} lg={4} xl={3} item>
            <IntegrationsCard ImgUrl={TableauImg} title="Tableau" />
          </Grid>
          <Grid xs={6} md={3} item>
            <IntegrationsCard ImgUrl={CalendlyImg} title="Calendly" />
          </Grid>
          <Grid xs={6} md={3} item>
            <IntegrationsCard ImgUrl={AddMoreImg} title="Add more" />
          </Grid>
        </Grid>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className="selectCustomerMenu"
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 4px 15px rgba(58, 96, 110, 0.15))",
            width: "300px",
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
        <h3>Select Customer(s)</h3>
        <TextField variant="outlined" fullWidth onChange={handleFilterChange} />
        <FormControl sx={{ width: 300 }} className="selectCustomer">
          <MenuItem value={"selectAll"}>
            <Checkbox
              checked={newTaskCustomers?.length === filteredCustomers?.length}
              onChange={handleSelectAll}
            />
            <ListItemText primary={"Select All"} />
          </MenuItem>
          {filteredCustomers.map((user) => (
            <MenuItem value={user.customerName}>
              <Checkbox
                checked={newTaskCustomers?.includes(user?.id)}
                onChange={(e) => handleSelectCustomer(e, user?.id)}
              />
              <Avatar
                src={user.PhotoUrl}
                alt={user.PhotoUrl}
                className="avatar"
              />
              <ListItemText primary={user.customerName} />
            </MenuItem>
          ))}
        </FormControl>
      </Menu>
    </Box>
  );
};

export default Integrations;
