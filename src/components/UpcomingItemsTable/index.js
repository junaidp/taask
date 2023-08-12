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
import { DataGrid } from "@mui/x-data-grid";

const UpcomingItemsTable = ({ tasksData }) => {
  console.log(tasksData);
  const [currentItems, setCurrentItems] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "customerName", flex: 1, headerName: "Client Name" },
    { field: "customerTask", flex: 1, headerName: "Task" },
    {
      field: "assignedDate",
      flex: 1,
      headerName: "Time",
      renderCell: (params) => (
        <div>{moment(params.value).format("DD/MM/YYYY hh:mm:ss ")}</div>
      ),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 180,
      renderCell: (params) => (
        <div>{moment(params.value).format("DD/MM/YYYY hh:mm:ss ")}</div>
      ),
    },
  ];
  return (
    <TableContainer component={Paper} className="UpcomingItemsCout">
      <Box className="topHead">
        <Box>
          <Typography variant="h2">Upcoming Due Dates</Typography>
        </Box>
        {/* <Box>
          <span>
            <img src={SearchImg} />
          </span>
          <span>
            <img src={FilterMenuImg} />
          </span>
        </Box> */}
      </Box>
      <DataGrid
        style={{ height: 450, width: "100%" }}
        autoHeight
        aria-label="caption table"
        className="UpcomingItemsTable"
        rows={tasksData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
              page: 1,
            },
          },
        }}
        pageSizeOptions={[5]}
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 5 },
        //   },
        // }}
        // pageSizeOptions={5}
      />
    </TableContainer>
  );
};

export default UpcomingItemsTable;
