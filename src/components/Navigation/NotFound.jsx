import React from "react";
import "./index.css";
import Img from "./error.svg";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./index.css";
const NotFound = () => {
  return (
    <div className="notFoundMain">
      <img src={Img} className="notFoundImg" />
      <p>
        The page could not be found. Please try again or contact support if you
        need help.
      </p>
      <div className="notFoundBtns">
        <Link to="/">
          <Button style={{ boxShadow: "none" }}>Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
