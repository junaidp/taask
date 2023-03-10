import React, { useState } from "react";
import "./customerTask.css";
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
  PaginationItem
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
              <WestRoundedIcon className="AssignsIcon" />
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
    DueDate: "01/02/2023",
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
    DueDate: "01/02/2023",
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
    DueDate: "01/02/2023",
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
    DueDate: "01/02/2023",
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
    DueDate: "01/02/2023",
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


const CustomerTasks = (props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState(rows);

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
  const statusOptions = [
    { value: "todo", label: "To do" },
    { value: "doing", label: "Doing" },
    { value: "done", label: "Done" },
  ];
  const columns = [
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
        </React.Fragment>
      ),
      align: "right",
    },
  ];
  return (
    <Box className="customerTasks">
      <Box className="topHead">
        <Box>
          <span>
            <img src={CelenderFilterIcon} />
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
        checkboxSelection
        autoHeight
        disableRowSelectionOnClick
        hideFooterPagination
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
    </Box>
  );
};

export default CustomerTasks;
