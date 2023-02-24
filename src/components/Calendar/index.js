import React from "react";
import "./styles.css";
import dayjs from "dayjs";
// Mui imports
import { Box, Grid, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

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
          shouldDisableDate={isWeekend}
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
