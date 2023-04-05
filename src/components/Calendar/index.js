import React from "react";
import "./styles.css";
import dayjs from "dayjs";
// Mui imports
import { Box, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

const getDay = (day) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = dayNames.findIndex((name) => name.startsWith(day));
  return dayIndex > -1 ? dayNames[dayIndex] : "";
};

const Calendar = () => {
  const [value, setValue] = React.useState(dayjs("2023-12-08"));

  return (
    <Box className="calender">
      <Typography variant="h2">Calendar</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="portrait"
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={value}
          components={{
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
      <Box className="eventHead">
        <span>
          <ArrowLeftRoundedIcon />
        </span>
        <Box className="eventDetail">
            <span>
                <h6>12</h6>
                <p>sep</p>
            </span>
            <Typography variant="h4">Event Name</Typography>
        </Box>
        <span>
          <ArrowRightRoundedIcon />
        </span>
      </Box>
    </Box>
  );
};

export default Calendar;

