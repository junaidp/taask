import React from "react";
import "./loader.css";
// Mui imports
import { Box } from "@mui/material";

let Loader = ({loaderValue}) => {
  return (
    <Box className="LoaderCout" style={{ display: loaderValue === true ? "flex" : "none" }}>
      <span className="loader"></span>
    </Box>
  );
};

export default Loader;
