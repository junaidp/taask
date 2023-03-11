import React, { useState, useEffect } from "react";
import "./customer.css";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Mui imports
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  FormGroup,
  MenuItem,
  Toast,
} from "@mui/material";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
// Images
import CalenderIcon from "../../assets/icons/calender.svg";
import CustomerNotes from "../../assets/icons/CustomerNotes.svg";
import AttachmentIcon from "../../assets/icons/Attachment.svg";
import LinksIcon from "../../assets/icons/Links.svg";
// conponent
import { useFormik } from "formik";
import CustomerTable from "../../components/CustomerTable";
import CustomerServices from "../../APIs/Customer";
import Loader from "../../components/Loader";

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
    value: "PreBoarding",
    label: "Pre-Boarding",
  },
  {
    value: "Onboaring",
    label: "Onboaring",
  },
  {
    value: "Contract",
    label: "Contract",
  },
  {
    value: "Renewal",
    label: "Renewal",
  },
  {
    value: "Adoption",
    label: "Adoption",
  },
  {
    value: "Growth",
    label: "Growth",
  },
];
let Customer = () => {
  const [value, setValue] = React.useState(dayjs("2023-12-02"));
  const [loading, setLoading] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const customerValitadion = Yup.object().shape({
    name: Yup.string().required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category: "",
      name: "",
      location: "",
      website: "",
      customerstage: "",
      customersince: "",
      customernotes: "",
      contacts: [
        {
          emailaddress: "test@gmil.com",
          id: "",
          jobtitle: "test Job",
          location: "string",
          name: "string",
        },
      ],
    },
    validationSchema: customerValitadion,
  });
  const handleSave = async () => {
    const data = formik?.values;
    setLoading(true);
    await CustomerServices.savecustomer(data).then((res) => {
      if (res?.includes("saved")) {
        setLoading(false);
        toast.success("customer successfully saved!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    });
  };

  const getMyContacts = async () => {
    await CustomerServices.getAllContacts().then((res) => {
      if (res) {
        setAllContacts(res);
      }
    });
  };

  useEffect(() => {
    getMyContacts();
  }, []);

  return (
    <Box className="customer">
      <Box className="customer">
        <ToastContainer />
        <Loader loaderValue={loading} />
      </Box>
      <Grid container>
        <Grid item xs={8} className="customerPart1">
          <Box className="inputGroup">
            <FormGroup className="inputHead">
              <label htmlFor="Name" className="Name">
                Name
              </label>
              <TextField
                {...{
                  formik,
                  title: "Name",
                  name: "name",
                  placeholder: "John Doe",
                  checkValidation: true,
                  value: formik?.values?.name,
                }}
                onChange={(e) => {
                  formik.setFieldValue("name", e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup className="inputHead">
              <label htmlFor="Category" className="Category">
                Category
              </label>
              <TextField
                {...{
                  formik,
                  title: "Category",
                  name: "category",
                  placeholder: "lorem lpsum",
                  checkValidation: true,
                  value: formik?.values?.category,
                }}
                onChange={(e) => {
                  formik.setFieldValue("category", e.target.value);
                }}
              />
            </FormGroup>
          </Box>
          <Box className="inputGroup">
            <FormGroup className="inputHead">
              <label htmlFor="Customer Since" className="CustomerSince">
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
                    formik.setFieldValue("customersince", newValue);
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
                select
                {...{
                  formik,
                  title: "Customer Stage",
                  name: "customerstage",
                  checkValidation: true,
                  value: formik?.values?.customerstage,
                }}
                onChange={(e) => {
                  formik.setFieldValue("customerstage", e.target.value);
                }}
                InputProps={{
                  placeholder: "Select a customer stage",
                  disableUnderline: true,
                }}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (value) => {
                    if (!value) {
                      return <p>Customer Stage</p>;
                    }
                    return value;
                  },
                }}
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
                {...{
                  formik,
                  title: "Location",
                  name: "location",
                  placeholder: "Lorem Ipsum",
                  checkValidation: true,
                  value: formik?.values?.location,
                }}
                onChange={(e) => {
                  formik.setFieldValue("location", e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup className="inputHead">
              <label htmlFor="Website" className="Website">
                Website
              </label>
              <TextField
                {...{
                  formik,
                  title: "Website",
                  name: "website",
                  placeholder: "www.loremipsum.com",
                  checkValidation: true,
                  value: formik?.values?.website,
                }}
                onChange={(e) => {
                  formik.setFieldValue("website", e.target.value);
                }}
              />
            </FormGroup>
          </Box>
          <Box className="customTableHead">
            <CustomerTable allContacts={allContacts} />
          </Box>
          <FormGroup className="inputHead">
            <label htmlFor="CustomerNotes" className="CustomerNotes">
              Customer Notes
              <img src={CustomerNotes} alt="img not found" />
            </label>
            <textarea
              {...{
                formik,
                title: "CustomerNotes",
                name: "customernotes",
                placeholder: "Lorem Ipsum",
                checkValidation: true,
                value: formik?.values?.customernotes,
              }}
              onChange={(e) => {
                formik.setFieldValue("customernotes", e.target.value);
              }}
            ></textarea>
          </FormGroup>
        </Grid>
        <Grid item xs={4} className="customerPart2">
          <Box className="quickAccess">
            <h6 className="heading">
              Quick Access <img src={CustomerNotes} alt="img not found" />
            </h6>
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
            <button className="btn" onClick={handleSave}>
              Save
            </button>
            <FormGroup className="inputHead">
              <label htmlFor="Notes" className="Notes">
                Notes
              </label>
              <textarea name="Notes" placeholder="Lorem Ipsum"></textarea>
            </FormGroup>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Customer;
