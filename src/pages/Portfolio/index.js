import React, { useState, useEffect } from "react";
import "./portfolio.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { changeActiveIndex } from "../../features/slice";
import { useDispatch } from "react-redux";
// Mui imports
import {
  Box,
  TableContainer,
  Paper,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

// images
import SearchImg from "../../assets/icons/search.svg";
// component
import Loader from "../../components/Loader";
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
  let dispatch = useDispatch();
  const [allCustomers, setAllCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const filteredCustomers = allCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const deleteCustomer = async () => {
    try {
      setLoading(true);
      const { data: resp } = await deleteCustomerBySerialNumber(customer.id);
      setLoading(false);
      if (resp) {
        toast.success("Customer Deleted Sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        const index = allCustomers.findIndex(
          (x) => x.serialNumber == customer.id
        );
        // allCustomers.splice(index, 1);
        setOpen(false);
        // getAllCustomers();
      } else {
        toast.error("Something went wrong on deleting customer", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      setLoading(false);
    }
    setOpen(false);
    setOpen("");
    getAllCustomers();
  };

  function handleName(params) {
    dispatch(changeActiveIndex(1));
    navigate("/customer/" + params.id);
  }
  const columns = [
    {
      field: "serialNumber",
      headerName: "ID",
      width: 70,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/customer/" + params.value)}
        >
          {allCustomers.findIndex((x) => x.serialNumber === params.value) + 1}
        </div>
      ),
    },
    {
      field: "image",
      headerName: "Image",
      width: 70,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/customer/" + params.value)}
        >
          <img
            src={`data:${params.value.contentType};base64,${params.value.data}`}
            alt="img"
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          />
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Customer",
      flex: 1,
      renderCell: (params) => (
        <div style={{ cursor: "pointer" }} onClick={() => handleName(params)}>
          {params.value}
        </div>
      ),
    },
    {
      field: "contacts",
      headerName: "Main Contact",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/customer/" + params.id)}
        >
          {params.value?.name}
        </div>
      ),
    },
    {
      field: "customerSince",
      headerName: "Customer Since",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/customer/" + params.id)}
        >
          {moment(params.value).format("DD/MM/YYYY hh:mm:ss ")}
        </div>
      ),
    },
    {
      field: "customerStage",
      headerName: "Customer Stage",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/customer/" + params.id)}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/customer/" + params.id)}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "website",
      headerName: "Website",
      flex: 1,
      renderCell: (params) => (
        <div style={{ cursor: "pointer" }}>
          <a href={"https://" + params.value} target="_blank" rel="noreferrer">
            {params.value}
          </a>
        </div>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: (row) => (
        // <React.Fragment className="actionHead">
        <MenuItem>
          <DeleteIcon
            sx={{ mr: 2, color: "red", textAlign: "center" }}
            onClick={() => {
              setOpen(true);
              console.log(row);
              setCustomer(row);
            }}
          />
        </MenuItem>
        // </React.Fragment>
      ),
      align: "left",
    },
  ];

  return (
    <Box>
      <Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this customer? All data related to
              the customer will also be deleted.
            </DialogContentText>
          </DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteCustomer} color="secondary" autoFocus>
              Delete
            </Button>
          </div>
        </Dialog>
      </Box>
      <Box className="portfolio">
        <TableContainer component={Paper} className="portfolioCout">
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Customers"
            className="searchInput"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <img src={SearchImg} alt="Search Icon" />
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: "16px" }} // Add some spacing
          />
          <DataGrid
            style={{ height: 550, width: "100%" }}
            autoHeight
            aria-label="caption table"
            className="UpcomingItemsTable"
            rows={filteredCustomers}
            columns={columns}
            getRowId={(row) => row.serialNumber}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                  page: 1,
                },
              },
            }}
            pageSizeOptions={[5]}
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
