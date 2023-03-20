import * as React from "react";
import "./portfolio.css";

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
    photoUrl: JohnImg,
    customer: "John Doe",
    customerTask: "Lorem ipsum dolor sit amet.",
    customerSince: "01/02/2023",
    customerStage: "Contract",
    location: "Lorem ipsum",
    website: "www.lorem.com",
  },
  {
    id: 2,
    photoUrl: MariahImg,
    customer: "Mariah Betts",
    customerTask: "Lorem ipsum dolor sit amet.",
    customerSince: "01/02/2023",
    customerStage: "Adoption",
    location: "Lorem ipsum",
    website: "www.lorem.com",
  },
  {
    id: 3,
    photoUrl: JohnImg,
    customer: "John Doe",
    customerTask: "Lorem ipsum dolor sit amet.",
    customerSince: "01/02/2023",
    customerStage: "Contract",
    location: "Lorem ipsum",
    website: "www.lorem.com",
  },
  {
    id: 4,
    photoUrl: MariahImg,
    customer: "Mariah Betts",
    customerTask: "Lorem ipsum dolor sit amet.",
    customerSince: "01/02/2023",
    customerStage: "Adoption",
    location: "Lorem ipsum",
    website: "www.lorem.com",
  },
  {
    id: 5,
    photoUrl: JohnImg,
    customer: "John Doe",
    customerTask: "Lorem ipsum dolor sit amet.",
    customerSince: "01/02/2023",
    customerStage: "Contract",
    location: "Lorem ipsum",
    website: "www.lorem.com",
  },
  {
    id: 6,
    photoUrl: MariahImg,
    customer: "Mariah Betts",
    customerTask: "Lorem ipsum dolor sit amet.",
    customerSince: "01/02/2023",
    customerStage: "Adoption",
    location: "Lorem ipsum",
    website: "www.lorem.com",
  },
  {
    id: 7,
    photoUrl: JohnImg,
    customer: "John Doe",
    customerTask: "Lorem ipsum dolor sit amet.",
    customerSince: "01/02/2023",
    customerStage: "Contract",
    location: "Lorem ipsum",
    website: "www.lorem.com",
  },
  {
    id: 8,
    photoUrl: MariahImg,
    customer: "Mariah Betts",
    customerTask: "Lorem ipsum dolor sit amet.",
    customerSince: "01/02/2023",
    customerStage: "Adoption",
    location: "Lorem ipsum",
    website: "www.lorem.com",
  },
  {
    id: 9,
    photoUrl: JohnImg,
    customer: "John Doe",
    customerTask: "Lorem ipsum dolor sit amet.",
    customerSince: "01/02/2023",
    customerStage: "Contract",
    location: "Lorem ipsum",
    website: "www.lorem.com",
  },
  {
    id: 10,
    photoUrl: MariahImg,
    customer: "Mariah Betts",
    customerTask: "Lorem ipsum dolor sit amet.",
    customerSince: "01/02/2023",
    customerStage: "Adoption",
    location: "Lorem ipsum",
    website: "www.lorem.com",
  },
];

const pages = [
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

const Portfolio = () => {
  const [page, setPage] = React.useState("");

  const handleChange = (event) => {
    setPage(event.target.value);
  };
  return (
  <Box className="portfolio">
      <TableContainer component={Paper} className="portfolioCout">
      <Box className="topHead">
        <Box>
          <Typography variant="h2">Portfolio</Typography>
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
      <Table aria-label="caption table" className="portfolioTable">
        <TableHead>
          <TableRow>
            <TableCell>
              ID <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Customer <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Customer Task <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Customer Since <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Customer Stage <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Location <img src={FilterImg} className="filterImg" />
            </TableCell>
            <TableCell>
              Website <img src={FilterImg} className="filterImg" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.clientName}>
              <TableCell>
                {item.id < 10 ? `0${item.id}` : item.id}
              </TableCell>
              <TableCell component="th" scope="row">
                <Box className="userprofile">
                  <span>
                    <img src={item.photoUrl} alt="img not found" />
                  </span>
                  {item.customer}
                </Box>
              </TableCell>
              <TableCell>{item.customerTask}</TableCell>
              <TableCell>{item.customerSince}</TableCell>
              <TableCell>{item.customerStage}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>
                <a href="#">{item.website}</a>
              </TableCell>
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
              {pages.map((option) => (
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
  </Box>
  );
};

export default Portfolio;
