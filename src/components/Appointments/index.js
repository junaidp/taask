import * as React from "react";
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
  Pagination,
  PaginationItem,
} from "@mui/material";

import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
// images
import FilterImg from "../../assets/icons/filter.svg";
import SearchImg from "../../assets/icons/search.svg";
import JohnImg from "../../assets/Images/john.png";
import MariahImg from "../../assets/Images/Mariah.png";

let data = [
  {
    title: "John Doe",
    time: '09:30 PM',
    dueDate: "01/02/2023",
  },
  {
    title: "Mariah Betts",
    time: '12:39 AM',
    dueDate: "01/02/2023",
  },
  {
    title: "John Doe",
    time: '09:30 PM',
    dueDate: "01/02/2023",
  },
  {
    title: "Mariah Betts",
    time: '12:39 AM',
    dueDate: "01/02/2023",
  },
 
];

const Appointments = () => {
  const [page, setPage] = React.useState("");

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
          {data.map((item) => (
            <TableRow key={item.clientName}>
              <TableCell component="th" scope="row">
                <Box className="userprofile">
                  {item.title}
                </Box>
              </TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box className="tableFooter">
        <Box className="entries">
          <span>Showing 1 to 03 of 50 entries</span>
        </Box>
        <Box className="PaginationHead">
          <Box className="paginationBox">
            <Pagination
              count={5}
              siblingCount={-1}
              variant="outlined"
              shape="rounded"
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: ArrowLeftRoundedIcon,
                    next: ArrowRightRoundedIcon,
                  }}
                  {...item}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
    </TableContainer>
  );
};

export default Appointments;
