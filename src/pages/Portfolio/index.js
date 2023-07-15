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
  Skeleton
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
import CustomerServices from "../../APIs/Customer";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const navigate = useNavigate();

  const getAllCustomers = async () => {
    await CustomerServices.getAllCustomers()
      .then((res) => {
        if (res) {
          const data = res;
          console.log(data)
          setAllCustomers(data);
          setCount(data?.length);
          // setLoading(false);
        }
      })
      .catch((err) => {
        // setLoading(false);
      });
  };
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
            {currentItems.length>0 && currentItems.map((item, index) => (
              <TableRow onClick={()=>navigate('/customer/'+item.serialNumber)} key={item.serialNumber} style={{ cursor: 'pointer' }}>
                <TableCell>
                  {item.serialNumber}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Box className="userprofile">
                    {/* <span>
                      <img src={item?.imageId} alt="img not found" />
                    </span> */}
                    {item?.name}
                  </Box>
                </TableCell>
                <TableCell>{item?.contacts?.name}</TableCell>
                <TableCell>{moment(item.customerSince).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{item?.customerStage}</TableCell>
                <TableCell>{item?.location}</TableCell>
                <TableCell>
                  <a href="#">{item?.website}</a>
                </TableCell>
              </TableRow>
            ))}
            {currentItems.length<=0 &&(
              Array(4)
              .fill()
              .map((_, index) =>(
                <TableRow >
              <TableCell>
              <Skeleton animation="wave" />
              </TableCell>
              <TableCell component="th" scope="row">
              <Skeleton animation="wave" />
              </TableCell>
              <TableCell><Skeleton animation="wave" /></TableCell>
              <TableCell><Skeleton animation="wave" /></TableCell>
              <TableCell><Skeleton animation="wave" /></TableCell>
              <TableCell><Skeleton animation="wave" /></TableCell>
              <TableCell>
              <Skeleton animation="wave" />
              </TableCell>
            </TableRow>
              ))
              
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
      <Loader loaderValue={loading} />
    </Box>
  );
};

export default Portfolio;
