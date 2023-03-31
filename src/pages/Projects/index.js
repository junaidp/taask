import React, { useState } from "react";
import "./project.css";
import "../../index.css";
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
import { v4 as uuidv4 } from "uuid";

// images
import DummiAvatar from "../../assets/icons/dummiAvatar.svg";
import CalenderIcon from "../../assets/icons/calender.svg";
import CelenderFilterIcon from "../../assets/icons/calenderFilter.svg";
import CloseIcon from "../../assets/icons/close.svg";
import JohnImg from "../../assets/Images/john.png";
import MariahImg from "../../assets/Images/Mariah.png";
import FilterImg from "../../assets/icons/filter.svg";
import SearchImg from "../../assets/icons/search.svg";
import FilterMenuImg from "../../assets/icons/filterMenu.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import DoneIcon from "../../assets/icons/done.svg";
import ToDoIcon from "../../assets/icons/toDo.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import RemainderIcon from "../../assets/icons/Remainder.svg";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
let CustomCalendarIcon = (props) => {
  return <img src={CalenderIcon} alt="" {...props} />;
};
const getDay = (day) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = dayNames.findIndex((name) => name.startsWith(day));
  return dayIndex > -1 ? dayNames[dayIndex] : "";
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
              <EastRoundedIcon className="AssignsIcon" />
              {/* <WestRoundedIcon className="AssignsIcon" /> */}
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
    ProjectName: "",
    RelatedCustomer: "allCustomer",
    Resources: "",
    Customer: {
      img: JohnImg,
      name: "John Doe",
    },
    CustomerStage: "Contract",
    ProjectTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "todo",
    Action: "",
  },
  {
    id: 2,
    ProjectName: "Email Campaign",
    RelatedCustomer: "contractCustomer",
    Resources: "",
    Customer: {
      img: MariahImg,
      name: "Mariah Betts",
    },
    CustomerStage: "Adoption",
    ProjectTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "doing",
    Action: "",
  },
  {
    id: 3,
    ProjectName: "Contract out reach",
    RelatedCustomer: "onBoardingCustomer",
    Resources: "",
    Customer: {
      img: JohnImg,
      name: "John Doe",
    },
    CustomerStage: "Contract",
    ProjectTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "done",
    Action: "",
  },
  {
    id: 4,
    ProjectName: "",
    RelatedCustomer: "adoptionCustomer",
    Resources: "",
    Customer: {
      img: MariahImg,
      name: "Mariah Betts",
    },
    CustomerStage: "Adoption",
    ProjectTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "doing",
    Action: "",
  },
  {
    id: 5,
    ProjectName: "Email Campaign",
    RelatedCustomer: "renewalCustomer",
    Resources: "",
    Customer: {
      img: JohnImg,
      name: "John Doe",
    },
    CustomerStage: "Contract",
    ProjectTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "done",
    Action: "",
  },
  {
    id: 6,
    ProjectName: "Contract out reach",
    RelatedCustomer: "growthCustomer",
    Resources: "",
    Customer: {
      img: MariahImg,
      name: "Mariah Betts",
    },
    CustomerStage: "Adoption",
    ProjectTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "doing",
    Action: "",
  },
  {
    id: 7,
    ProjectName: "",
    RelatedCustomer: "multiSelectOption",
    Resources: "",
    Customer: {
      img: JohnImg,
      name: "John Doe",
    },
    CustomerStage: "Contract",
    ProjectTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "done",
    Action: "",
  },
  {
    id: 8,
    ProjectName: "Email Campaign",
    RelatedCustomer: "allCustomer",
    Resources: "",
    Customer: {
      img: MariahImg,
      name: "Mariah Betts",
    },
    CustomerStage: "Adoption",
    ProjectTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "doing",
    Action: "",
  },
  {
    id: 9,
    ProjectName: "Contract out reach",
    RelatedCustomer: "contractCustomer",
    Resources: "",
    Customer: {
      img: JohnImg,
      name: "John Doe",
    },
    CustomerStage: "Contract",
    ProjectTask: "New task",
    DueDate: "01/02/2023",
    AssignTask: "AssignTask",
    Status: "done",
    Action: "",
  },
  {
    id: 10,
    ProjectName: "",
    RelatedCustomer: "renewalCustomer",
    Resources: "",
    Customer: {
      img: MariahImg,
      name: "Mariah Betts",
    },
    CustomerStage: "Adoption",
    ProjectTask: "New task",
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
const statusOptions = [
  { value: "todo", label: "To do" },
  { value: "doing", label: "Doing" },
  { value: "done", label: "Done" },
];

const RelatedCustomerOptions = [
  { value: "allCustomer", label: "All Customer" },
  { value: "contractCustomer", label: "Contract Customer" },
  { value: "onBoardingCustomer", label: "Onboarding Customer" },
  { value: "adoptionCustomer", label: "Adoption Customer" },
  { value: "renewalCustomer", label: "Renewal Customer" },
  { value: "growthCustomer", label: "Growth Customer" },
  { value: "multiSelectOption", label: "Multi-Select Option" },
];
const Projects = (props) => {
  const [value, setValue] = React.useState(dayjs("2023-12-02"));
  const [eventReminder, setEventReminder] = React.useState(dayjs("2023-5-3"));
  const [dateReminder, setDateReminder] = React.useState(dayjs("2023-5-11"));
  const [timeReminder, setTimeReminder] = React.useState(
    dayjs("2022-04-17T15:30")
  );
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [projectName, setProjectName] = useState("");
  const [resources, setResources] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([]);

  const [openReminder, setOpenReminder] = React.useState(false);
  const [addRemainderOpen, setAddRemainderOpen] = React.useState(false);

  const [openArchive, setOpenArchive] = React.useState(false);

  const [selectedFields, setSelectedFields] = useState([]);
  const [newTaskCustomers, setNewTaskCustomers] = useState([]);
  console.log(newTaskCustomers, "newTaskCustomers");

  const [selectAll, setSelectAll] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState(rows);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open3 = Boolean(anchorEl);
  const [subtasks, setSubtasks] = useState([]);

  const [tasksTitle, setTasksTitle] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenModel = (row) => {
    setSelectedRow(row);
    setOpen(true);
    setAnchorEl(null);
  };
  // model 2
  const handleCloseProjectName = () => {
    setOpen1(false);
  };
  const handleClickOpenProjectNameModel = (params) => {
    setSelectedRow(params.row);
    setOpen1(true);
  };
  const handleCloseResources = () => {
    setOpen2(false);
  };
  const handleClickOpenResources = (params) => {
    setSelectedRow(params.row);
    setOpen2(true);
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
  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };
  const updateProjectName = () => {
    const newRow = { ...selectedRow, ProjectName: projectName };
    const updatedItems = tableData?.filter(
      (item) => item.id !== selectedRow?.id
    );
    updatedItems?.unshift(newRow);
    setTableData(updatedItems);
    setOpen1(false);
  };
  const handleResourcesChange = (event) => {
    setResources(event.target.value);
  };
  const updateResources = () => {
    const newRow = { ...selectedRow, Resources: resources };
    const updatedItems = tableData?.filter(
      (item) => item.id !== selectedRow?.id
    );
    updatedItems?.unshift(newRow);
    setTableData(updatedItems);
    setOpen2(false);
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
  const handleArchiveClose = () => {
    setOpenArchive(false);
  };
  const handleArchiveOpen = () => {
    setOpenArchive(true);
  };
  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    if (event.target.checked === true) {
      const allIDs = filteredCustomers?.map((item) => {
        return item?.id;
      });
      setNewTaskCustomers(allIDs);
    } else {
      setNewTaskCustomers([]);
    }
  };
  const handleSelectCustomer = (e, id) => {
    if (e.target.checked === true) {
      setNewTaskCustomers((oldState) => [...oldState, id]);
    } else {
      // setSelectedFields([])
      const newIds = newTaskCustomers.filter((item) => {
        if (item !== id) {
          return item;
        }
      });
      setNewTaskCustomers(newIds);
    }
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;
    if (!value) {
      setFilteredCustomers(rows);
      return;
    }
    const filtered = rows.filter((customer) =>
      customer.Customer.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCustomers(filtered);
    console.log(filtered, "filtered");
  };
  // for select all
  const onSelectAll = (e) => {
    if (e.target.checked === true) {
      const allIds = tableData?.map((item) => {
        return item?.id;
      });
      setSelectedFields(allIds);
    } else {
      setSelectedFields([]);
    }
  };
  // for single select
  const onSelectField = (e, id) => {
    if (e.target.checked === true) {
      if (selectedFields.includes(id)) {
        setSelectedFields(selectedFields);
      }
      setSelectedFields((oldArray) => [...oldArray, id]);
    } else {
      setSelectedFields([]);
      const newIds = selectedFields.filter((item) => {
        if (item !== id) {
          return item;
        }
      });

      setSelectedFields(newIds);
    }
  };

  const handleSubtaskClick = () => {
    const obj = {
      id: uuidv4(),
      label: "",
      active: false,
    };
    setSubtasks((oldState) => [...oldState, obj]);
  };

  const handleTaskLabelChange = (e, index) => {
    setSubtasks(
      subtasks.map((obj, i) => {
        if (i === index) {
          return { ...obj, label: e.target.value };
        }
        return obj;
      })
    );
  };

  const onTaskActiveChange = (e, index) => {
    setSubtasks(
      subtasks.map((obj, i) => {
        if (i === index) {
          return { ...obj, active: !obj?.active };
        }
        return obj;
      })
    );
  };
  const handleSubmitprojecttask = () => {
    const newRow = {
      ...selectedRow,
      CustomerTask: tasksTitle,
    };
    const updatedItems = tableData?.filter(
      (item) => item.id !== selectedRow?.id
    );
    updatedItems?.unshift(newRow);
    console.log(updatedItems, "updatedItems");
    setTableData(updatedItems);
    setOpen(false);
  };

  const columns = [
    {
      field: "selection",
      headerName: "check",
      width: 40,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <React.Fragment>
          <Checkbox
            checked={selectedFields?.length == tableData?.length}
            onChange={onSelectAll}
          />
        </React.Fragment>
      ),
      renderCell: (params) => (
        <React.Fragment>
          <Checkbox
            checked={selectedFields?.includes(params?.row?.id)}
            onChange={(e) => onSelectField(e, params?.row?.id)}
          />
        </React.Fragment>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      width: 60,
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
      field: "ProjectName",
      headerName: "Project Name",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderHeader: () => (
        <React.Fragment>
          <span>Project Name</span>
          <img src={FilterImg} className="filterImg" />
        </React.Fragment>
      ),
      renderCell: (params) => (
        <span
          onClick={() => handleClickOpenProjectNameModel(params)}
          className="customerTaskBtn"
        >
          {params?.row?.ProjectName === "" ? (
            <>
              <img src={PlusIcon} alt="not found" /> New Project
            </>
          ) : (
            <>{params.value}</>
          )}
        </span>
      ),
    },
    {
      field: "RelatedCustomer",
      headerName: "Related Customer",
      sortable: false,
      disableColumnMenu: true,
      width: 200,
      renderHeader: () => (
        <React.Fragment>
          <span>Related Customer</span>
          <img src={FilterImg} className="filterImg" />
        </React.Fragment>
      ),
      renderCell: (params) => {
        return (
          <Select
            defaultValue={params.value === "" ? "allCustomer" : params.value}
            className="relatedCustomerHead"
            onChange={(e) => onStatusChange(e, params)}
          >
            <p className="para">Related Customer</p>
            {RelatedCustomerOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      field: "Resources",
      headerName: "Resources",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderHeader: () => (
        <React.Fragment>
          <span>Resources</span>
          <img src={FilterImg} className="filterImg" />
        </React.Fragment>
      ),
      renderCell: (params) => (
        <span
          onClick={() => handleClickOpenResources(params)}
          className="customerTaskBtn"
        >
          {params?.row?.Resources === "" ? (
            <>
              <img src={PlusIcon} alt="not found" />
              Resources
            </>
          ) : (
            <>{params.value}</>
          )}
        </span>
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
      field: "ProjectTask",
      headerName: "Project Task",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderHeader: () => (
        <React.Fragment>
          <span>Project Task</span>
          <img src={FilterImg} className="filterImg" />
        </React.Fragment>
      ),
      renderCell: (params) => (
        <span className="customerTaskBtn">
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
          {tasksTitle}
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
        <React.Fragment>
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
    <Box className="project">
      <Box className="projects">
        <Box className="topHead">
          <Box>
            <Button
              className="btn"
              id="basic-button"
              aria-controls={open3 ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open3 ? "true" : undefined}
              onClick={handleClick1}
            >
              <img src={PlusIcon} alt="not found" /> New Project
            </Button>
            {selectedFields?.length === tableData?.length &&
            tableData?.length > 0 ? (
              <span>
                <img src={DeleteIcon} alt="not found" />
              </span>
            ) : null}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open3}
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
                  <Checkbox
                    checked={
                      newTaskCustomers?.length === filteredCustomers?.length
                    }
                    onChange={handleSelectAll}
                  />
                  <ListItemText primary={"Select All"} />
                </MenuItem>
                {filteredCustomers.map((user) => (
                  <MenuItem
                    value={user.customerName}
                    onClick={() => handleClickOpenModel(user)}
                  >
                    <Checkbox
                      checked={newTaskCustomers?.includes(user?.id)}
                      onChange={(e) => handleSelectCustomer(e, user?.id)}
                    />
                    <Avatar
                      src={user?.Customer?.img}
                      alt={user?.Customer?.img}
                      className="avatar"
                    />
                    <ListItemText primary={user?.Customer?.name} />
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

        <Box className="projectsMain">
          <DataGrid
            rows={tableData}
            columns={columns}
            // checkboxSelection
            autoHeight
            disableRowSelectionOnClick
            hideFooterPagination
            className="projectTable"
          />
        </Box>
        <Box className="projectFooter">
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
          open={open1}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseProjectName}
          aria-describedby="alert-dialog-slide-description"
          className="projectModel"
        >
          <DialogTitle className="titleHead">
            Project Name
            <img
              src={CloseIcon}
              alt="not found"
              onClick={handleCloseProjectName}
            />
          </DialogTitle>
          <DialogContent>
            <Box
              className="ProjectNameHead"
              sx={{
                paddingTop: "24px",
              }}
            >
              <FormGroup className="inputHead">
                <label htmlFor="ProjectName" className="ProjectName">
                  Project Name
                </label>
                <textarea
                  name="ProjectName"
                  placeholder="Lorem ipsum"
                  onChange={handleProjectNameChange}
                ></textarea>
              </FormGroup>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "24px",
              }}
            >
              <Button className="SaveBtn" onClick={updateProjectName}>
                save
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
        <Dialog
          open={open2}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseResources}
          aria-describedby="alert-dialog-slide-description"
          className="projectModel"
        >
          <DialogTitle className="titleHead">
            Resources
            <img
              src={CloseIcon}
              alt="not found"
              onClick={handleCloseResources}
            />
          </DialogTitle>
          <DialogContent>
            <Box
              className="ProjectNameHead"
              sx={{
                paddingTop: "24px",
              }}
            >
              <FormGroup className="inputHead">
                <label htmlFor="Resources" className="Resources">
                  Resources
                </label>
                <textarea
                  name="Resources"
                  placeholder="Lorem ipsum"
                  onChange={handleResourcesChange}
                ></textarea>
              </FormGroup>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "24px",
              }}
            >
              <Button className="SaveBtn" onClick={updateResources}>
                save
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        {/* new task */}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          className="ProjectTaskModel"
        >
          <DialogTitle className="titleHead">Project task </DialogTitle>
          <DialogContent>
            <Box className="topHead">
              <Box>
                <h6>
                  Customer ID
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
              <Box className="actionsHead">
                <img src={ToDoIcon} />
                <img src={DeleteIcon} className="DeleteIcon" />
              </Box>
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
                    onChange={(e) => setTasksTitle(e.target.value)}
                  />
                  <span>
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
              <h5 onClick={handleSubtaskClick}>
                <img src={PlusIcon} alt="not found" />
                Subtask
              </h5>
              {subtasks?.map((task, index) => {
                return (
                  <FormGroup className="inputHead" key={task?.id}>
                    <label htmlFor="Subtask1" className="Subtask1">
                      Subtask {index + 1}
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
                        onChange={(e) => handleTaskLabelChange(e, index)}
                      />
                      <span>
                        {task?.active === true ? (
                          <img
                            src={DoneIcon}
                            onClick={(e) => onTaskActiveChange(e, index)}
                          />
                        ) : (
                          <img
                            src={ToDoIcon}
                            onClick={(e) => onTaskActiveChange(e, index)}
                          />
                        )}
                      </span>
                    </Box>
                  </FormGroup>
                );
              })}
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
              <Button className="SaveBtn" onClick={handleSubmitprojecttask}>
                save
              </Button>
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

export default Projects;
