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

const Portfolio = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [index, setIndex] = useState(null);
  const [isLoading,setisLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const deleteCustomer = async () => {
    try {
      setLoading(true);
      const { data: resp } = await deleteCustomerBySerialNumber(
        customer.serialNumber
      );
      setLoading(false);
      if (resp) {
        toast.success("Customer Deleted Sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        currentItems.splice(index, 1);
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
  const setSearchQuery = (searchQuery)=>{
    const data = searchQuery.length>0 ?
    allCustomers.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())):
    allCustomers;
    setCurrentItems(data);
  }
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
          <Box className="topHead">
            <Box>{/* <Typography variant="h2">Portfolio</Typography> */}</Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormGroup>
                <TextField variant="outlined" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} />
              </FormGroup>
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
                <TableCell>
                  Action <img src={FilterImg} className="filterImg" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.length > 0 &&
                currentItems.map((item, index) => (
                  <TableRow
                    key={item.serialNumber}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell
                      onClick={() => navigate("/customer/" + item.serialNumber)}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => navigate("/customer/" + item.serialNumber)}
                    >
                      <Box className="userprofile">
                        {/* <span>
                      <img src={item?.imageId} alt="img not found" />
                    </span> */}
                        {item?.name}
                      </Box>
                    </TableCell>
                    <TableCell
                      onClick={() => navigate("/customer/" + item.serialNumber)}
                    >
                      {item?.contacts?.name}
                    </TableCell>
                    <TableCell
                      onClick={() => navigate("/customer/" + item.serialNumber)}
                    >
                      {moment(item.customerSince).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell
                      onClick={() => navigate("/customer/" + item.serialNumber)}
                    >
                      {item?.customerStage}
                    </TableCell>
                    <TableCell
                      onClick={() => navigate("/customer/" + item.serialNumber)}
                    >
                      {item?.location}
                    </TableCell>
                    <TableCell>
                      <a href="#">{item?.website}</a>
                    </TableCell>
                    <TableCell>
                      <MenuItem sx={{ color: "error.main" }}>
                        {/* <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} /> */}
                        <DeleteIcon
                          sx={{ mr: 2 }}
                          onClick={() => {
                            setOpen(true);
                            setCustomer(item);
                            setIndex(index);
                          }}
                        />
                      </MenuItem>
                    </TableCell>
                  </TableRow>
                ))}
              {!currentItems.length && isLoading &&
                Array(4)
                  .fill()
                  .map((_, index) => (
                    <TableRow>
                      <TableCell>
                        <Skeleton animation="wave" />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Skeleton animation="wave" />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" />
                      </TableCell>
                    </TableRow>
                  ))}
              {!currentItems.length && !isLoading &&(
                  // <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            No Record found
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  // </TableBody>
                )}
            </TableBody>
          </Table>
          <CustomPagination
            data={allCustomers}
            count={count}
            setCurrentItems={setCurrentItems}
            customInput={true}
            customSelect={true}
            paginationDetail={true}
            buttons={true}
          />
        </TableContainer>
        <ToastContainer />
        <Loader loaderValue={loading} />
      </Box>
    </Box>
  );
};

export default Portfolio;
