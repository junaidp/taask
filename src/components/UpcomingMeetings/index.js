import * as React from "react";
import "./UpcomingMeetings.css";

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
import FilterImg from "../../assets/icons/filter.svg";
import SearchImg from "../../assets/icons/search.svg";
import JohnImg from "../../assets/Images/john.png";
import MariahImg from "../../assets/Images/Mariah.png";

let data = [
  {
    photoUrl: JohnImg,
    clientName: "John Doe",
    dueDate: "01/02/2023",
  },
  {
    photoUrl: MariahImg,
    clientName: "Mariah Betts",
    dueDate: "01/02/2023",
  },
  {
    photoUrl: JohnImg,
    clientName: "John Doe",
    dueDate: "01/02/2023",
  },
];

const UpcomingMeetings = () => {
  const [page, setPage] = React.useState("");

  const handleChange = (event) => {
    setPage(event.target.value);
  };
  return (
    <TableContainer
      component={Paper}
      className="TableContainer upComingMeetings"
    >
      <Box className="topHead">
        <Box>
          <Typography variant="h2">Upcoming Meetings</Typography>
        </Box>
        <Box>
          <span>
            <img src={SearchImg} />
          </span>
        </Box>
      </Box>
      <Table aria-label="caption table" className="upComingMeetingsTable">
        <TableHead>
          <TableRow>
            <TableCell>
              Client Name <img src={FilterImg} className="filterImg" />
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
                  <span>
                    <img src={item.photoUrl} alt="img not found" />
                  </span>
                  {item.clientName}
                </Box>
              </TableCell>
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

export default UpcomingMeetings;
