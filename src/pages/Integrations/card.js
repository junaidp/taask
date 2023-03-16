import React from "react";
import "./Integrations.css";
// Mui imports
import { Box, Card, CardContent } from "@mui/material";
import testImg from "../../assets/Images/Zendesk.png";

const IntegrationsCard = (item) => {
  return (
    <Box className="integrationsCard">
      <Card>
        <Box className="imgHead">
          <img src={item.ImgUrl} alt="not found" />
        </Box>
        <CardContent sx={{ padding: "0" }}>
          <h4>{item.title}</h4>
        </CardContent>
      </Card>
    </Box>
  );
};

export default IntegrationsCard;
