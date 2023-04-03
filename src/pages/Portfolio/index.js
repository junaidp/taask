import React, { useState, useEffect } from "react";
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
  Pagination,
  MenuItem,
  FormGroup,
  TextField,
  PaginationItem,
} from "@mui/material";

import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
// images
import JohnImg from "../../assets/Images/john.png";
import MariahImg from "../../assets/Images/Mariah.png";
import FilterImg from "../../assets/icons/filter.svg";
import SearchImg from "../../assets/icons/search.svg";
import FilterMenuImg from "../../assets/icons/filterMenu.svg";
// component
import Loader from "../../components/Loader";
// APIs Services
import CustomerServices from "../../APIs/Customer";

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
  const [allCustomers, setAllCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState("");
  const handleChange = (event) => {
    setPage(event.target.value);
  };

  const getAllCustomers = async () => {
    await CustomerServices.getAllCustomers().then((res) => {
      if (res) {
        setAllCustomers(res);
        setLoading(false);
      }
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });;
  };
  console.log(allCustomers, "hello");
  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
    <Box className="portfolio">
      <TableContainer component={Paper} className="portfolioCout">
        <Box className="topHead">
          <Box>{/* <Typography variant="h2">Portfolio</Typography> */}</Box>
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
                Main Contact <img src={FilterImg} className="filterImg" />
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
            {allCustomers.map((item, index) => (
              <TableRow key={item.clientName}>
                <TableCell>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Box className="userprofile">
                    {/* <span>
                      <img src={item.photoUrl} alt="img not found" />
                    </span> */}
                    {item?.name}
                  </Box>
                </TableCell>
                <TableCell>{item?.contacts[0].name}</TableCell>
                <TableCell>{item?.customerSince}</TableCell>
                <TableCell>{item?.customerStage}</TableCell>
                <TableCell>{item?.location}</TableCell>
                <TableCell>
                  <a href="#">{item?.website}</a>
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
      <Loader loaderValue={loading} />
    </Box>
  );
};

export default Portfolio;
