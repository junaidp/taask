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
import { ToastContainer } from "react-toastify";
import { getTask } from "../../services/task.service";
const UpcomingItems = () => {
  const [allTasks, setAllTask] = useState([])
  const [allMeetings, setAllMeetings] = useState([])
  const getMyTasks = async () =>{
    try {
      let {data:resp} = await getTask();
    if(resp){
      if(typeof resp !="string"){
        resp = resp.map((x,index)=>{
          x.id = index +1;
          return x;
        })
        setAllTask(resp)
      }
    }
    } catch (error) {
      
    }
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
    // getMyMeetings()
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
      <ToastContainer/>
    </Box>
  );
};

export default UpcomingItems;
