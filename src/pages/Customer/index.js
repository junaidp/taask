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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import { useNavigate } from "react-router-dom";
import { changeActiveIndex } from "../../features/slice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
import { useEffect, useReducer, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { forwardRef } from "react";
import Slide from "@mui/material/Slide/Slide";
import Loader from "../../components/Loader";
import { saveCustomer } from "../../services/customer.service";
import "react-toastify/dist/ReactToastify.css";
import { countries, customerOption, categoryOption } from "./data";

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

const Customer = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [mainContacts, setMainContacts] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [file, setFile] = useState(null);
  const [uplodedFiles, setUploadedFiles] = useState([]);
  const [Links, setLinks] = useState([]);
  const [activeLink, setActiveLink] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [linkDescription, setLinkDescription] = useState();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [index, setIndex] = useState(null);

  const handleAttachmentSubmit = () => {
    debugger;
    if (index != null) {
      setUploadedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[index].file = file; // Update the specific element in the array
        return updatedFiles;
      });
      setFile(null);
      setOpen1(false);
      return;
    }
    setUploadedFiles([
      ...uplodedFiles,
      {
        file: file,
      },
    ]);
    setFile(null);
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
  const deleteFile = (index) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1); // Update the specific element in the array
      return updatedFiles;
    });
  };
  const editFile = (index) => {
    setIndex(index);
    setOpen1(true);
    setFile(uplodedFiles[index]);
  };

  let [isEditLink, setIsEditLink] = useState(false);
  let [editLinkIndex, setEditLinkIndex] = useState(0);

  const editLink = (index) => {
    setActiveLink(Links[index]?.link);
    setLinkDescription(Links[index]?.description);
    setIndex(index);
    setOpen2(true);
    setIsEditLink(true);
    setEditLinkIndex(Links[index]?.index);
  };

  function handleEditLinkFunction() {
    setLinks((pre) => {
      return pre.map((item, index) =>
        item?.index === editLinkIndex
          ? { ...item, link: activeLink, description: linkDescription }
          : item
      );
    });
    setIsEditLink(false);
    setOpen2("");
  }

  const deleteLink = (index) => {
    setLinks((prevLinks) => {
      const updatedprevLinks = [...prevLinks];
      updatedprevLinks.splice(index, 1); // Update the specific element in the array
      return updatedprevLinks;
    });
  };

  console.log(Links);
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
  const resetData = () => {
    setFile(null);
    setImage(null);
    setPhoto(null);
    setShowDeleteIcon(false);
    setLinks([]);
    setActiveLink([]);
    setUploadedFiles([]);
  };

  let [initialValues, setInitialValues] = useState({
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

  const handleSubmit = async (values, actions) => {
    debugger;
    const customer = { ...values };
    customer.contacts = customer.contacts[0];
    const data = new FormData();
    if (uplodedFiles.length > 0) {
      for (const files of uplodedFiles) {
        data.append("file", files.file);
      }
    } else {
      setShowPopup(true);
      return;
    }
    if (image) {
      // const photoFile = await fetch(photo).then((res) => res.blob());
      data.append("image", image);
    } else {
      toast.error(`${"image is required"}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const customerJson = JSON.stringify(customer);
    const blob = new Blob([customerJson], { type: "application/json" });
    data.append("customer", blob);
    if (!Links.length) {
      toast.error(`${"Link is Required"}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const linkJson = JSON.stringify(Links);
    const blob3 = new Blob([linkJson], { type: "application/json" });
    data.append("link", blob3);
    setLoading(true);
    const res = await saveCustomer(data).catch((err) => {
      setLoading(false);
    });
    setLoading(false);
    if (res.data.includes("saved")) {
      // actions.resetForm();
      // resetData();
      resetData();
      setInitialValues({
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
      toast.success("customer successfully saved!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        navigate("/portfolio");
        dispatch(changeActiveIndex(2));
      }, 3000);
    } else {
      toast.error(`${"Something went wrong on"}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  let fileRef = useRef();

  //
  const handleMainContacts = () => {
    setMainContacts(!mainContacts);
  };
  const handleCloseAttachments = () => {
    setOpen1(false);
    setFile();
  };
  const handleClickOpenAttachmentsModel = () => {
    // if (uplodedFiles?.length < 3) {
    setFile(null);
    fileRef.current.value = null;
    setIndex(null);
    setOpen1(true);
    // }
  };
  const handleClickOpenLinkModel = () => {
    // if (Links?.length < 3) {
    setIndex(null);
    setOpen2(true);
    setIsEditLink(false);
    setActiveLink("");
    setLinkDescription("");
    // }
  };
  const handleLinksSubmit = () => {
    debugger;
    if (index != null) {
      setLinks((prevLinks) => {
        const updatedLinks = [...prevLinks];
        updatedLinks[index] = {
          link: activeLink,
          description: linkDescription,
        }; // Update the specific element in the array
        return updatedLinks;
      });
      setOpen2(false);
      return;
    }
    setLinks([
      ...Links,
      {
        link: activeLink,
        description: linkDescription,
        index: Links.length === 0 ? 1 : Links[Links.length - 1].index + 1,
      },
    ]);
    setActiveLink("");
    setLinkDescription("");
    setOpen2(false);
  };

  const handlePopupClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowPopup(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={customerSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Box className="customer">
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
                    {uplodedFiles?.map((item, index) => (
                      <ListItem disablePadding>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            component="span"
                            style={{ width: "10px" }}
                          >
                            {item.file?.name.includes(".pdf") ? (
                              <PictureAsPdfIcon />
                            ) : (
                              <ImageIcon />
                            )}
                          </IconButton>
                          <p>{item.file?.name}</p>
                          <IconButton
                            sx={{
                              color: "blue",
                            }}
                            onClick={() => editFile(index)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            sx={{
                              // position: "absolute",
                              // top: 18,
                              // right: -40,
                              color: "red",
                            }}
                            onClick={() => deleteFile(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                        {/* <span title={item.description}>{item.description}</span> */}
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

                          <span title={item.description}>
                            {item.description}
                          </span>
                          <div style={{ flex: 1 }}>
                            <IconButton
                              sx={{
                                color: "blue",
                              }}
                              onClick={() => editLink(index)}
                            >
                              <EditIcon />
                            </IconButton>

                            <IconButton
                              sx={{
                                // position: "absolute",
                                // top: 18,
                                // right: -40,
                                color: "red",
                              }}
                              onClick={() => deleteLink(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
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
                      ref={fileRef}
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
                  <label htmlFor="Name" className="Name">
                    Link
                  </label>
                  <TextField
                    fullWidth
                    placeholder="www.link.com"
                    id="link"
                    onChange={(e) => setActiveLink(e.target.value)}
                    value={activeLink}
                  />
                </FormGroup>
                <FormGroup className="inputHead">
                  <label htmlFor="Name" className="Name">
                    Description
                  </label>
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
export default Customer;
