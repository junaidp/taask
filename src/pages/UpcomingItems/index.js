import React, {useState, useEffect} from "react";
import "./home.css";

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

  const getMyTasks = async () =>{
    await CustomerServices.getAllTasks().then((res)=>{
       if(res){
        setAllTask(res)
      }
    })
  }
  
  useEffect(() => {
    getMyTasks()
  }, [])

  return (
    <Box className="home">
      <Grid container>
        <Grid item xs={8} className="part1">
          <UpcomingItemsTable tasksData={allTasks} />
        </Grid>
        <Grid item xs={4} className="part2">
          <Calendar />
          <Appointments />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpcomingItems;
