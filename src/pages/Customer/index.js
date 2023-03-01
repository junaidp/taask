import * as React from "react";
import "./customer.css";
// Mui imports
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  FormGroup,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

// Images
import CalenderIcon from "../../assets/icons/calender.svg";
import CustomerNotes from "../../assets/icons/CustomerNotes.svg";
import AttachmentIcon from "../../assets/icons/Attachment.svg";
import LinksIcon from "../../assets/icons/Links.svg";

// conponent
import CustomerTable from "../../components/CustomerTable";

let CustomCalendarIcon = (props) => {
  return <img src={CalenderIcon} alt="" {...props} />;
};

const isWeekend = (date) => {
  const day = date.day();
  return day === 1 || day === 6;
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

const customerOption = [
  {
    value: "Customer Stage",
    label: "Customer Stage",
  },
  {
    value: "option 2",
    label: "option 2",
  },
  {
    value: "option 3",
    label: "option 3",
  },
];
let Customer = () => {
  const [value, setValue] = React.useState(dayjs("2023-12-02"));
  return (
    <Box className="customer">
      <Grid container>
        <Grid item xs={8} className="customerPart1">
          <form action="">
            <Box className="inputGroup">
              <FormGroup className="inputHead">
                <label htmlFor="Name" className="Name">
                  Name
                </label>
                <TextField
                  variant="outlined"
                  id="Name"
                  fullWidth
                  placeholder="John Doe"
                />
              </FormGroup>
              <FormGroup className="inputHead">
                <label htmlFor="Category" className="Category">
                  Category
                </label>
                <TextField
                  variant="outlined"
                  id="Category"
                  fullWidth
                  placeholder="Lorem Ipsum"
                />
              </FormGroup>
            </Box>
            <Box className="inputGroup">
              <FormGroup className="inputHead">
                <label htmlFor="Customer Stage" className="CustomerSince">
                  Customer Since
                </label>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  className="customerCalander"
                >
                  <DatePicker
                    orientation="portrait"
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    value={value}
                    shouldDisableDate={isWeekend}
                    showToolbar={false}
                    components={{
                      OpenPickerIcon: CustomCalendarIcon,
                      RightArrowButton: ArrowRightRoundedIcon,
                      LeftArrowButton: ArrowLeftRoundedIcon,
                    }}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    showDaysOutsideCurrentMonth
                    dayOfWeekFormatter={(day) => getDay(day)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormGroup>
              <FormGroup className="inputHead">
                <label htmlFor="CustomerStage" className="CustomerStage">
                  Customer Stage
                </label>
                <TextField
                  id="CustomerStage"
                  select
                  placeholder="Contract"
                  defaultValue="Customer Stage"
                >
                  {customerOption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormGroup>
            </Box>

            <Box className="inputGroup">
              <FormGroup className="inputHead">
                <label htmlFor="Location" className="Location">
                  Location
                </label>
                <TextField
                  variant="outlined"
                  id="Location"
                  fullWidth
                  placeholder="Lorem Ipsum"
                />
              </FormGroup>
              <FormGroup className="inputHead">
                <label htmlFor="Website" className="Website">
                  Website
                </label>
                <TextField
                  variant="outlined"
                  id="Website"
                  fullWidth
                  placeholder="www.loremipsum.com"
                />
              </FormGroup>
            </Box>
            <Box className="customTableHead">
              <CustomerTable />
            </Box>
            <FormGroup className="inputHead">
              <label htmlFor="CustomerNotes" className="CustomerNotes">
                Customer Notes
                <img src={CustomerNotes} alt="img not found" />
              </label>
              <textarea
                name="CustomerNotes"
                placeholder="Lorem Ipsum"
              ></textarea>
            </FormGroup>
          </form>
        </Grid>
        <Grid item xs={4} className="customerPart2">
          <Box className="quickAccess">
            <h6 className="heading">
              Quick Access <img src={CustomerNotes} alt="img not found" />
            </h6>
            <form>
              <FormGroup className="inputHead">
                <label htmlFor="Attachment" className="Attachment">
                  <img src={AttachmentIcon} alt="img not found" />
                  Attachment
                </label>
                <TextField
                  variant="outlined"
                  id="Attachment"
                  fullWidth
                  placeholder="Description"
                />
              </FormGroup>
              <FormGroup className="inputHead">
                <label htmlFor="Links" className="Links">
                  <img src={LinksIcon} alt="img not found" />
                  Links
                </label>
                <TextField
                  variant="outlined"
                  id="Links"
                  fullWidth
                  placeholder="www.link.com"
                />
              </FormGroup>
              <FormGroup className="inputHead">
                <TextField
                  variant="outlined"
                  id="Description"
                  fullWidth
                  placeholder="Description"
                />
              </FormGroup>
              <button className="btn">Save</button>
              <FormGroup className="inputHead">
                <label htmlFor="Notes" className="Notes">
                  Notes
                </label>
                <textarea name="Notes" placeholder="Lorem Ipsum"></textarea>
              </FormGroup>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Customer;
