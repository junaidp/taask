import React, { useState, useEffect } from "react";
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
} from "@mui/material";

// images
import JohnImg from "../../assets/Images/john.png";
import MariahImg from "../../assets/Images/Mariah.png";
import FilterImg from "../../assets/icons/filter.svg";
import SearchImg from "../../assets/icons/search.svg";
import FilterMenuImg from "../../assets/icons/filterMenu.svg";

// components
import CustomPagination from "../../components/Pagination";
import moment from "moment";

const UpcomingItemsTable = ({ tasksData }) => {
  const [currentItems, setCurrentItems] = useState([]);

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
          {currentItems.map((item, index) => (
            <TableRow key={item.clientName}>
              <TableCell sx={{ width: 70 }}>
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                <Box className="userprofile">
                  {/* <span>
                    <img src={item.photoUrl} alt="img not found" />
                  </span> */}
                  {item?.customer?.name}
                </Box>
              </TableCell>
              <TableCell>{item?.taskName}</TableCell>
              <TableCell>{item?.time}</TableCell>
              <TableCell align="right">{item?.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination
        data={tasksData}
        count={tasksData?.length}
        setCurrentItems={setCurrentItems}
        customInput={true}
        customSelect={true}
        paginationDetail={true}
        buttons={true}
      />
    </TableContainer>
  );
};

export default UpcomingItemsTable;
