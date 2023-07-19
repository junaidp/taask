import { Formik, useFormik, useFormikContext } from "formik";
import { customerSchema } from "../../Validation";
import "./customer.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalenderIcon from "../../assets/icons/calender.svg";
import CustomerNotes from "../../assets/icons/CustomerNotes.svg";
import AttachmentIcon from "../../assets/icons/Attachment.svg";
import LinksIcon from "../../assets/icons/Links.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import CloseIcon from "../../assets/icons/close.svg";
import MuiAlert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { forwardRef } from "react";
import Slide from "@mui/material/Slide/Slide";
import Loader from "../../components/Loader";
import {
  addResources,
  deleteResource,
  getCustomerBySerialNumber,
  saveCustomer,
  updateCustomer,
} from "../../services/customer.service";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
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
const CustomerDetail = () => {
  const [value, setValue] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [mainContacts, setMainContacts] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [file, setFile] = useState(null);
  const [uplodedFiles, setUploadedFiles] = useState([]);
  const [Links, setLinks] = useState([]);
  const [link, setlink] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [linkDescription, setLinkDescription] = useState();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const location = useLocation();
  const [customerId, setCustomerId] = useState("");
  const [index, setIndex] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLink, setisLink] = useState(false);
  const [customerDetail, setCustomerDetail] = useState({
    category: "",
    name: "",
    location: "",
    website: "",
    customerStage: "",
    customerSince: "",
    customerNotes: "",
    contacts: [
      {
        name: "",
        emailAddress: "",
        jobTitle: "",
        location: "",
      },
    ],
  });
  useEffect(() => {
    getCustomer(location.pathname.split("/").pop());
  }, []);
  const getCustomer = async (serialNumber) => {
    try {
      setLoading(true);
      const { data } = await getCustomerBySerialNumber(serialNumber);
      setLoading(false);
      debugger;
      if (typeof data == "object") {
        setCustomerId(data.serialNumber);
        setValue(data.customerSince);
        setCustomerDetail({
          category: data.category,
          name: data.name,
          location: data.location,
          website: data.website,
          customerStage: data.customerStage,
          customerSince: data.customerSince,
          customerNotes: data.customerNotes,
          contacts: [
            {
              name: data.contacts.name,
              emailAddress: data.contacts.emailAddress,
              jobTitle: data.contacts.jobTitle,
              location: data.contacts.location,
            },
          ],
        });
        debugger;
        const photoURL = `data:${data.image.contenttype};base64,` + data.image.data;
        setPhoto(photoURL);
        setShowDeleteIcon(true);
        setUploadedFiles([...data.customerFiles]);
        setLinks([...data.ustomerLink]);
        console.log(customerDetail);
      } else {
        toast.error("Record Not Found", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      }
    } catch (err) {}
  };
  const handleAttachmentSubmit = async () => {
    setUploadedFiles([
      ...uplodedFiles,
      {
        file: file,
      },
    ]);
    try {
      const data = new FormData();
      if (file) {
        data.append("file", file);
      } else {
        setShowPopup(true);
        return;
      }
      setLoading(true);
      const { data: resp } = await addResources(customerId,data);
      if(resp){
        setLoading(false);
        toast.success("File added sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

      }
      else{
        setLoading(false);
        toast.error("Something went wrong on adding file", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      setLoading(false);
    }
    setOpen1(false);
  };
  const handleCloseLink = () => {
    setOpen2(false);
  };
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(URL.createObjectURL(file));
      setImage(file);
      setShowDeleteIcon(true);
      event.target.value = "";
    } else {
      event.target.value = "";
      toast.error("Only image file is allowed", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  };
  const handleDeletePhoto = () => {
    setPhoto(null);
    setImage(null);
    setShowDeleteIcon(false);
  };
  const onUpload = (e) => {
    const file = e.target.files[0];
    debugger;
    if (file && file.type.startsWith("application/pdf")) {
      setFile(file);
      e.target.value = "";
    } else {
      e.target.value = "";
      toast.error("Only pdf file is allowed", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteAttachment = async () => {
    try {
      setLoading(true);
      const { data: resp } = await deleteResource(attachment.uuid,'file');
      setLoading(false);
      if (resp) {
        toast.success("Attachemnt Deleted Sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        uplodedFiles.splice(index, 1);
        setOpen(false);
      } else {
        toast.error("Something went wrong on deleting attachment", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const deleteLink = async () => {
    try {
      setLoading(true);
      const { data: resp } = await deleteResource(attachment.uuid,'link');
      setLoading(false);
      if (resp) {
        toast.success("Link Deleted Sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        Links.splice(index, 1);
        setOpen(false);
      } else {
        toast.error("Something went wrong on deleting link", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleSubmit = async (values, actions) => {
    debugger;
    const customer = { ...values };
    customer.contacts = customer.contacts[0];
    const data = new FormData();
    if (image) {
      data.append("image", image);
    }

    const customerJson = JSON.stringify(customer);
    const blob = new Blob([customerJson], { type: "application/json" });
    data.append("customer", blob);
    setLoading(true);
    const res = await updateCustomer(data, customerId).catch((err) => {
      setLoading(false);
    });
    setLoading(false);
    if (typeof res.data == "string") {
      toast.success("customer successfully updated!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(`${"Something went wrong on updating customer"}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleMainContacts = () => {
    setMainContacts(!mainContacts);
  };
  const handleCloseAttachments = () => {
    setOpen1(false);
  };
  const handleClickOpenAttachmentsModel = () => {
    // if (uplodedFiles?.length < 3) {
    setOpen1(true);
    // }
  };
  const handleClickOpenLinkModel = () => {
    // if (Links?.length < 3) {
    setOpen2(true);
    // }
  };
  const handleLinksSubmit = async () => {
    setLinks([
      ...Links,
      {
        link: link,
        description: linkDescription,
      },
    ]);
    try {
      const data =  new FormData();
      const linkJson = JSON.stringify([{
        link: link,
        description: linkDescription,
      }],);
      const blob3 = new Blob([linkJson], { type: "application/json" });
      data.append("link",blob3);
      setLoading(true);
      const { data: resp } = await addResources(customerId,data);
      if(resp){
        setLoading(false);
        toast.success("Link added sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setOpen2(false);

      }
      else{
        setLoading(false);
        toast.error("Something went wrong on adding Link", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      
    } catch (error) {
      setLoading(false);
    }
  };
  const handlePopupClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowPopup(false);
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={customerDetail}
      validationSchema={customerSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Box className="customer">
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this {isLink?'Link':'Attachment'}?
              </DialogContentText>
            </DialogContent>
            {/* <DialogActions> */}
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={isLink?deleteLink:deleteAttachment} color="secondary" autoFocus>
              Delete
            </Button>
            {/* </DialogActions> */}
          </Dialog>
          <Grid container>
            <Grid item xs={8} className="customerPart1">
              <Box className="profileHead">
                <label htmlFor="photo-upload">
                  <input
                    id="photo-upload"
                    className="photo-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handlePhotoUpload}
                  />
                  <IconButton
                    sx={{ width: 80, height: 80 }}
                    component="span"
                    color="primary"
                    className="profile"
                  >
                    {photo ? (
                      <>
                        <Avatar
                          sx={{ width: 80, height: 80 }}
                          alt="Customer photo"
                          src={photo}
                          className="profileAvatar"
                        />
                        {showDeleteIcon && (
                          <IconButton
                            sx={{
                              position: "absolute",
                              top: 18,
                              right: -40,
                              color: "red",
                            }}
                            onClick={handleDeletePhoto}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </>
                    ) : (
                      <AddPhotoAlternateIcon
                        sx={{ fontSize: 48, color: "#2b5b6d" }}
                      />
                    )}
                  </IconButton>
                </label>
              </Box>
              <Box className="inputGroup">
                <FormGroup className="inputHead">
                  <label htmlFor="Name" className="Name">
                    Name *
                  </label>
                  <TextField
                    name="name"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="input-error">{formik.errors.name}</p>
                  )}
                </FormGroup>
                <FormGroup className="inputHead">
                  <label htmlFor="Category" className="Category">
                    Category *
                  </label>
                  <TextField
                    select
                    name="category"
                    placeholder="Select Category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{
                      placeholder: "Select Category",
                      disableUnderline: true,
                    }}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (label, value) => {
                        if (!label) {
                          return <p>Select Category</p>;
                        }
                        return label;
                      },
                    }}
                  >
                    {categoryOption.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.category && formik.errors.category ? (
                    <p className="input-error">{formik.errors.category}</p>
                  ) : null}
                </FormGroup>
              </Box>
              <Box className="inputGroup">
                <FormGroup className="inputHead">
                  <label htmlFor="Customer Since" className="CustomerSince">
                    Customer Since *
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
                      showToolbar={false}
                      components={{
                        OpenPickerIcon: CustomCalendarIcon,
                        RightArrowButton: ArrowRightRoundedIcon,
                        LeftArrowButton: ArrowLeftRoundedIcon,
                      }}
                      onChange={(newValue) => {
                        setValue(newValue);
                        formik.setFieldValue("customerSince", newValue);
                      }}
                      showDaysOutsideCurrentMonth
                      dayOfWeekFormatter={(day) => getDay(day)}
                      renderInput={(params) => (
                        <TextField {...params} name="customerSince" />
                      )}
                    />
                    {formik.touched.customerSince &&
                      formik.errors.customerSince && (
                        <p className="input-error">
                          {formik.errors.customerSince}
                        </p>
                      )}
                  </LocalizationProvider>
                </FormGroup>
                <FormGroup className="inputHead">
                  <label htmlFor="CustomerStage" className="CustomerStage">
                    Customer Stage *
                  </label>
                  <TextField
                    select
                    name="customerStage"
                    placeholder="Select a customer stage"
                    value={formik.values.customerStage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{
                      placeholder: "Select a customer stage",
                      disableUnderline: true,
                    }}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (label, value) => {
                        if (!label) {
                          return <p>Select a customer stage</p>;
                        }
                        return label;
                      },
                    }}
                  >
                    {customerOption.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.customerStage &&
                  formik.errors.customerStage ? (
                    <p className="input-error">{formik.errors.customerStage}</p>
                  ) : null}
                </FormGroup>
              </Box>
              <Box className="inputGroup">
                <FormGroup className="inputHead">
                  <label htmlFor="location">Location</label>
                  <TextField
                    select
                    name="location"
                    placeholder="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{
                      placeholder: "Select Your Location",
                      disableUnderline: true,
                    }}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (label, value) => {
                        if (!label) {
                          return <p>Select Your Location</p>;
                        }
                        return label;
                      },
                    }}
                  >
                    {countries.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.location && formik.errors.location ? (
                    <p className="input-error">{formik.errors.location}</p>
                  ) : null}
                </FormGroup>
                <FormGroup className="inputHead">
                  <label htmlFor="Website" className="Website">
                    Website
                  </label>
                  <TextField
                    name="website"
                    placeholder="website"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.website && formik.errors.website ? (
                    <p className="input-error">{formik.errors.website}</p>
                  ) : null}
                </FormGroup>
              </Box>
              <Box className="customTableHead">
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
                        <label htmlFor="Name">Name *</label>
                        <TextField
                          {...{
                            formik,
                            title: "Name",
                            name: "contactsName",
                            placeholder: "John Doe",
                            checkValidation: true,
                            // value: formik?.values?.contacts.name,
                          }}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "contacts.[0].name",
                              e.target.value
                            );
                          }}
                        />

                        {formik.errors.contacts &&
                          formik.errors.contacts[0] && (
                            <p className="input-error">
                              {formik.errors.contacts[0].name}
                            </p>
                          )}
                      </FormGroup>
                      <FormGroup className="inputHead">
                        <label htmlFor="EmailAddress">Email Address.</label>
                        <TextField
                          type="email"
                          {...{
                            formik,
                            title: "EmailAddress",
                            name: "emailAddress",
                            placeholder: "Email Address",
                            checkValidation: true,
                            // value: formik?.values?.contacts?.emailAddress,
                          }}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "contacts.0.emailAddress",
                              e.target.value
                            );
                          }}
                        />
                        {formik.errors.contacts &&
                          formik.errors.contacts[0] && (
                            <p className="input-error">
                              {formik.errors.contacts[0].emailAddress}
                            </p>
                          )}
                      </FormGroup>
                    </Box>
                    <Box className="inputGroup">
                      <FormGroup className="inputHead">
                        <label htmlFor="JobTitle">Job Title *</label>
                        <TextField
                          {...{
                            formik,
                            title: "JobTitle",
                            name: "jobTitle",
                            placeholder: "Job Title",
                            checkValidation: true,
                            // value: formik?.values?.contacts?.jobTitle,
                          }}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "contacts.0.jobTitle",
                              e.target.value
                            );
                          }}
                        />
                        {formik.errors.contacts &&
                          formik.errors.contacts[0] && (
                            <p className="input-error">
                              {formik.errors.contacts[0].jobTitle}
                            </p>
                          )}
                      </FormGroup>
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
                            // value: formik?.values?.contacts.location,
                          }}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "contacts.0.location",
                              e.target.value
                            );
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
                        {formik.errors.contacts &&
                          formik.errors.contacts[0] && (
                            <p className="input-error">
                              {formik.errors.contacts[0].location}
                            </p>
                          )}
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
                  name="customerNotes"
                  placeholder="customerNotes"
                  value={formik.values.customerNotes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
              </FormGroup>
              <Button
                className="btn saveChangeBtn"
                content="save"
                onClick={formik.handleSubmit}
              >
                Save Changes
              </Button>
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
                        onClick={handleClickOpenAttachmentsModel}
                      />
                    </span>
                  </h6>
                </Box>
                <Box>
                  <List className="list">
                    {uplodedFiles?.map((item) => (
                      <ListItem disablePadding>
                         <div style={{ display: "flex", alignItems: "center" }}>
                         <p>
                          {item.file?.name ? item.file?.name : item?.filename}
                        </p>
                        <MenuItem sx={{ color: "blue" }}>
                          <EditIcon
                            sx={{ mr: 2 }}
                            // onClick={() => {
                            //   setOpen(true);
                            //   setAttachment(item);
                            //   setIndex(index);
                            //   setisLink(false)
                            // }}
                            onClick={handleClickOpenAttachmentsModel}
                          />
                        </MenuItem>
                        <MenuItem sx={{ color: "error.main" }}>
                          <DeleteIcon
                            sx={{ mr: 2 }}
                            onClick={() => {
                              setOpen(true);
                              setAttachment(item);
                              setIndex(index);
                              setisLink(false)
                            }}
                          />
                        </MenuItem>
                         </div>
                        
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box className="AttachmentHead" sx={{ marginBottom: "16px" }}>
                  <h6>
                    <span>
                      <img
                        src={LinksIcon}
                        alt="img not found"
                        className="Icon"
                      />
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
                          <div style={{ display: "flex", alignItems: "center" }}>
                          <span title={item.description}>
                            {item.description}
                          </span>
                          <MenuItem sx={{ color: "blue" }}>
                          <EditIcon
                            sx={{ mr: 2 }}
                            // onClick={() => {
                            //   setOpen(true);
                            //   setAttachment(item);
                            //   setIndex(index);
                            //   setisLink(false)
                            // }}
                            onClick={handleClickOpenLinkModel}
                          />
                        </MenuItem>
                          <MenuItem sx={{ color: "error.main" }}>
                          <DeleteIcon
                            sx={{ mr: 2 }}
                            onClick={() => {
                              setOpen(true);
                              setAttachment(item);
                              setIndex(index);
                              setisLink(true)
                            }}
                          />
                        </MenuItem>
                          </div>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
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
                      <input hidden multiple type="file" onChange={onUpload} />
                    </Button>
                  </Box>
                </FormGroup>
                {/* <FormGroup className="inputHead">
              <textarea
                name="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </FormGroup> */}
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
          <Snackbar
            open={showPopup}
            autoHideDuration={4000}
            onClose={handlePopupClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              onClose={handlePopupClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Please select a Attachment.
            </MuiAlert>
          </Snackbar>
          <ToastContainer />
          <Loader loaderValue={loading} />
        </Box>
      )}
    </Formik>
  );
};
export default CustomerDetail;
