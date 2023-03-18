import React, { useState, useEffect } from "react";
import "./customer.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  DialogActions,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

// conponent
import { useFormik } from "formik";
import CustomerTable from "../../components/CustomerTable";
import CustomerServices from "../../APIs/Customer";
import Loader from "../../components/Loader";

// Images
import CalenderIcon from "../../assets/icons/calender.svg";
import CustomerNotes from "../../assets/icons/CustomerNotes.svg";
import AttachmentIcon from "../../assets/icons/Attachment.svg";
import LinksIcon from "../../assets/icons/Links.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import CloseIcon from "../../assets/icons/close.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
const categoryOption = [
  {
    value: "Tier 1",
    label: "Tier 1",
  },
  {
    value: "Tier 2",
    label: "Tier 2",
  },
  {
    value: "Tier 3",
    label: "Tier 3",
  },
  {
    value: "Tier 4",
    label: "Tier 4",
  },
  {
    value: "Tier 5",
    label: "Tier 5",
  },
];

const countries = [
  { label: "Afghanistan", value: "Afghanistan" },
  { label: "Albania", value: "Albania" },
  { label: "Algeria", value: "Algeria" },
  { label: "Andorra", value: "Andorra" },
  { label: "Angola", value: "Angola" },
  { label: "Antigua & Deps", value: "Antigua & Deps" },
  { label: "Argentina", value: "Argentina" },
  { label: "Armenia", value: "Armenia" },
  { label: "Australia", value: "Australia" },
  { label: "Austria", value: "Austria" },
  { label: "Azerbaijan", value: "Azerbaijan" },
  { label: "Bahamas", value: "Bahamas" },
  { label: "Bahrain", value: "Bahrain" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Barbados", value: "Barbados" },
  { label: "Belarus", value: "Belarus" },
  { label: "Belgium", value: "Belgium" },
  { label: "Belize", value: "Belize" },
  { label: "Benin", value: "Benin" },
  { label: "Bhutan", value: "Bhutan" },
  { label: "Bolivia", value: "Bolivia" },
  { label: "Bosnia Herzegovina", value: "Bosnia Herzegovina" },
  { label: "Botswana", value: "Botswana" },
  { label: "Brazil", value: "Brazil" },
  { label: "Brunei", value: "Brunei" },
  { label: "Bulgaria", value: "Bulgaria" },
  { label: "Burkina", value: "Burkina" },
  { label: "Burundi", value: "Burundi" },
  { label: "Cambodia", value: "Cambodia" },
  { label: "Cameroon", value: "Cameroon" },
  { label: "Canada", value: "Canada" },
  { label: "Cape Verde", value: "Cape Verde" },
  { label: "Central African Rep", value: "Central African Rep" },
  { label: "Chad", value: "Chad" },
  { label: "Chile", value: "Chile" },
  { label: "China", value: "China" },
  { label: "Colombia", value: "Colombia" },
  { label: "Comoros", value: "Comoros" },
  { label: "Congo", value: "Congo" },
  { label: "Congo {Democratic Rep}", value: "Congo {Democratic Rep}" },
  { label: "Costa Rica", value: "Costa Rica" },
  { label: "Croatia", value: "Croatia" },
  { label: "Cuba", value: "Cuba" },
  { label: "Cyprus", value: "Cyprus" },
  { label: "Czech Republic", value: "Czech Republic" },
  { label: "Denmark", value: "Denmark" },
  { label: "Djibouti", value: "Djibouti" },
  { label: "Dominica", value: "Dominica" },
  { label: "Dominican Republic", value: "Dominican Republic" },
  { label: "East Timor", value: "East Timor" },
  { label: "Ecuador", value: "Ecuador" },
  { label: "Egypt", value: "Egypt" },
  { label: "El Salvador", value: "El Salvador" },
  { label: "Equatorial Guinea", value: "Equatorial Guinea" },
  { label: "Eritrea", value: "Eritrea" },
  { label: "Estonia", value: "Estonia" },
  { label: "Ethiopia", value: "Ethiopia" },
  { label: "Fiji", value: "Fiji" },
  { label: "Finland", value: "Finland" },
  { label: "France", value: "France" },
  { label: "Gabon", value: "Gabon" },
  { label: "Gambia", value: "Gambia" },
  { label: "Georgia", value: "Georgia" },
  { label: "Germany", value: "Germany" },
  { label: "Ghana", value: "Ghana" },
  { label: "Greece", value: "Greece" },
  { label: "Grenada", value: "Grenada" },
  { label: "Guatemala", value: "Guatemala" },
  { label: "Guinea", value: "Guinea" },
  { label: "Guinea-Bissau", value: "Guinea-Bissau" },
  { label: "Guyana", value: "Guyana" },
  { label: "Haiti", value: "Haiti" },
  { label: "Honduras", value: "Honduras" },
  { label: "Hungary", value: "Hungary" },
  { label: "Iceland", value: "Iceland" },
  { label: "India", value: "India" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Iran", value: "Iran" },
  { label: "Iraq", value: "Iraq" },
  { label: "Ireland {Republic}", value: "Ireland {Republic}" },
  { label: "Israel", value: "Israel" },
  { label: "Italy", value: "Italy" },
  { label: "Ivory Coast", value: "Ivory Coast" },
  { label: "Jamaica", value: "Jamaica" },
  { label: "Japan", value: "Japan" },
  { label: "Jordan", value: "Jordan" },
  { label: "Kazakhstan", value: "Kazakhstan" },
  { label: "Kenya", value: "Kenya" },
  { label: "Kiribati", value: "Kiribati" },
  { label: "Korea North", value: "Korea North" },
  { label: "Korea South", value: "Korea South" },
  { label: "Kosovo", value: "Kosovo" },
  { label: "Kuwait", value: "Kuwait" },
  { label: "Kyrgyzstan", value: "Kyrgyzstan" },
  { label: "Laos", value: "Laos" },
  { label: "Latvia", value: "Latvia" },
  { label: "Lebanon", value: "Lebanon" },
  { label: "Lesotho", value: "Lesotho" },
  { label: "Liberia", value: "Liberia" },
  { label: "Libya", value: "Libya" },
  { label: "Liechtenstein", value: "Liechtenstein" },
  { label: "Lithuania", value: "Lithuania" },
  { label: "Luxembourg", value: "Luxembourg" },
  { label: "Macedonia", value: "Macedonia" },
  { label: "Madagascar", value: "Madagascar" },
  { label: "Malawi", value: "Malawi" },
  { label: "Malaysia", value: "Malaysia" },
  { label: "Maldives", value: "Maldives" },
  { label: "Mali", value: "Mali" },
  { label: "Malta", value: "Malta" },
  { label: "Marshall Islands", value: "Marshall Islands" },
  { label: "Mauritania", value: "Mauritania" },
  { label: "Mauritius", value: "Mauritius" },
  { label: "Mexico", value: "Mexico" },
  { label: "Micronesia", value: "Micronesia" },
  { label: "Moldova", value: "Moldova" },
  { label: "Monaco", value: "Monaco" },
  { label: "Mongolia", value: "Mongolia" },
  { label: "Montenegro", value: "Montenegro" },
  { label: "Morocco", value: "Morocco" },
  { label: "Mozambique", value: "Mozambique" },
  { label: "Myanmar, {Burma}", value: "Myanmar, {Burma}" },
  { label: "Namibia", value: "Namibia" },
  { label: "Nauru", value: "Nauru" },
  { label: "Nepal", value: "Nepal" },
  { label: "Netherlands", value: "Netherlands" },
  { label: "New Zealand", value: "New Zealand" },
  { label: "Nicaragua", value: "Nicaragua" },
  { label: "Niger", value: "Niger" },
  { label: "Nigeria", value: "Nigeria" },
  { label: "Norway", value: "Norway" },
  { label: "Oman", value: "Oman" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "Palau", value: "Palau" },
  { label: "Panama", value: "Panama" },
  { label: "Papua New Guinea", value: "Papua New Guinea" },
  { label: "Paraguay", value: "Paraguay" },
  { label: "Peru", value: "Peru" },
  { label: "Philippines", value: "Philippines" },
  { label: "Poland", value: "Poland" },
  { label: "Portugal", value: "Portugal" },
  { label: "Qatar", value: "Qatar" },
  { label: "Romania", value: "Romania" },
  { label: "Russian Federation", value: "Russian Federation" },
  { label: "Rwanda", value: "Rwanda" },
  { label: "St Kitts & Nevis", value: "St Kitts & Nevis" },
  { label: "St Lucia", value: "St Lucia" },
  {
    label: "Saint Vincent & the Grenadines",
    value: "Saint Vincent & the Grenadines",
  },
  { label: "Samoa", value: "Samoa" },
  { label: "San Marino", value: "San Marino" },
  { label: "Sao Tome & Principe", value: "Sao Tome & Principe" },
  { label: "Saudi Arabia", value: "Saudi Arabia" },
  { label: "Senegal", value: "Senegal" },
  { label: "Serbia", value: "Serbia" },
  { label: "Seychelles", value: "Seychelles" },
  { label: "Sierra Leone", value: "Sierra Leone" },
  { label: "Singapore", value: "Singapore" },
  { label: "Slovakia", value: "Slovakia" },
  { label: "Slovenia", value: "Slovenia" },
  { label: "Solomon Islands", value: "Solomon Islands" },
  { label: "Somalia", value: "Somalia" },
  { label: "South Africa", value: "South Africa" },
  { label: "South Sudan", value: "South Sudan" },
  { label: "Spain", value: "Spain" },
  { label: "Sri Lanka", value: "Sri Lanka" },
  { label: "Sudan", value: "Sudan" },
  { label: "Suriname", value: "Suriname" },
  { label: "Swaziland", value: "Swaziland" },
  { label: "Sweden", value: "Sweden" },
  { label: "Switzerland", value: "Switzerland" },
  { label: "Syria", value: "Syria" },
  { label: "Taiwan", value: "Taiwan" },
  { label: "Tajikistan", value: "Tajikistan" },
  { label: "Tanzania", value: "Tanzania" },
  { label: "Thailand", value: "Thailand" },
  { label: "Togo", value: "Togo" },
  { label: "Tonga", value: "Tonga" },
  { label: "Trinidad & Tobago", value: "Trinidad & Tobago" },
  { label: "Tunisia", value: "Tunisia" },
  { label: "Turkey", value: "Turkey" },
  { label: "Turkmenistan", value: "Turkmenistan" },
  { label: "Tuvalu", value: "Tuvalu" },
  { label: "Uganda", value: "Uganda" },
  { label: "Ukraine", value: "Ukraine" },
  { label: "United Arab Emirates", value: "United Arab Emirates" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "United States", value: "United States" },
  { label: "Uruguay", value: "Uruguay" },
  { label: "Uzbekistan", value: "Uzbekistan" },
  { label: "Vanuatu", value: "Vanuatu" },
  { label: "Vatican City", value: "Vatican City" },
  { label: "Venezuela", value: "Venezuela" },
  { label: "Vietnam", value: "Vietnam" },
  { label: "Yemen", value: "Yemen" },
  { label: "Zambia", value: "Zambia" },
  { label: "Zimbabwe", value: "Zimbabwe" },
];
let Customer = () => {
  const [value, setValue] = React.useState(dayjs("2023-12-02"));
  const [loading, setLoading] = useState(false);
  const [mainContacts, setMainContacts] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [country, setCountry] = useState("United Kingdom");
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(null);
  const [uplodedFiles, setUploadedFiles] = useState([]);
  const [link, setlink] = useState();
  const [linkDescription, setLinkDescription] = useState();
  const [Links, setLinks] = useState([]);

  const onUpload = (e) => {
    setFile(e?.target?.files[0]);
  };
  const handleCloseAttachments = () => {
    setOpen1(false);
  };
  const handleClickOpenAttachmentsModel = () => {
    if (uplodedFiles?.length < 3) {
      setOpen1(true);
    }
  };
  const handleCloseLink = () => {
    setOpen2(false);
  };
  const handleClickOpenLinkModel = () => {
    if (Links?.length < 3) {
      setOpen2(true);
    }
  };

  const handleMainContacts = () => {
    setMainContacts(!mainContacts);
  };

  const handleAttachmentSubmit = () => {
    setUploadedFiles([
      ...uplodedFiles,
      {
        file: file,
        description: description,
      },
    ]);
    setOpen1(false);
  };

  const handleLinksSubmit = () => {
    setLinks([  
      ...Links,
      {
        link: link,
        description: linkDescription,
      },
    ]);
    setOpen2(false);

  };

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
                select
                {...{
                  formik,
                  title: "Category",
                  name: "category",
                  checkValidation: true,
                  value: formik?.values?.category,
                }}
                onChange={(e) => {
                  formik.setFieldValue("category", e.target.value);
                }}
                InputProps={{
                  placeholder: "Select a Category",
                  disableUnderline: true,
                }}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (value) => {
                    if (!value) {
                      return <p>Category</p>;
                    }
                    return value;
                  },
                }}
              >
                {categoryOption.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
              <label htmlFor="location">Location</label>
              <TextField
                select
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
                InputProps={{
                  placeholder: "Select Your Country",
                  disableUnderline: true,
                }}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (label, value) => {
                    if (!label) {
                      return <p>Select Your Country</p>;
                    }
                    return label;
                  },
                }}
                MenuProps={{
                  style: {
                    maxHeight: "200px !important",
                  },
                }}
              >
                {countries.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
            {/* <CustomerTable allContacts={allContacts} /> */}
            <Button
              className="btn mainContactsBtn"
              onClick={handleMainContacts}
            >
              <img src={PlusIcon} alt="not found" /> Main Contacts
            </Button>
            {mainContacts == true ? (
              <Box className="mainContactsForm">
                <Box className="inputGroup">
                  <FormGroup className="inputHead">
                    <label htmlFor="S/N">S/N</label>
                    <TextField placeholder="S/N" />
                  </FormGroup>
                  <FormGroup className="inputHead">
                    <label htmlFor="Name">Name</label>
                    <TextField placeholder="John Doe" id="Name" />
                  </FormGroup>
                </Box>
                <Box className="inputGroup">
                  <FormGroup className="inputHead">
                    <label htmlFor="JobTitle">Job Title</label>
                    <TextField placeholder="Job Title" id="JobTitle" />
                  </FormGroup>
                  <FormGroup className="inputHead">
                    <label htmlFor="location">Location</label>
                    <TextField
                      select
                      title="Location"
                      name="location"
                      InputProps={{
                        placeholder: "Select Your Country",
                        disableUnderline: true,
                      }}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (label, value) => {
                          if (!label) {
                            return <p>Select Your Country</p>;
                          }
                          return label;
                        },
                      }}
                      MenuProps={{
                        style: {
                          maxHeight: "200px !important",
                        },
                      }}
                    >
                      {countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormGroup>
                </Box>
                <Box className="inputGroup">
                  <FormGroup className="inputHead">
                    <label htmlFor="EmailAddress">Email Address.</label>
                    <TextField
                      placeholder=" Email Address."
                      id="EmailAddress"
                    />
                  </FormGroup>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Box>
          <FormGroup
            className="inputHead"
            sx={{ marginBottom: "20px !important" }}
          >
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
          <Button className="btn saveChangeBtn">Save Changes</Button>
        </Grid>
        <Grid item xs={4} className="customerPart2">
          <Box className="quickAccess">
            <h5 className="heading">
              Quick Access <img src={CustomerNotes} alt="img not found" />
            </h5>
            <Box className="AttachmentHead">
              <h6>
                <span>
                  <img
                    src={AttachmentIcon}
                    alt="img not found"
                    className="Icon"
                  />
                  Attachment
                </span>
                <span>
                  <img
                    src={PlusIcon}
                    alt="img not found"
                    onClick={() => handleClickOpenAttachmentsModel()}
                  />
                </span>
              </h6>
            </Box>
            <Box>
              <List className="list">
                {uplodedFiles?.map((item) => (
                  <ListItem disablePadding>
                    <p>{item.file?.name}</p>
                    <span title={item.description}>{item.description}</span>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box className="AttachmentHead" sx={{ marginBottom: "16px" }}>
              <h6>
                <span>
                  <img src={LinksIcon} alt="img not found" className="Icon" />
                  Links
                </span>
                <span>
                  <img
                    src={PlusIcon}
                    alt="img not found"
                    onClick={() => handleClickOpenLinkModel()}
                  />
                </span>
              </h6>
              <Box>
                <List className="list">
                  {Links?.map((item) => (
                    <ListItem disablePadding>
                      <p>{item.link}</p>
                      <span title={item.description}>{item.description}</span>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
            <FormGroup className="inputHead">
              <label htmlFor="Notes" className="Notes">
                Notes
              </label>
              <textarea name="Notes" placeholder="Lorem Ipsum"></textarea>
            </FormGroup>
            <Button className="btn" onClick={handleSave}>
              Save link
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAttachments}
        aria-describedby="alert-dialog-slide-description"
        className="attachmentsModel customerAttachmentsModel"
      >
        <DialogTitle className="titleHead">
          Upload Attachments
          <img
            src={CloseIcon}
            alt="not found"
            onClick={handleCloseAttachments}
          />
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              paddingTop: "24px",
            }}
          >
            <FormGroup className="inputHead">
              <Box className="uploadFileHead">
                <TextField
                  fullWidth
                  placeholder="Lorem Ipsum"
                  value={file?.name}
                  id="file"
                />
                <Button
                  variant="contained"
                  component="label"
                  className="uploadFileBtn"
                >
                  Browse
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
            <FormGroup className="inputHead">
              <textarea
                name="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "end" }}>
          <Button
            className="btn2 btn3"
            sx={{ fontSize: "10px", width: "150px !important" }}
            onClick={handleAttachmentSubmit}
          >
            Save Attachment
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseLink}
        aria-describedby="alert-dialog-slide-description"
        className="attachmentsModel customerAttachmentsModel"
      >
        <DialogTitle className="titleHead">
          save links
          <img src={CloseIcon} alt="not found" onClick={handleCloseLink} />
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              paddingTop: "24px",
            }}
          >
            <FormGroup className="inputHead">
              <TextField
                fullWidth
                placeholder="www.link.com"
                id="link"
                onChange={(e) => setlink(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="inputHead">
              <textarea
                name="description"
                placeholder="description"
                onChange={(e) => setLinkDescription(e.target.value)}
              ></textarea>
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "end" }}>
          <Button
            className="btn2 btn3"
            sx={{ fontSize: "10px", width: "150px !important" }}
            onClick={handleLinksSubmit}
          >
            save Link
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Customer;
