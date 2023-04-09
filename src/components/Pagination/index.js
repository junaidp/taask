import React, { useState, useEffect } from "react";
import "./pagination.css"
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  FormGroup,
  TextField,
  PaginationItem,
  Pagination,
} from "@mui/material";

import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

import PlusIcon from "../../assets/icons/plus.svg"

const CustomPagination = ({
  data,
  count,
  setCurrentItems,
  customInput,
  customSelect,
  paginationDetail,
  buttons,
  addbutton
}) => {
  const [page, setPage] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = data && data?.slice(indexOfFirstItem, indexOfLastItem);
  const handelPagenation = (event, value) => {
    setCurrentPage(value);
  };

  const numberOfPages = () => {
    let numbers = [];
    for (let index = 0; index < Math.ceil(count / 10); index++) {
      numbers.push(index);
    }
    return numbers;
  };

  const handleChange = (event) => {
    setPage(event.target.value);
  };

  useEffect(() => {
    setCurrentItems(currentItems);
  }, [currentPage,count]);
  return (
    <>
      <Box className="customPagination">
      {addbutton && (
          <Box className="entries addbutton">
            <span>
              <img src={PlusIcon} /> Showing 1 to {currentItems?.length} of {count ? count : 0} entries{" "}
            </span>
          </Box>
        )}
        {paginationDetail && (
          <Box className="entries">
            <span>
              Showing 1 to {currentItems?.length} of {count ? count : 0} entries{" "}
            </span>
          </Box>
        )}
        <Box className="PaginationHead">
          {buttons && (
            <Box className="paginationBox">
              <Pagination
                count={Math.ceil(count / 10)}
                variant="outlined"
                shape="rounded"
                siblingCount={0}
                page={currentPage}
                onChange={handelPagenation}
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
          )}

          {customSelect && (
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
                defaultValue={currentPage}
                onChange={(e) => setCurrentPage(e.target.value)}
              >
                {numberOfPages()?.map((option) => (
                  <MenuItem key={option + 1} value={option + 1}>
                    {option + 1} page
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}

          {customInput && (
            <Box className="GotoBox">
              <FormGroup>
                <label htmlFor="page" className="label">
                  go to
                </label>
                <input
                  type="number"
                  variant="outlined"
                  id="page"
                  defaultValue={currentPage}
                  min="1"
                  max={Math.ceil(count / 10)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      setCurrentPage(event.target.value);
                    }
                  }}
                />
              </FormGroup>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CustomPagination;
