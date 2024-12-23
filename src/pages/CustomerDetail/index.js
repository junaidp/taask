import { Formik } from "formik";
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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { countries, customerOption, categoryOption } from "./data";
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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import {
  addResources,
  deleteResource,
  getCustomerBySerialNumber,
  updateCustomer,
} from "../../services/customer.service";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { changeActiveIndex } from "../../features/slice";
import axios from "axios";

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

const CustomerDetail = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [mainContacts, setMainContacts] = useState(true);
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
      console.log(data);
      setLoading(false);
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
        const photoURL =
          `data:${data.image.contenttype};base64,` + data.image.data;
        setPhoto(photoURL);
        setShowDeleteIcon(true);
        setUploadedFiles([...data.customerFiles]);
        setLinks([...data.customerLink]);
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
      const { data: resp } = await addResources(customerId, data);
      if (resp) {
        setLoading(false);
        toast.success("File added sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
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
      const { data: resp } = await deleteResource(attachment.uuid, "file");
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
      const { data: resp } = await deleteResource(attachment.uuid, "link");
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

  let [isEditLink, setIsEditLink] = useState(false);
  let [editLinkId, setEditLinkId] = useState(0);

  const editLink = (index) => {
    setlink(Links[index]?.link);
    setLinkDescription(Links[index]?.description);
    setIndex(index);
    setOpen2(true);
    setIsEditLink(true);
    setEditLinkId(Links[index]?.uuid);
  };

  const handleEditLinkFunction = async () => {
    if (link && linkDescription) {
      setLoading(true);
      setLinks((pre) => {
        return pre.map((item, index) =>
          item?.uuid === editLinkId
            ? { ...item, link: link, description: linkDescription }
            : item
        );
      });
      try {
        const form = new FormData();
        const data = JSON.stringify([
          {
            link: link,
            description: linkDescription,
          },
        ]);
        form.append(
          "link",
          new Blob([JSON.stringify(data)], { type: "application/json" })
        );
        form.append("linkUuid", editLinkId);

        let res = await fetch(
          `https://testjava.javaserver.eu/resources?customerId=${customerId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: form,
          }
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      setOpen2("");
    }
  };

  const handleSubmit = async (values, actions) => {
    const customer = { ...values };
    customer.contacts = customer.contacts[0];
    const data = new FormData();
    // if (image) {
    // data.append("file", image);
    // }

    const customerJson = JSON.stringify(customer);
    const blob = new Blob([customerJson], { type: "application/json" });
    data.append("customer", blob);
    data.append("userid", customerId);
    setLoading(true);
    const res = await updateCustomer(data).catch((err) => {
      setLoading(false);
    });
    setLoading(false);
    if (typeof res.data == "string") {
      toast.success("customer successfully updated!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        dispatch(changeActiveIndex(2));
        navigate("/portfolio");
      }, 3000);
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

  let [isEditFile, setIsEditFile] = useState(false);
  let [editFileId, setEditFileId] = useState("");
  const handleClickOpenUpdateModel = (item) => {
    setIsEditFile(true);
    setEditFileId(item?.uuid);
    setOpen1(true);
    setFile(item);
  };

  function handleEditAttachmentBtn() {
    setFile(null);
    setIsEditFile(false);
    setEditFileId("");
    setOpen1(false);
  }

  function handleClickOpenAttachmentsModel() {
    setOpen1(true);
    setIndex(index);
    setIsEditFile(false);
    setEditFileId("");
    setFile(null);
  }

  const handleClickOpenLinkModel = () => {
    setOpen2(true);
    setlink("");
    setLinkDescription("");
    setEditLinkId("");
    setIsEditLink(false);
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
      const data = new FormData();
      const linkJson = JSON.stringify([
        {
          link: link,
          description: linkDescription,
        },
      ]);
      const blob3 = new Blob([linkJson], { type: "application/json" });
      data.append("link", blob3);
      setLoading(true);
      const { data: resp } = await addResources(customerId, data);
      if (resp) {
        setLoading(false);
        toast.success("Link added sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setOpen2(false);
      } else {
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
                Are you sure you want to delete this{" "}
                {isLink ? "Link" : "Attachment"}?
              </DialogContentText>
            </DialogContent>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={isLink ? deleteLink : deleteAttachment}
              color="secondary"
              autoFocus
            >
              Delete
            </Button>
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
                            value: formik?.values?.contacts[0].name,
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
                            value: formik?.values?.contacts[0]?.emailAddress,
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
                            value: formik?.values?.contacts[0]?.jobTitle,
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
                            value: formik?.values?.contacts[0].location,
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
                Edit Customer
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
                          {/* <IconButton
                            component="span"
                            style={{ width: "10px" }}
                          >
                            {item?.filename?.includes(".pdf") ||
                            item?.file?.name.includes(".pdf") ? (
                              <PictureAsPdfIcon />
                            ) : (
                              <ImageIcon />
                            )}
                          </IconButton> */}
                          <p>
                            {item.file?.name ? item.file?.name : item?.filename}
                          </p>
                          <MenuItem sx={{ color: "blue" }}>
                            <EditIcon
                              sx={{ mr: 2 }}
                              onClick={() => handleClickOpenUpdateModel(item)}
                            />
                          </MenuItem>
                          <MenuItem sx={{ color: "error.main" }}>
                            <DeleteIcon
                              sx={{ mr: 2 }}
                              onClick={() => {
                                setOpen(true);
                                setAttachment(item);
                                setIndex(index);
                                setisLink(false);
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
                      {Links?.map((item, index) => (
                        <ListItem disablePadding>
                          <div style={{ display: "flex" }}>
                            <LinkIcon />
                            <a
                              style={{ paddingLeft: "5px" }}
                              href={item.link}
                              target="_blank"
                            >
                              <p>{item.link}</p>
                            </a>
                          </div>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span title={item.description}>
                              {item.description}
                            </span>
                            <MenuItem sx={{ color: "blue" }}>
                              <EditIcon
                                sx={{ mr: 2 }}
                                onClick={() => editLink(index)}
                              />
                            </MenuItem>
                            <MenuItem sx={{ color: "error.main" }}>
                              <DeleteIcon
                                sx={{ mr: 2 }}
                                onClick={() => {
                                  setOpen(true);
                                  setAttachment(item);
                                  setIndex(index);
                                  setisLink(true);
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
                      placeholder={file?.filename}
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
              </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "end" }}>
              {!isEditFile ? (
                <Button
                  className="btn2 btn3"
                  sx={{ fontSize: "10px", width: "150px !important" }}
                  onClick={handleAttachmentSubmit}
                >
                  Save Attachment
                </Button>
              ) : (
                <Button
                  className="btn2 btn3"
                  sx={{ fontSize: "10px", width: "150px !important" }}
                  onClick={handleEditAttachmentBtn}
                >
                  Edit Attachment
                </Button>
              )}
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
                    value={link}
                  />
                </FormGroup>
                <FormGroup className="inputHead">
                  <textarea
                    name="description"
                    placeholder="description"
                    onChange={(e) => setLinkDescription(e.target.value)}
                    value={linkDescription}
                  ></textarea>
                </FormGroup>
              </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "end" }}>
              {!isEditLink ? (
                <Button
                  className="btn2 btn3"
                  sx={{ fontSize: "10px", width: "150px !important" }}
                  onClick={handleLinksSubmit}
                >
                  save Link
                </Button>
              ) : (
                <Button
                  className="btn2 btn3"
                  sx={{ fontSize: "10px", width: "150px !important" }}
                  onClick={handleEditLinkFunction}
                >
                  Edit Link
                </Button>
              )}
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
