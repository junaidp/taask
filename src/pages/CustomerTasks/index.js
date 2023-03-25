import React, { useState } from "react";
import "./customerTask.css";

import moment from "moment";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Button,
  Badge,
  TextField,
  Checkbox,
  FormGroup,
  Avatar,
  ListItemIcon,
  Pagination,
  PaginationItem,
  Menu,
  OutlinedInput,
  InputLabel,
  FormControl,
  ListItemText,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

import EastRoundedIcon from "@mui/icons-material/EastRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
// images
import DummiAvatar from "../../assets/icons/dummiAvatar.svg";
import CelenderFilterIcon from "../../assets/icons/calenderFilter.svg";
import JohnImg from "../../assets/Images/john.png";
import MariahImg from "../../assets/Images/Mariah.png";
import FilterImg from "../../assets/icons/filter.svg";
import SearchImg from "../../assets/icons/search.svg";
import FilterMenuImg from "../../assets/icons/filterMenu.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import DoneIcon from "../../assets/icons/done.svg";
import ToDoIcon from "../../assets/icons/toDo.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import CalenderIcon from "../../assets/icons/calender.svg";
import RemainderIcon from "../../assets/icons/Remainder.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let CustomCalendarIcon = (props) => {
  return <img src={CalenderIcon} alt="" {...props} />;
};
const getDay = (day) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekDay;
  if (day == "Su") {
    weekDay = dayNames[0];
  } else if (day == "Mo") {
    weekDay = dayNames[1];
  } else if (day == "Tu") {
    weekDay = dayNames[2];
  } else if (day == "We") {
    weekDay = dayNames[3];
  } else if (day == "Th") {
    weekDay = dayNames[4];
  } else if (day == "Fr") {
    weekDay = dayNames[5];
  } else if (day == "Sa") {
    weekDay = dayNames[6];
  } else {
    weekDay = "";
  }
  return weekDay;
};

const AssignTaskColumn = (props) => {
  const { rows } = props;
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleCustomerSelect = (event, row) => {
    const selectedCustomerId = event.target.value;
    const selectedCustomer = rows.find(
      (row) => row.Customer.name === selectedCustomerId
    );
    setSelectedCustomer(selectedCustomer);
  };

  return (
    <Select
      value={selectedCustomer ? selectedCustomer.Customer.name : ""}
      onChange={(event) => handleCustomerSelect(event, props.row)}
      displayEmpty
      className="AssignsSelect"
      renderValue={() => {
        if (!selectedCustomer) {
          return (
            <React.Fragment>
              <Avatar className="AssignsImg" src={DummiAvatar} />
              <ListItemIcon>
                <EastRoundedIcon className="AssignsIcon" />
              </ListItemIcon>
            </React.Fragment>
          );
        }
        return (
          <React.Fragment>
            <Avatar
              src={selectedCustomer.Customer.img}
              alt={selectedCustomer.Customer.name}
              className="AssignsImg"
            />
            <ListItemIcon>
              {/* <WestRoundedIcon className="AssignsIcon" /> */}
              <EastRoundedIcon className="AssignsIcon" />
            </ListItemIcon>
          </React.Fragment>
        );
      }}
    >
      <p className="para">Assign Task</p>
      {rows.map((row) => (
        <MenuItem key={row.id} value={row.Customer.name}>
          <Avatar
            src={row.Customer.img}
            alt={row.Customer.name}
            className="AssignsImg"
          />
          <span className="AssignsName">{row.Customer.name}</span>
        </MenuItem>
      ))}
    </Select>
  );
};

const rows = [
  {
    id: 1,
    Customer: {
      img: JohnImg,
      name: "John Doe",
    },
    CustomerStage: "Contract",
    CustomerTask: "New task",
    DueDate: "01/12/2023",
    AssignTask: "AssignTask",
    Status: "todo",
    Action: "",
  },
  {
    id: 2,
    Customer: {
      img: MariahImg,
      name: "Mariah Betts",
    },
    CustomerStage: "Adoption",
    CustomerTask: "New task",
    DueDate: "01/04/2023",
    AssignTask: "AssignTask",
    Status: "doing",
    Action: "",
  },
  {
    id: 3,
    Customer: {
      img: JohnImg,
      name: "John Doe",
    },
    CustomerStage: "Contract",
    CustomerTask: "New task",
    DueDate: "01/06/2023",
    AssignTask: "AssignTask",
    Status: "done",
    Action: "",
  },
  {
    id: 4,
    Customer: {
      img: MariahImg,
      name: "Mariah Betts",
    },
    CustomerStage: "Adoption",
    CustomerTask: "New task",
    DueDate: "01/09/2023",
    AssignTask: "AssignTask",
    Status: "doing",
    Action: "",
  },
  {
    id: 5,
    Customer: {
      img: JohnImg,
      name: "John Doe",
    },
    CustomerStage: "Contract",
    CustomerTask: "New task",
    DueDate: "01/08/2023",
    AssignTask: "AssignTask",
    Status: "done",
    Action: "",
  },
  {
    id: 6,
    Customer: {
      img: MariahImg,
      name: "Mariah Betts",
    },
    CustomerStage: "Adoption",
    CustomerTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "doing",
    Action: "",
  },
  {
    id: 7,
    Customer: {
      img: JohnImg,
      name: "John Doe",
    },
    CustomerStage: "Contract",
    CustomerTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "done",
    Action: "",
  },
  {
    id: 8,
    Customer: {
      img: MariahImg,
      name: "Mariah Betts",
    },
    CustomerStage: "Adoption",
    CustomerTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "doing",
    Action: "",
  },
  {
    id: 9,
    Customer: {
      img: JohnImg,
      name: "John Doe",
    },
    CustomerStage: "Contract",
    CustomerTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "done",
    Action: "",
  },
  {
    id: 10,
    Customer: {
      img: MariahImg,
      name: "Mariah Betts",
    },
    CustomerStage: "Adoption",
    CustomerTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "doing",
    Action: "",
  },
];
const pages = [
  {
    value: "1page",
    label: "1 page",
  },
  {
    value: "2page",
    label: "2 page",
  },
  {
    value: "3page",
    label: "3 page",
  },
  {
    value: "4page",
    label: "4 page",
  },
];

const customers = [
  {
    id: 1,
    PhotoUrl: MariahImg,
    customerName: "Mariah Betts",
  },
  {
    id: 2,
    PhotoUrl: JohnImg,
    customerName: "John Doe",
  },
  {
    id: 3,
    PhotoUrl: MariahImg,
    customerName: "Mariah Betts",
  },
  {
    id: 4,
    PhotoUrl: JohnImg,
    customerName: "John Doe",
  },
];
const CustomerTasks = (props) => {
  const [value, setValue] = React.useState(dayjs("2023-12-02"));
  const [eventReminder, setEventReminder] = React.useState(dayjs("2023-5-3"));
  const [dateReminder, setDateReminder] = React.useState(dayjs("2023-5-11"));
  const [timeReminder, setTimeReminder] = React.useState(
    dayjs("2022-04-17T15:30")
  );
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState(rows);
  const [selectAll, setSelectAll] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [openArchive, setOpenArchive] = React.useState(false);
  const [openReminder, setOpenReminder] = React.useState(false);
  const [addRemainderOpen, setAddRemainderOpen] = React.useState(false);

  const [selectedFields, setSelectedFields] = useState([])
  const [newTaskCustomers, setNewTaskCustomers] = useState([])

  const handleArchiveClose = () => {
    setOpenArchive(false);
  };
  const handleArchiveOpen = () => {
    setOpenArchive(true);
  };
  const handleReminderClose = () => {
    setOpenReminder(false);
  };
  const handleReminderOpen = () => {
    setOpenReminder(true);
  };
  const handleaddRemainderClose = () => {
    setAddRemainderOpen(false);
  };
  const handleaddRemainderOpen = () => {
    setAddRemainderOpen(true);
  };
  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    if(event.target.checked === true){
      const allIDs = filteredCustomers?.map((item)=>{
        return item?.id
      })
      setNewTaskCustomers(allIDs)
    }else{
      setNewTaskCustomers([])
    }
  };
  const handleSelectCustomer = (e, id) => {
    if(e.target.checked === true){
      setNewTaskCustomers(oldState => [...oldState, id])
    }else{
      // setSelectedFields([])
      const newIds = newTaskCustomers.filter((item)=>{
        if(item !== id ){
          return item
        }
      })

      setNewTaskCustomers(newIds)
    }
  };


  const handleFilterChange = (event) => {
    const { value } = event.target;
    if (!value) {
      setFilteredCustomers(customers);
      return;
    }
    const filtered = customers.filter((customer) =>
      customer.customerName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenModel = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };
  const onUpload = (e) => {
    setFile(e?.target?.files[0]);
  };
  const onStatusChange = (e, row) => {
    let value = e.target.value;
    const newRow = {
      ...row?.row,
      Status: value,
    };
    const updatedItems = tableData?.filter((item) => item.id !== row?.id);
    updatedItems?.unshift(newRow);
    setTableData(updatedItems);
  };
  const onDateChange = (newValue, row) => {
    let value = newValue;
    const newRow = {
      ...row?.row,
      DueDate: value,
    };
    const updatedItems = tableData?.filter((item) => item.id !== row?.id);
    updatedItems?.unshift(newRow);
    setTableData(updatedItems);
  };
  const statusOptions = [
    { value: "todo", label: "To do" },
    { value: "doing", label: "Doing" },
    { value: "done", label: "Done" },
  ];

  // for select all
  const onSelectAll =(e)=>{
    if(e.target.checked === true){
      const allIds = tableData?.map((item)=>{
        return item?.id
      })
      setSelectedFields(allIds)
      
    }else {
      setSelectedFields([])
    }
  }
  // for single select
  const onSelectField =(e , id)=>{
    if(e.target.checked === true){
      if(selectedFields.includes(id)){
        setSelectedFields(selectedFields)
      }
      setSelectedFields(oldArray => [...oldArray, id]);
    }else {
      setSelectedFields([])
      const newIds = selectedFields.filter((item)=>{
        if(item !== id ){
          return item
        }
      })

      setSelectedFields(newIds)
    }
  }
  

  const columns = [
    {
      field: "selection",
      headerName: "check",
      width: 40,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <React.Fragment>
          <Checkbox checked={selectedFields?.length == tableData?.length} onChange={onSelectAll}/>
        </React.Fragment>
      ),
      renderCell: (params) => (
        <React.Fragment>
          <Checkbox checked={selectedFields?.includes(params?.row?.id)} onChange={(e)=>onSelectField(e, params?.row?.id)}/>
        </React.Fragment>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      width: 70,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <React.Fragment>
          <span>ID</span>
          <img src={FilterImg} className="filterImg" />
        </React.Fragment>
      ),
    },
    {
      field: "Customer",
      headerName: "Customer",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderHeader: () => (
        <React.Fragment>
          <span>Customer</span>
          <img src={FilterImg} className="filterImg" />
        </React.Fragment>
      ),
      renderCell: (params) => (
        <div className="CustomerNameHead">
          <Avatar src={params.value.img} alt={params.value.name} />
          {params.value.name}
        </div>
      ),
    },
    {
      field: "CustomerStage",
      headerName: "Customer Stage",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderHeader: () => (
        <React.Fragment>
          <span>Customer Stage</span>
          <img src={FilterImg} className="filterImg" />
        </React.Fragment>
      ),
    },
    {
      field: "CustomerTask",
      headerName: "Customer Task",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderHeader: () => (
        <React.Fragment>
          <span>Customer Task</span>
          <img src={FilterImg} className="filterImg" />
        </React.Fragment>
      ),
      renderCell: (params) => (
        <span
          onClick={() => handleClickOpenModel(params)}
          className="customerTaskBtn"
        >
          <Box className="badgesHead">
            {params?.row?.Status === "todo" ? (
              <Badge badgeContent={""} className="toDoBadge tableBadge"></Badge>
            ) : params?.row?.Status === "doing" ? (
              <Badge
                badgeContent={""}
                className="doingBadge tableBadge"
              ></Badge>
            ) : (
              <Badge badgeContent={""} className="doneBadge tableBadge"></Badge>
            )}
          </Box>
          <img src={PlusIcon} alt="not found" /> New task
        </span>
      ),
    },
    {
      field: "DueDate",
      headerName: "Due Date",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,

      renderHeader: () => (
        <React.Fragment>
          <span>Due Date</span>
          <img src={FilterImg} className="filterImg" />
        </React.Fragment>
      ),
      renderCell: (params) => {
        return (
          <FormGroup className="customertaskDatePicker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                orientation="portrait"
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={params.value}
                showToolbar={false}
                components={{
                  OpenPickerIcon: CustomCalendarIcon,
                  RightArrowButton: ArrowRightRoundedIcon,
                  LeftArrowButton: ArrowLeftRoundedIcon,
                }}
                onChange={(newValue) => {
                  setValue(newValue);
                  onDateChange(newValue, params);
                }}
                showDaysOutsideCurrentMonth
                dayOfWeekFormatter={(day) => getDay(day)}
                renderInput={(params) => <TextField {...params} className="" />}
              />
            </LocalizationProvider>
          </FormGroup>
        );
      },
    },
    {
      field: "AssignTask",
      headerName: "Assign(ed) Task",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderHeader: () => (
        <React.Fragment>
          <span>Assign(ed) Task</span>
          <img src={FilterImg} className="filterImg" />
        </React.Fragment>
      ),
      renderCell: (params) => <AssignTaskColumn rows={rows} row={params.row} />,
    },
    {
      field: "Status",
      headerName: "Status",
      sortable: false,
      disableColumnMenu: true,
      width: 95,
      renderHeader: () => (
        <React.Fragment>
          <span>Status</span>
          <img src={FilterImg} className="filterImg" />
        </React.Fragment>
      ),
      renderCell: (params) => {
        return (
          <Select
            defaultValue={params.value}
            className="StatusHead"
            onChange={(e) => onStatusChange(e, params)}
          >
            <p className="para">Status</p>
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      width: 80,
      renderHeader: () => (
        <React.Fragment>
          <span>Action</span>
          <img src={FilterImg} className="filterImg" />
        </React.Fragment>
      ),
      renderCell: (row) => (
        <React.Fragment className="actionHead">
          {row?.row?.Status === "done" ? (
            <img src={DoneIcon} />
          ) : (
            <img src={ToDoIcon} />
          )}
          <img src={DeleteIcon} className="DeleteIcon" />
          <img
            src={RemainderIcon}
            className="RemainderIcon"
            onClick={() => handleReminderOpen()}
          />
        </React.Fragment>
      ),
      align: "right",
    },
  ];

  return (
   <Box className="customerTaskPage">
     <Box className="customerTasks">
      <Box className="topHead">
        <Box>
          <Button
            className="btn"
            id="basic-button"
            aria-controls={open1 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open1 ? "true" : undefined}
            onClick={handleClick1}
          >
            <img src={PlusIcon} alt="not found" /> New Customer Task
          </Button>
          {
            selectedFields?.length === tableData?.length? (
              <span>
            <img src={DeleteIcon} alt="not found" />
          </span>
            ):(null)
          }
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open1}
            onClose={handleClose1}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            className="selectCustomerMenu"
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 4px 15px rgba(58, 96, 110, 0.15))",
                width: "300px",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 10,
                  width: 32,
                  borderRadius: "4px",
                  height: 32,
                  bgcolor: "background.paper",
                  transform: "translateY(-5px) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <h3>Select Customer(s)</h3>
            <TextField
              variant="outlined"
              fullWidth
              onChange={handleFilterChange}
            />
            <FormControl sx={{ width: 300 }} className="selectCustomer">
              <MenuItem value={"selectAll"}>
                <Checkbox checked={newTaskCustomers?.length === filteredCustomers?.length} onChange={handleSelectAll} />
                <ListItemText primary={"Select All"} />
              </MenuItem>
              {filteredCustomers.map((user) => (
                <MenuItem value={user.customerName}>
                  <Checkbox
                    checked={newTaskCustomers?.includes(user?.id)}
                    onChange={(e) => handleSelectCustomer(e, user?.id)}
                  />
                  <Avatar
                    src={user.PhotoUrl}
                    alt={user.PhotoUrl}
                    className="avatar"
                  />
                  <ListItemText primary={user.customerName} />
                </MenuItem>
              ))}
            </FormControl>
          </Menu>
        </Box>
        <Box>
          <span>
            <img
              src={CelenderFilterIcon}
              title="Archive"
              onClick={() => handleArchiveOpen()}
            />
          </span>
          <span>
            <img src={SearchImg} />
          </span>
          <span>
            <img src={FilterMenuImg} />
          </span>
        </Box>
      </Box>

      <DataGrid
        rows={tableData}
        columns={columns}
        // checkboxSelection
        autoHeight
        disableRowSelectionOnClick
        hideFooterPagination
        // onSelectionModelChange={handleSelectionChange}
      />
      <Box className="CustomerTaskFooter">
        <Box className="entries">
          <span>Showing 1 to 10 of 9,225 entries</span>
        </Box>
        <Box className="PaginationHead">
          <Box className="paginationBox">
            <Pagination
              count={10}
              siblingCount={0}
              variant="outlined"
              shape="rounded"
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: ArrowLeftRoundedIcon,
                    next: ArrowRightRoundedIcon,
                  }}
                  {...item}
                />
              )}
            />
          </Box>
          <Box
            className="selectPageBox"
            component="form"
            sx={{
              "& .MuiTextField-root": { width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-select-currency"
              select
              defaultValue="1page"
            >
              {pages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box className="GotoBox">
            <FormGroup>
              <label htmlFor="page" className="label">
                go to
              </label>
              <TextField variant="outlined" id="page" />
            </FormGroup>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="customerTaskModel"
      >
        <DialogTitle className="titleHead">task</DialogTitle>
        <DialogContent>
          <Box className="topHead">
            <Box>
              <h6>
                Customer ID{" "}
                <span>
                  {selectedRow?.id < 10
                    ? `0${selectedRow?.id}`
                    : selectedRow?.id}
                </span>
              </h6>
            </Box>
            <Box>
              <h6>
                Customer Name <span>{selectedRow?.Customer?.name}</span>
              </h6>
            </Box>
            <Box>
              <h6>
                Customer Stage <span>{selectedRow?.CustomerStage}</span>
              </h6>
            </Box>
            {/* <Box className="actionsHead">
              <img src={ToDoIcon} />
              <img src={DeleteIcon} className="DeleteIcon" />
            </Box> */}
            <Box className="badgesHead">
              <Badge badgeContent={""} className="toDoBadge"></Badge>
              <Badge badgeContent={""} className="doingBadge"></Badge>
              <Badge badgeContent={""} className="doneBadge"></Badge>
            </Box>
          </Box>
          <Box
            sx={{
              paddingTop: "24px",
            }}
          >
            <FormGroup className="inputHead">
              <label htmlFor="taskTitle" className="taskTitle">
                Task Title
              </label>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  <Checkbox />
                </span>
                <TextField
                  fullWidth
                  placeholder="Lorem Ipsum"
                  id="taskTitle"
                  className="taskTitleInput"
                />
                <span title="Complete">
                  <img src={ToDoIcon} />
                </span>
              </Box>
            </FormGroup>
            <FormGroup className="inputHead">
              <label htmlFor="taskDescription" className="taskDescription">
                Task Description
              </label>
              <textarea
                name="taskDescription"
                placeholder="Lorem Ipsum"
              ></textarea>
            </FormGroup>
          </Box>

          <Box
            sx={{
              paddingTop: "24px",
              paddingBottom: "8px",
              borderTop: "1px solid #EBEBEB",
              borderBottom: "1px solid #EBEBEB",
            }}
            className="SubtaskHead"
          >
            <h5>
              <img src={PlusIcon} alt="not found" />
              Subtask
            </h5>
            <FormGroup className="inputHead">
              <label htmlFor="Subtask1" className="Subtask1">
                Subtask 1
              </label>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  <Checkbox />
                </span>
                <TextField
                  fullWidth
                  placeholder="Lorem Ipsum"
                  id="Subtask1"
                  className="taskTitleInput"
                />
                <span>
                  <img src={ToDoIcon} />
                </span>
              </Box>
            </FormGroup>
            <FormGroup className="inputHead">
              <label htmlFor="Subtask2" className="Subtask2">
                Subtask 2
              </label>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  <Checkbox />
                </span>
                <TextField
                  fullWidth
                  placeholder="Lorem Ipsum"
                  id="Subtask2"
                  className="taskTitleInput"
                />
                <span>
                  <img src={ToDoIcon} />
                </span>
              </Box>
            </FormGroup>
            <FormGroup className="inputHead">
              <label htmlFor="Subtask3" className="Subtask3">
                Subtask 3
              </label>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  <Checkbox />
                </span>
                <TextField
                  fullWidth
                  placeholder="Lorem Ipsum"
                  id="Subtask3"
                  className="taskTitleInput"
                />
                <span>
                  <img src={ToDoIcon} />
                </span>
              </Box>
            </FormGroup>
          </Box>
          <Box
            sx={{
              paddingTop: "24px",
            }}
            className="AttachmentHead"
          >
            <FormGroup className="inputHead">
              <label htmlFor="Attachment" className="Attachment">
                Attachment
              </label>
              <Box className="uploadFileHead">
                <TextField
                  fullWidth
                  placeholder="Lorem Ipsum"
                  value={file?.name}
                  id="Attachment"
                />
                <Button
                  variant="contained"
                  component="label"
                  className="uploadFileBtn"
                >
                  Upload
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={onUpload}
                  />
                </Button>
              </Box>
            </FormGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "40px",
            }}
          >
            <Button className="SaveBtn">save</Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* model 2 */}
      <Dialog
        open={openArchive}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleArchiveClose}
        aria-describedby="alert-dialog-slide-description"
        className="ArchiveModel"
      >
        <DialogTitle className="titleHead">Archived</DialogTitle>
        <DialogContent>
          <Box>
            {tableData?.map((item) => {
              if (item?.Status === "done") {
                return (
                  <Box className="ArchiveContent">
                    <h4>{item.Customer.name}</h4>
                    <span>
                      <img src={DoneIcon} alt="not found" />
                    </span>
                  </Box>
                );
              }
            })}
          </Box>
        </DialogContent>
      </Dialog>

      {/* model 3*/}
      <Dialog
        open={openReminder}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleReminderClose}
        aria-describedby="alert-dialog-slide-description"
        className="ArchiveModel ReminderModel"
      >
        <DialogTitle className="titleHead">Reminder</DialogTitle>
        <DialogContent>
          <Box>
            <FormGroup className="ReminderDatePicker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  orientation="portrait"
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={eventReminder}
                  showToolbar={false}
                  components={{
                    OpenPickerIcon: CustomCalendarIcon,
                    RightArrowButton: ArrowRightRoundedIcon,
                    LeftArrowButton: ArrowLeftRoundedIcon,
                  }}
                  onChange={(newValue) => {
                    setEventReminder(newValue);
                  }}
                  showDaysOutsideCurrentMonth
                  dayOfWeekFormatter={(day) => getDay(day)}
                />
              </LocalizationProvider>
            </FormGroup>
            <Box className="remainderHead">
              <h6 onClick={() => handleaddRemainderOpen()}>
                <img src={PlusIcon} alt="not found" />
                Add Remainder
              </h6>
            </Box>
            <Box className="remainderHead">
              <h6>
                <img src={RemainderIcon} alt="not found" />
                <span>{dateReminder.format("DD/MM/YYYY")}</span>
              </h6>
              <h6>{timeReminder.format("hh:mm A")}</h6>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      {/* model 4*/}
      <Dialog
        open={addRemainderOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleaddRemainderClose}
        aria-describedby="alert-dialog-slide-description"
        className="ArchiveModel ReminderModel reminderdateAndTime "
      >
        <DialogContent>
          <Box>
            <h6>Set Date</h6>
            <FormGroup className="inputGroup">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  orientation="portrait"
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={dateReminder}
                  showToolbar={false}
                  components={{
                    OpenPickerIcon: CustomCalendarIcon,
                    RightArrowButton: ArrowRightRoundedIcon,
                    LeftArrowButton: ArrowLeftRoundedIcon,
                  }}
                  onChange={(newValue) => {
                    setDateReminder(newValue);
                  }}
                  showDaysOutsideCurrentMonth
                  dayOfWeekFormatter={(day) => getDay(day)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormGroup>
          </Box>
          <Box>
            <h6>Set Date</h6>
            <FormGroup className="inputGroup">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopTimePicker
                  value={timeReminder}
                  components={{
                    // OpenPickerIcon: CustomCalendarIcon,
                    RightArrowButton: ArrowRightRoundedIcon,
                    LeftArrowButton: ArrowLeftRoundedIcon,
                  }}
                  onChange={(newValue) => {
                    setTimeReminder(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormGroup>
          </Box>
          <Button className="reminderBtn">save</Button>
        </DialogContent>
      </Dialog>
    </Box>
   </Box>
  );
};

export default CustomerTasks;
