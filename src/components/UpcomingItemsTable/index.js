import * as React from "react";
import "./styles.css";

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

import moment from "moment"

let data = [
  {
    id: 1,
    photoUrl: JohnImg,
    clientName: "John Doe",
    task: "Lorem ipsum dolor sit amet.",
    time: "09:30 PM",
    dueDate: "01/02/2023",
  },
  {
    id: 2,
    photoUrl: MariahImg,
    clientName: "Mariah Betts",
    task: "Lorem ipsum dolor sit amet.",
    time: "12:39 AM",
    dueDate: "01/02/2023",
  },
  {
    id: 3,
    photoUrl: JohnImg,
    clientName: "John Doe",
    task: "Lorem ipsum dolor sit amet.",
    time: "09:30 PM",
    dueDate: "01/02/2023",
  },
  {
    id: 4,
    photoUrl: MariahImg,
    clientName: "Mariah Betts",
    task: "Lorem ipsum dolor sit amet.",
    time: "12:39 AM",
    dueDate: "01/02/2023",
  },
  {
    id: 5,
    photoUrl: JohnImg,
    clientName: "John Doe",
    task: "Lorem ipsum dolor sit amet.",
    time: "09:30 PM",
    dueDate: "01/02/2023",
  },
  {
    id: 6,
    photoUrl: MariahImg,
    clientName: "Mariah Betts",
    task: "Lorem ipsum dolor sit amet.",
    time: "12:39 AM",
    dueDate: "01/02/2023",
  },
  {
    id: 7,
    photoUrl: JohnImg,
    clientName: "John Doe",
    task: "Lorem ipsum dolor sit amet.",
    time: "09:30 PM",
    dueDate: "01/02/2023",
  },
  {
    id: 8,
    photoUrl: MariahImg,
    clientName: "Mariah Betts",
    task: "Lorem ipsum dolor sit amet.",
    time: "12:39 AM",
    dueDate: "01/02/2023",
  },
  {
    id: 9,
    photoUrl: JohnImg,
    clientName: "John Doe",
    task: "Lorem ipsum dolor sit amet.",
    time: "09:30 PM",
    dueDate: "01/02/2023",
  },
  {
    id: 10,
    photoUrl: MariahImg,
    clientName: "Mariah Betts",
    task: "Lorem ipsum dolor sit amet.",
    time: "12:39 AM",
    dueDate: "01/02/2023",
  },
 
];

const currencies = [
  {
    value: "1page",
    label: "1 page",
  },
  {
    value: "2page",
    label: "2 page",
  },
  {
    value: "3page",
    label: "3 page",
  },
  {
    value: "4page",
    label: "4 page",
  },
];

const UpcomingItemsTable = ({tasksData}) => {
  const [page, setPage] = React.useState("");

  const handleChange = (event) => {
    setPage(event.target.value);
  };

  return (
    <TableContainer component={Paper} className="UpcomingItemsCout">
      <Box className="topHead">
        <Box>
          <Typography variant="h2">Upcoming Due Dates</Typography>
        </Box>
        <Box>
          <span>
            <img src={SearchImg} />
          </span>
          <span>
            <img src={FilterMenuImg} />
          </span>
        </Box>
      </Box>
      <Table aria-label="caption table" className="UpcomingItemsTable">
        <TableHead>
          <TableRow>
            <TableCell>
              ID <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Client Name <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Task <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Time <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell align="right">
              Due Date <img src={FilterImg} className="filterImg" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasksData.map((item, index) => (
            <TableRow key={item.clientName}>
              <TableCell sx={{width: 70}}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</TableCell>
              <TableCell component="th" scope="row">
                <Box className="userprofile">
                  {/* <span>
                    <img src={item.photoUrl} alt="img not found" />
                  </span> */}
                  {item.customer.name}
                </Box>
              </TableCell>
              <TableCell>{item.taskName}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell align="right">{moment(item.dueDate).format("DD/MM/YYYY")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box className="tableFooter">
        <Box className="entries">
          <span>Showing 1 to 10 of 9,225 entries</span>
        </Box>
        <Box className="PaginationHead">
          <Box className="paginationBox">
            <Pagination
              count={10}
              siblingCount={0}
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
          <Box
            className="selectPageBox"
            component="form"
            sx={{
              "& .MuiTextField-root": { width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-select-currency"
              select
              defaultValue="1page"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box className="GotoBox">
            <FormGroup>
              <label htmlFor="page" className="label">
                go to
              </label>
              <TextField variant="outlined" id="page" />
            </FormGroup>
          </Box>
        </Box>
      </Box>
    </TableContainer>
  );
};

export default UpcomingItemsTable;
