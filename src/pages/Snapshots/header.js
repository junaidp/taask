import React from "react";
import "./snapshots.css";
// Mui imports
import { Box, Typography } from "@mui/material";
// Images
import AttachmentsIcon from "../../assets/icons/Attachment.svg";

const SnapshotHeader = (props) => {
  return (
    <Box className="SnapshotsHead">
      <Typography variant="h3">
        <img
          src={props.symbol}
          alt="img not found"
        />
        {props.name}
      </Typography>
    </Box>
  );
};

export default SnapshotHeader;
