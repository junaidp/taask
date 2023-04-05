import React, { useState, useEffect } from "react";
import "./snapshots.css";
// Mui imports
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
//  components
import Loader from "../../components/Loader";
import SnapshotHeader from "./header";

// images
import CustomerIcon from "../../assets/icons/Customer.svg";
import ProjectsIcon from "../../assets/icons/Projects.svg";
import CustomerTasks from "../../assets/icons/Customer Tasks.svg";
import PortfolioIcon from "../../assets/icons/Portfolio.svg";

// APIs Services
import CustomerServices from "../../APIs/Customer";

const categoryData = [
  {
    category: "Tier 1",
    customers: 50,
  },
  {
    category: "Tier 2",
    customers: 30,
  },
  {
    category: "Tier 3",
    customers: 20,
  },
];

const stageData = [
  {
    category: "Contract",
    customers: 10,
  },
  {
    category: "Onboarding",
    customers: 2,
  },
  {
    category: "Adoption",
    customers: 1,
  },
  {
    category: "Renewal",
    customers: 5,
  },
  {
    category: "Growth",
    customers: 50,
  },
];
const totalProjectsData = [
  {
    status: "To Do",
    numberOftask: 2,
  },
  {
    status: "Doing",
    numberOftask: 4,
  },
];
const totalProjects = totalProjectsData.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.numberOftask;
}, 0);

const activeTasksData = [
  {
    status: "To Do",
    numberOftask: 20,
  },
  {
    status: "Doing",
    numberOftask: 20,
  },
];
const totalActiveTasks = activeTasksData.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.numberOftask;
}, 0);

const completedProjects = [
  {
    status: "Last Day",
    customers: 10,
  },
  {
    status: "Last Day",
    customers: 5,
  },
  {
    status: "Last Week",
    customers: 2,
  },
  {
    status: "Last Month",
    customers: 1,
  },
];
const completedTasksData = [
  {
    status: "Last Day",
    numberOfTask: 0,
  },
  {
    status: "Last Month",
    numberOfTask: 10,
  },
  {
    status: "Last Week",
    numberOfTask: 2,
  },
  {
    status: "Last Year",
    numberOfTask: 250,
  },
];
const assignedTasksData = [
  {
    status: "Last Day",
    numberOfTask: 0,
  },
  {
    status: "Last Month",
    numberOfTask: 5,
  },
  {
    status: "Last Week",
    numberOfTask: 1,
  },
  {
    status: "Last Year",
    numberOfTask: 20,
  },
];
const receivedTasksData = [
  {
    status: "Last Day",
    numberOfTask: 2,
  },
  {
    status: "Last Month",
    numberOfTask: 17,
  },
  {
    status: "Last Week",
    numberOfTask: 3,
  },
  {
    status: "Last Year",
    numberOfTask: 42,
  },
];
const totalCustomersData = [
  {
    status: "Total Customers",
    customers: 150,
  },
];

const Snapshots = () => {
  const [allSnapShot, setAllSnapShot] = useState([]);
  const [loading, setLoading] = useState(true);
  const getSnapShot = async () => {
    await CustomerServices.getSnapShot().then((res) => {
      if (res) {
        setAllSnapShot(res);
        setLoading(false);
      }
    }).catch((err) => {
      setLoading(false);
    });;
  };
  const customerSnapShotDTO = allSnapShot.customerSnapShotDTO;
  const projectSnapShotDTO = allSnapShot.projectSnapShotDTO;
  const taskSnapShotDTO = allSnapShot.taskSnapShotDTO;
  useEffect(() => {
    getSnapShot();
  }, []);

  return (
    <Box className="Snapshots">
      <Grid container rowSpacing={3}>
        <Grid item xs={6}>
          <Box className="snapCustomerHead">
            <SnapshotHeader name="Customer" symbol={CustomerIcon} />
            <Box className="snapContent">
              <List className="snapList snapListTypeTwo">
                <h6>Category</h6>
                <ListItem disablePadding>
                  <p>Tier 1</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.tier1}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Tier 2</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.tier2}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Tier 3</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.tier3}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Tier 4</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.tier4}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Tier 5</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.tier5}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Tier 6</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.tier6}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Tier 7</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.tier7}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Tier 8</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.tier8}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Tier 9</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.tier9}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Tier 10</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.tier10}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
              </List>

              <List className="snapList snapListTypeTwo">
                <h6>Stage</h6>
                <ListItem disablePadding>
                  <p>Contract</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.contract}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Onboarding</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.onboarding}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Adoption</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.adoption}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Renewal</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.renewal}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Growth</p>
                  <Typography variant="h5">
                    {customerSnapShotDTO?.growth}
                    <span>Customers</span>
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className="snapProjectsHead">
            <SnapshotHeader name="Ad-hoc Projects" symbol={ProjectsIcon} />
            <Box className="snapContent">
              <List className="snapList">
                <h6>
                  Total Projects{" "}
                  <span>{projectSnapShotDTO?.totalProjects}</span>
                </h6>
                <ListItem disablePadding>
                  <p>To Do</p>
                  <Typography variant="h5">00</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Doing</p>
                  <Typography variant="h5">00</Typography>
                </ListItem>
              </List>

              <List className="snapList snapListTypeTwo">
                <h6>
                  Completed Projects
                  <span>{projectSnapShotDTO?.completedProjects}</span>
                </h6>
                <ListItem disablePadding>
                  <p>Last Day</p>
                  <Typography variant="h5">
                    00
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Last Year</p>
                  <Typography variant="h5">
                    00
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Last Week</p>
                  <Typography variant="h5">
                    00
                    <span>Customers</span>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <p>Last Month</p>
                  <Typography variant="h5">
                    00
                    <span>Customers</span>
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="snapTasksHead">
            <SnapshotHeader name="Tasks" symbol={CustomerTasks} />
            <Box className="snapContentHead">
              <Box className="snapContent">
                <List className="snapList">
                  <h6>
                    Active Tasks <span>{taskSnapShotDTO?.activeTasks}</span>
                  </h6>
                  <ListItem disablePadding>
                    <p>To Do</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <p>Doing</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                </List>

                <List className="snapList snapListTypeTwo">
                  <h6>
                    Completed Tasks
                    <span>{taskSnapShotDTO?.completedTasks}</span>
                  </h6>
                  <ListItem disablePadding>
                    <p>Last Day</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <p>Last Month</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <p>Last Week</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <p>Last Year</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                </List>
              </Box>
              <Box className="snapContent">
                <List className="snapList snapListTypeTwo">
                  <h6>
                    Tasks You Assigned
                    <span>{taskSnapShotDTO?.assignTasks}</span>
                  </h6>
                  <ListItem disablePadding>
                    <p>Last Day</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <p>Last Month</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <p>Last Week</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <p>Last Year</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                </List>

                <List className="snapList snapListTypeTwo">
                  <h6>
                    asks assigned to you
                    <span>{taskSnapShotDTO?.recievedTasks}</span>
                  </h6>
                  <ListItem disablePadding>
                    <p>Last Day</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <p>Last Month</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <p>Last Week</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <p>Last Year</p>
                    <Typography variant="h5">00</Typography>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className="snapPortfolioHead">
            <SnapshotHeader name="Portfolio" symbol={PortfolioIcon} />
            <List className="snapList snapListTypeTwo">
              {totalCustomersData.map((item) => (
                <ListItem disablePadding>
                  <p>{item.status}</p>
                  <Typography variant="h5">
                    {item.customers < 10
                      ? `0${item.customers}`
                      : item.customers}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
      <Loader loaderValue={loading} />
    </Box>
  );
};

export default Snapshots;
