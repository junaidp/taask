import React, {useState, useEffect} from "react";
import "./home.css";
import "../../index.css";

// Mui imports
import { Box, Grid } from "@mui/material";

// components
import UpcomingItemsTable from "../../components/UpcomingItemsTable";
import Calendar from "../../components/Calendar";
import Appointments from "../../components/Appointments";

// APIs Services
import CustomerServices from "../../APIs/Customer";

const UpcomingItems = () => {
  const [allTasks, setAllTask] = useState([])
  const [allMeetings, setAllMeetings] = useState([])
  const getMyTasks = async () =>{
    await CustomerServices.getAllTasks().then((res)=>{
       if(res){
        setAllTask(res)
      }
    })
  }

  const getMyMeetings = async () =>{
    await CustomerServices.getAllMettings().then((res)=>{
       if(res){
        setAllMeetings(res)
      }
    })
  }
  
  useEffect(() => {
    getMyTasks()
    getMyMeetings()
  }, [])

  return (
    <Box className="home">
      <Grid container>
        <Grid item xs={8} className="part1">
          <UpcomingItemsTable tasksData={allTasks} />
        </Grid>
        <Grid item xs={4} className="part2">
          <Calendar />
          <Appointments allMeetings={allMeetings} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpcomingItems;
