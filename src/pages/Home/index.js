import React from "react";
import "./home.css";

// Mui imports
import { Box, Grid } from "@mui/material";

// components
import UpcomingTaskTable from "../../components/UpcomingTaskTable";
import Calendar from "../../components/Calendar";
import UpcomingMeetings from "../../components/UpcomingMeetings";


const Home = () => {
  return (
    <Box className="home">
      <Grid container>
        <Grid item xs={8} className="part1">
          <UpcomingTaskTable />
        </Grid>
        <Grid item xs={4} className="part2">
          <Calendar />
          <UpcomingMeetings />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
