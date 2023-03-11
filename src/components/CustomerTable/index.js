import * as React from "react";
import "./CustomerTable.css";

// Mui imports
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
  PaginationItem,
} from "@mui/material";

import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
// images
import Img1 from "../../assets/Images/user.png";
import JohnImg from "../../assets/Images/john.png";
import MariahImg from "../../assets/Images/Mariah.png";
import FilterImg from "../../assets/icons/filter.svg";
import SearchImg from "../../assets/icons/search.svg";
import FilterMenuImg from "../../assets/icons/filterMenu.svg";

let data = [
  {
    id: 1,
    name: "John Doe",
    jobTitle: "John Doe",
    location: "John Doe",
    emailAddress: "John@doe.com",
  },
  {
    id: 2,
    name: "Mariah Betts",
    jobTitle: "Mariah Betts",
    location: "Mariah Betts",
    emailAddress: "Mariah@betts.com",
  },
  {
    id: 3,
    name: "John Doe",
    jobTitle: "John Doe",
    location: "John Doe",
    emailAddress: "John@doe.com",
  },
  {
    id: 4,
    name: "Mariah Betts",
    jobTitle: "Mariah Betts",
    location: "Mariah Betts",
    emailAddress: "Mariah@betts.com",
  },
];

const CustomerTable = ({allContacts}) => {
  return (
    <TableContainer component={Paper} className="customerTableCout">
      <Box className="topHead">
        <Box>
          <Typography variant="h2">Main Contacts</Typography>
        </Box>
      </Box>
      <Table aria-label="caption table" className="customerTable">
        <TableHead>
          <TableRow>
            <TableCell>
              S. No <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Name <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Job Title <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Location <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Email Address <img src={FilterImg} className="filterImg" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allContacts.map((item, index) => (
            <TableRow>
              <TableCell>{index + 1 < 10 ? `0${index + 1}` : index + 1}</TableCell>
              <TableCell component="th" scope="row">
                <Box className="userprofile">{item.name}</Box>
              </TableCell>
              <TableCell>{item.jobTitle}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.emailAddress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
