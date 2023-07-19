import React, { useState, useEffect } from "react";
import "./portfolio.css";
import DeleteIcon from "@mui/icons-material/Delete";

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
  Skeleton,
  MenuItem,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";

// images
import FilterImg from "../../assets/icons/filter.svg";
import SearchImg from "../../assets/icons/search.svg";
import FilterMenuImg from "../../assets/icons/filterMenu.svg";
// component
import Loader from "../../components/Loader";
import CustomPagination from "../../components/Pagination";
import moment from "moment";
// APIs Services
import { useNavigate } from "react-router-dom";
import {
  deleteCustomerBySerialNumber,
  getAllCustomer,
} from "../../services/customer.service";
import { ToastContainer, toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

const Portfolio = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const deleteCustomer = async () => {
    try {
      setLoading(true);
      const { data: resp } = await deleteCustomerBySerialNumber(
        customer.id
      );
      setLoading(false);
      if (resp) {
        toast.success("Customer Deleted Sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        const index = allCustomers.findIndex((x)=>x.serialNumber==customer.id);
        allCustomers.splice(index, 1);
        setOpen(false);
      } else {
        toast.error("Something went wrong on deleting customer", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const getAllCustomers = async () => {
    setisLoading(true);
    await getAllCustomer()
      .then((res) => {
        if (res) {
          const data = res.data;
          console.log(data);
          setAllCustomers(data);
          setCount(data?.length);
          setisLoading(false);
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  useEffect(() => {
    try {
      getAllCustomers();
    } catch (error) {}
  }, []);
  const columns = [
    { field: "serialNumber", headerName: "ID", width: 100 ,renderCell: (params) => (
      <div onClick={() => navigate("/customer/" + params.value)}>{allCustomers.findIndex((x)=>x.serialNumber==params.value)+1}</div>
    )},
    { field: "name", headerName: "Customer", width: 180 ,renderCell: (params) => (
      <div onClick={() => navigate("/customer/" + params.id)}>{params.value}</div>
    )},
    { field: "contacts", headerName: "Main Contact", width: 180,renderCell: (params) => (
      <div onClick={() => navigate("/customer/" + params.id)}>{params.value?.name}</div>
    ), },
    {
      field: "customerSince",
      headerName: "Customer Since",
      width: 180,
      renderCell: (params) => (
        <div onClick={() => navigate("/customer/" + params.id)}>{moment(params.value).format("DD/MM/YYYY hh:mm:ss ")}</div>
      ),
    },
    { field: "customerStage", headerName: "Customer Stage", width: 180 ,renderCell: (params) => (
      <div onClick={() => navigate("/customer/" + params.id)}>{params.value}</div>
    )},
    { field: "location", headerName: "Location", width: 180,renderCell: (params) => (
      <div onClick={() => navigate("/customer/" + params.id)}>{params.value}</div>
    ) },
    { field: "website", headerName: "Website", width: 180,renderCell: (params) => (
      <div><a href={'https://'+params.value} target="_blank">{params.value}</a></div>
    ) },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      width: 80,
      renderCell: (row) => (
        // <React.Fragment className="actionHead">
          <MenuItem>
            <DeleteIcon
              sx={{ mr: 2 ,color:'red'}}
              onClick={() => {
                setOpen(true);
                console.log(row)
                setCustomer(row);
              }}
            />
          </MenuItem>
        // </React.Fragment>
      ),
      align: "right",
    },
  ];

  return (
    <Box>
      <Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this customer?
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions> */}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteCustomer} color="secondary" autoFocus>
            Delete
          </Button>
          {/* </DialogActions> */}
        </Dialog>
      </Box>
      <Box className="portfolio">
        <TableContainer component={Paper} className="portfolioCout">
         
          
          <DataGrid
            style={{ height: 450, width: "100%" }}
            autoHeight
            aria-label="caption table"
            className="UpcomingItemsTable"
            rows={allCustomers}
            columns={columns}
            getRowId={(row) => row.serialNumber}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            disableSelectionOnClick
          />
        </TableContainer>
        <ToastContainer />
        <Loader loaderValue={loading} />
      </Box>
    </Box>
  );
};

export default Portfolio;
