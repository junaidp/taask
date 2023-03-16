import React from "react";
import "./snapshots.css";
// Mui imports
import { Box, Grid, List, ListItem, Typography } from "@mui/material";

// sub components
import SnapshotHeader from "./header";

// images
import CustomerIcon from "../../assets/icons/Customer.svg";
import ProjectsIcon from "../../assets/icons/Projects.svg";
import CustomerTasks from "../../assets/icons/Customer Tasks.svg";
import PortfolioIcon from "../../assets/icons/Portfolio.svg";
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
  return (
    <Box className="Snapshots">
      <Grid container rowSpacing={3}>
        <Grid item xs={6}>
          <Box className="snapCustomerHead">
            <SnapshotHeader name="Customer" symbol={CustomerIcon} />
            <Box className="snapContent">
              <List className="snapList">
                <h6>Category</h6>
                {categoryData.map((item) => (
                  <ListItem disablePadding>
                    <p>{item.category}</p>
                    <Typography variant="h5">
                      {item.customers < 10
                        ? `0${item.customers}`
                        : item.customers}
                      <span>Customers</span>
                    </Typography>
                  </ListItem>
                ))}
              </List>

              <List className="snapList snapListTypeTwo">
                <h6>Stage</h6>
                {stageData.map((item) => (
                  <ListItem disablePadding>
                    <p>{item.category}</p>
                    <Typography variant="h5">
                      {item.customers < 10
                        ? `0${item.customers}`
                        : item.customers}
                      <span>Customers</span>
                    </Typography>
                  </ListItem>
                ))}
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
                  Total Projects <span>{totalProjects}</span>
                </h6>
                {totalProjectsData.map((item) => (
                  <ListItem disablePadding>
                    <p>{item.status}</p>
                    <Typography variant="h5">
                      {item.numberOftask < 10
                        ? `0${item.numberOftask}`
                        : item.numberOftask}
                    </Typography>
                  </ListItem>
                ))}
              </List>

              <List className="snapList snapListTypeTwo">
                <h6>Completed Projects</h6>
                {completedProjects.map((item) => (
                  <ListItem disablePadding>
                    <p>{item.status}</p>
                    <Typography variant="h5">
                      {item.customers < 10
                        ? `0${item.customers}`
                        : item.customers}
                      <span>Customers</span>
                    </Typography>
                  </ListItem>
                ))}
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
                    Active Tasks <span>{totalActiveTasks}</span>
                  </h6>
                  {activeTasksData.map((item) => (
                    <ListItem disablePadding>
                      <p>{item.status}</p>
                      <Typography variant="h5">
                        {item.numberOftask < 10
                          ? `0${item.numberOftask}`
                          : item.numberOftask}
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                <List className="snapList snapListTypeTwo">
                  <h6>Completed Tasks</h6>
                  {completedTasksData.map((item) => (
                    <ListItem disablePadding>
                      <p>{item.status}</p>
                      <Typography variant="h5">
                        {item.numberOfTask < 10
                          ? `0${item.numberOfTask}`
                          : item.numberOfTask}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box className="snapContent">
                <List className="snapList snapListTypeTwo">
                  <h6>Tasks You Assigned</h6>
                  {assignedTasksData.map((item) => (
                    <ListItem disablePadding>
                      <p>{item.status}</p>
                      <Typography variant="h5">
                        {item.numberOfTask < 10
                          ? `0${item.numberOfTask}`
                          : item.numberOfTask}
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                <List className="snapList snapListTypeTwo">
                  <h6>asks assigned to you</h6>
                  {receivedTasksData.map((item) => (
                    <ListItem disablePadding>
                      <p>{item.status}</p>
                      <Typography variant="h5">
                        {item.numberOfTask < 10
                          ? `0${item.numberOfTask}`
                          : item.numberOfTask}
                      </Typography>
                    </ListItem>
                  ))}
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
    </Box>
  );
};

export default Snapshots;
