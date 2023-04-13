import React, { useState, useEffect } from "react";
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
  // Pagination,
  // PaginationItem,
  Menu,
  FormControl,
  ListItemText,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as Yup from "yup";
import moment from "moment";
import dayjs from "dayjs";
import { useFormik } from "formik";
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
import CustomPagination from "../../components/Pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// APIs Services
import CustomerServices from "../../APIs/Customer";
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
      (row) => row.customerName === selectedCustomerId
    );
    setSelectedCustomer(selectedCustomer);
  };

  return (
    <Select
      value={selectedCustomer ? selectedCustomer.customerName : ""}
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
            <Avatar src={null} alt={props.row.customerName} />
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
        <MenuItem key={row.id} value={row.customerName}>
          <Avatar src={null} alt={row.customerName} className="AssignsImg" />
          <span className="AssignsName">{row.customerName}</span>
        </MenuItem>
      ))}
    </Select>
  );
};

// const rows = [
//   {
//     id: 1,
//     ProjectName: "",
//     RelatedCustomer: "allCustomer",
//     Resources: "",
//     Customer: {
//       img: JohnImg,
//       name: "John Doe",
//     },
//     CustomerStage: "Contract",
//     ProjectTask: "New task",
//     DueDate: "01/02/2023",
//     AssignTask: "AssignTask",
//     Status: "todo",
//     Action: "",
//   },
//   {
//     id: 2,
//     ProjectName: "Email Campaign",
//     RelatedCustomer: "contractCustomer",
//     Resources: "",
//     Customer: {
//       img: MariahImg,
//       name: "Mariah Betts",
//     },
//     CustomerStage: "Adoption",
//     ProjectTask: "New task",
//     DueDate: "01/02/2023",
//     AssignTask: "AssignTask",
//     Status: "doing",
//     Action: "",
//   },
//   {
//     id: 3,
//     ProjectName: "Contract out reach",
//     RelatedCustomer: "onBoardingCustomer",
//     Resources: "",
//     Customer: {
//       img: JohnImg,
//       name: "John Doe",
//     },
//     CustomerStage: "Contract",
//     ProjectTask: "New task",
//     DueDate: "01/02/2023",
//     AssignTask: "AssignTask",
//     Status: "done",
//     Action: "",
//   },
//   {
//     id: 4,
//     ProjectName: "",
//     RelatedCustomer: "adoptionCustomer",
//     Resources: "",
//     Customer: {
//       img: MariahImg,
//       name: "Mariah Betts",
//     },
//     CustomerStage: "Adoption",
//     ProjectTask: "New task",
//     DueDate: "01/02/2023",
//     AssignTask: "AssignTask",
//     Status: "doing",
//     Action: "",
//   },
//   {
//     id: 5,
//     ProjectName: "Email Campaign",
//     RelatedCustomer: "renewalCustomer",
//     Resources: "",
//     Customer: {
//       img: JohnImg,
//       name: "John Doe",
//     },
//     CustomerStage: "Contract",
//     ProjectTask: "New task",
//     DueDate: "01/02/2023",
//     AssignTask: "AssignTask",
//     Status: "done",
//     Action: "",
//   },
//   {
//     id: 6,
//     ProjectName: "Contract out reach",
//     RelatedCustomer: "growthCustomer",
//     Resources: "",
//     Customer: {
//       img: MariahImg,
//       name: "Mariah Betts",
//     },
//     CustomerStage: "Adoption",
//     ProjectTask: "New task",
//     DueDate: "01/02/2023",
//     AssignTask: "AssignTask",
//     Status: "doing",
//     Action: "",
//   },
//   {
//     id: 7,
//     ProjectName: "",
//     RelatedCustomer: "multiSelectOption",
//     Resources: "",
//     Customer: {
//       img: JohnImg,
//       name: "John Doe",
//     },
//     CustomerStage: "Contract",
//     ProjectTask: "New task",
//     DueDate: "01/02/2023",
//     AssignTask: "AssignTask",
//     Status: "done",
//     Action: "",
//   },
//   {
//     id: 8,
//     ProjectName: "Email Campaign",
//     RelatedCustomer: "allCustomer",
//     Resources: "",
//     Customer: {
//       img: MariahImg,
//       name: "Mariah Betts",
//     },
//     CustomerStage: "Adoption",
//     ProjectTask: "New task",
//     DueDate: "01/02/2023",
//     AssignTask: "AssignTask",
//     Status: "doing",
//     Action: "",
//   },
//   {
//     id: 9,
//     ProjectName: "Contract out reach",
//     RelatedCustomer: "contractCustomer",
//     Resources: "",
//     Customer: {
//       img: JohnImg,
//       name: "John Doe",
//     },
//     CustomerStage: "Contract",
//     ProjectTask: "New task",
//     DueDate: "01/02/2023",
//     AssignTask: "AssignTask",
//     Status: "done",
//     Action: "",
//   },
//   {
//     id: 10,
//     ProjectName: "",
//     RelatedCustomer: "renewalCustomer",
//     Resources: "",
//     Customer: {
//       img: MariahImg,
//       name: "Mariah Betts",
//     },
//     CustomerStage: "Adoption",
//     ProjectTask: "New task",
//     DueDate: "01/02/2023",
//     AssignTask: "AssignTask",
//     Status: "doing",
//     Action: "",
//   },
// ];

const statusOptions = [
  { value: "todo", label: "To do" },
  { value: "doing", label: "Doing" },
  { value: "done", label: "Done" },
];

const Projects = (props) => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState();
  const [value, setValue] = useState(dayjs());
  const [eventReminder, setEventReminder] = useState(dayjs("2023-5-3"));
  const [dateReminder, setDateReminder] = useState(dayjs("2023-5-11"));
  const [timeReminder, setTimeReminder] = useState(dayjs("2022-04-17T15:30"));
  const [duaDate, setDuaDate] = useState(dayjs("2023-12-02"));
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [resources, setResources] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [openReminder, setOpenReminder] = useState(false);
  const [addRemainderOpen, setAddRemainderOpen] = useState(false);
  const [openArchive, setOpenArchive] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const [newTaskCustomers, setNewTaskCustomers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open3 = Boolean(anchorEl);
  const [subtasks, setSubtasks] = useState([]);
  const [tasksTitle, setTasksTitle] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [allResources, setAllResources] = useState([]);
  let userId = localStorage.getItem("token");

  const setUpdataForTable = (tasks) => {
    console.log(tasks, "shdlkahd");
    const rows = tasks?.map((item, index) => {
      return {
        id: index + 1,
        customerId: item?.customerId,
        projectName: item?.name,
        resourcesLink: item?.resources[0]?.link,
        taskIds: item?.taskIds,
        dueDate: item?.dueDate,
      };
    });
    console.log(rows, "samdksamd");
    setTableData(rows);
  };

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
    console.log("onUpload called");
    setFile(e?.target?.files[0]);
    handleResourcesSave(e?.target?.files[0]);
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
      dueDate: value,
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
      const allIDs = allCustomers?.map((item) => {
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
    setSearchCustomer(value);
  };

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
    setTableData(updatedItems);
    setOpen(false);
  };
  const formik = useFormik({
    enableReinitialize: false,
    // validationSchema: TaskSchema,
    initialValues: {
      name: "",
      customerId: "",
      resources: [
        {
          fileId: allResources[0]?.fileId,
          link: allResources[0]?.link,
          userId: allResources[0]?.userId,
          id: allResources[0]?.id,
        },
      ],
      taskIds: [],
      dueDate: "",
      status: "TODO",
    },
    onSubmit: async () => {
      const data = formik?.values;
      console.log(data, "data");
      await CustomerServices.saveProject(data)
        .then((res) => {
          if (res) {
            getAllProjects();
            toast.success("Project Saved", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          console.log(err.data.error);
        });
      setOpen(false);
    },
  });
  console.log(formik.values, "sjdnksnd");

  const getAllCustomers = async () => {
    await CustomerServices.getAllCustomers()
      .then((res) => {
        if (res) {
          setAllCustomers(res);
        }
      })
      .catch((err) => {
        console.log(err.data.error);
      });
  };

  const getAllProjects = async () => {
    await CustomerServices.getAllProjects().then((res) => {
      if (res) {
        setUpdataForTable(res);
      }
    });
  };

  const handleResourcesSave = async (attachment) => {
    console.log("handleResourcesSave");
    const resourcesData = {
      link: attachment?.name,
      userId: userId,
    };
    const data = new FormData();
    const resourcesJson = JSON.stringify(resourcesData);
    const blob = new Blob([resourcesJson], { type: "application/json" });
    data.append("file", attachment);
    data.append("resources", blob);
    if (attachment) {
      await CustomerServices.saveResources(data)
        .then((res) => {
          getResources();
        })
        .catch((err) => {
          console.log(err.data.error);
        });
    } else {
      console.log("resourcesData: empty");
    }
  };

  const getResources = async () => {
    await CustomerServices.getResources(userId)
      .then((res) => {
        if (res) {
          setAllResources(res);
          const uplodedFile = {
            fileId: res[res?.length - 1]?.fileId,
            link: res[res?.length - 1]?.link,
            userId: res[res?.length - 1]?.userId,
            id: res[res?.length - 1]?.id,
          };
          formik?.setFieldValue("resources[0]", uplodedFile);
        }
      })
      .catch((err) => {
        console.log(err.data.error);
      });
    };


  const setCustomer = (customer) => {
    const selectedCustomer = customer?.id;
    formik.values.customerId = selectedCustomer;
    setAnchorEl(null);
  };

  useEffect(() => {
    getAllCustomers();
    getAllProjects();
  }, []);

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
      field: "projectName",
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
      field: "resourcesLink",
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
      field: "customerId",
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
        <div className="CustomerNameHead" title={params.value}>
          {/* <Avatar src={params.value.img} alt={params.value.name} /> */}
          {params.value}
        </div>
      ),
    },
    {
      field: "taskIds",
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
        <span className="customerTaskBtn" title={params.value}>
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
          {params.value}
        </span>
      ),
    },
    {
      field: "dueDate",
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
        console.log(moment(params?.value).format("MM/DD//YYYY"), "sadn");
        return (
          <FormGroup className="customertaskDatePicker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                orientation="portrait"
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={moment(params?.value).format("MM/DD//YYYY")}
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
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormGroup>
        );
      },
    },
    {
      field: "AssignTask",
      headerName: "Assigned Task",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderHeader: () => (
        <React.Fragment>
          <span>Assigned Task</span>
          <img src={FilterImg} className="filterImg" />
        </React.Fragment>
      ),
      renderCell: (params) => (
        <AssignTaskColumn rows={tableData} row={params.row} />
      ),
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
            <Button className="btn" onClick={handleClickOpenModel}>
              <img src={PlusIcon} alt="not found" /> New Project
            </Button>
            {selectedFields?.length === tableData?.length &&
            tableData?.length > 0 ? (
              <span>
                <img src={DeleteIcon} alt="not found" />
              </span>
            ) : null}
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
            rows={currentItems}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            hideFooterPagination
            className="projectTable"
          />
        </Box>
        <CustomPagination
          data={tableData}
          count={tableData?.length}
          setCurrentItems={setCurrentItems}
          customInput={true}
          customSelect={true}
          paginationDetail={true}
          buttons={true}
        />

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
            <Button
              className="btn"
              id="basic-button"
              aria-controls={open3 ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open3 ? "true" : undefined}
              onClick={(e) => handleClick1(e)}
            >
              <img src={PlusIcon} alt="not found" /> select customer
            </Button>
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
                },
              }}
              transformOrigin={{ horizontal: "left", vertical: "top" }}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
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
                {allCustomers?.map((customer) =>
                  searchCustomer ? (
                    customer?.name
                      ?.toLowerCase()
                      ?.includes(searchCustomer?.toLowerCase()) ? (
                      <MenuItem
                        value={customer.customerName}
                        onClick={() => setCustomer(customer)}
                      >
                        <Checkbox
                          checked={newTaskCustomers?.includes(customer?.id)}
                          onChange={(e) =>
                            handleSelectCustomer(e, customer?.id)
                          }
                        />
                        {/* <Avatar
                   src={customer?.Customer?.img}
                   alt={customer?.Customer?.img}
                   className="avatar"
                 /> */}
                        <ListItemText primary={customer?.name} />
                      </MenuItem>
                    ) : (
                      ""
                    )
                  ) : (
                    <MenuItem
                      value={customer.customerName}
                      onClick={() => setCustomer(customer)}
                    >
                      <Checkbox
                        checked={newTaskCustomers?.includes(customer?.id)}
                        onChange={(e) => handleSelectCustomer(e, customer?.id)}
                      />
                      {/* <Avatar
                   src={customer?.Customer?.img}
                   alt={customer?.Customer?.img}
                   className="avatar"
                 /> */}
                      <ListItemText primary={customer?.name} />
                    </MenuItem>
                  )
                )}
              </FormControl>
            </Menu>
            <Box
              sx={{
                paddingTop: "14px",
              }}
            >
              <FormGroup className="inputHead">
                <label htmlFor="taskTitle" className="taskTitle">
                  Project Title
                </label>
                <TextField
                  fullWidth
                  {...{
                    formik,
                    title: "projectTitle",
                    name: "projectTitle",
                    placeholder: "Lorem Ipsum",
                    checkValidation: true,
                    value: formik?.values?.name,
                  }}
                  onChange={(e) => {
                    formik.setFieldValue("name", e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup className="inputHead">
                <label htmlFor="taskDescription" className="taskDescription">
                  Project Description
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
                taskIds
              </h5>
              {subtasks?.map((task, index) => {
                return (
                  <FormGroup className="inputHead" key={task?.id}>
                    <label htmlFor="taskIds" className="taskIds">
                      taskIds {index + 1}
                    </label>
                    <TextField
                      fullWidth
                      {...{
                        formik,
                        title: "projectTaskIds",
                        name: "projectTaskIds",
                        placeholder: "Lorem Ipsum",
                        checkValidation: true,
                        value: formik?.values?.taskIds[0],
                      }}
                      onChange={(e) => {
                        formik.setFieldValue("taskIds[0]", e.target.value);
                      }}
                    />
                  </FormGroup>
                );
              })}
            </Box>
            <Box
              sx={{
                paddingTop: "14px",
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
                    <input hidden multiple type="file" onChange={onUpload} />
                  </Button>
                </Box>
              </FormGroup>
              <FormGroup className="inputHead">
                <label htmlFor="duaDate" className="duaDate">
                  Due Date
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    orientation="portrait"
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    value={duaDate}
                    showToolbar={false}
                    components={{
                      OpenPickerIcon: CustomCalendarIcon,
                      RightArrowButton: ArrowRightRoundedIcon,
                      LeftArrowButton: ArrowLeftRoundedIcon,
                    }}
                    onChange={(newValue) => {
                      const isoString = newValue.toISOString();
                      setDuaDate(newValue);
                      formik.setFieldValue("dueDate", isoString);
                    }}
                    showDaysOutsideCurrentMonth
                    dayOfWeekFormatter={(day) => getDay(day)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormGroup>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "20px",
              }}
            >
              <Button
                className="SaveBtn"
                content="save"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
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
