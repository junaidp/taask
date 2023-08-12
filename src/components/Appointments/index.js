import React, { useState, useEffect } from "react";
import "./Appointments.css";

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
  // Pagination,
  // PaginationItem,
} from "@mui/material";

import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
// images
import FilterImg from "../../assets/icons/filter.svg";
import SearchImg from "../../assets/icons/search.svg";
import JohnImg from "../../assets/Images/john.png";
import MariahImg from "../../assets/Images/Mariah.png";

// components
import CustomPagination from "../../components/Pagination";
import moment from "moment";

const Appointments = ({ allMeetings }) => {
  const [page, setPage] = React.useState("");
  const [currentItems, setCurrentItems] = useState([]);

  const handleChange = (event) => {
    setPage(event.target.value);
  };

  return (
    <TableContainer
      component={Paper}
      className="TableContainer AppointmentsCout"
    >
      <Box className="topHead">
        <Box>
          <Typography variant="h2">Upcoming Appointments</Typography>
        </Box>
        <Box>
          <span>
            <img src={SearchImg} />
          </span>
        </Box>
      </Box>
      <Table aria-label="caption table" className="AppointmentsTable">
        <TableHead>
          <TableRow>
            <TableCell>
              Title <img src={FilterImg} className="filterImg" />
            </TableCell>

            <TableCell>
              Time <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Due Date <img src={FilterImg} className="filterImg" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems?.map((item, index) => (
            <TableRow>
              <TableCell component="th" scope="row">
                <Box className="userprofile">{item?.meetingName}</Box>
              </TableCell>
              <TableCell>{item?.time}</TableCell>
              <TableCell>{item?.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination
        data={allMeetings}
        count={allMeetings?.length}
        setCurrentItems={setCurrentItems}
        customInput={false}
        customSelect={false}
        buttons={true}
        addbutton={true}
      />
    </TableContainer>
  );
};

export default Appointments;
