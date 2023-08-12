import React, { useEffect, useRef, useState } from "react";
import "./Resources.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
// Mui imports
import {
  Box,
  Grid,
  Typography,
  FormGroup,
  TextField,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Slide,
  IconButton,
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import * as Yup from "yup";
// import FormData from "form-data";
import CustomerServices from "../../APIs/Customer";
import Loader from "../../components/Loader";
import CustomPagination from "../../components/Pagination";
// Images
import AttachmentsIcon from "../../assets/icons/Attachment.svg";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SearchIcon from "../../assets/icons/search.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import LinksIcon from "../../assets/icons/Links.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import CloseIcon from "../../assets/icons/close.svg";
import {
  addResources,
  deleteResource,
  getResource,
  editResources,
} from "../../services/customer.service";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Resources = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [file, setFile] = useState([]);
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [link, setLink] = useState();
  const [linkDescription, setLinkDescription] = useState();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  let userId = localStorage.getItem("token");
  // const [currentItems, setCurrentItems] = useState([]);
  const [allResources, setAllResources] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [allLink, setAllLink] = useState([]);
  const [allLinks, setAllLinks] = useState([]);
  const [isLink, setisLink] = useState(false);
  const [uuid, setUuid] = useState(false);
  const text = useRef(null);

  // The Links
  let [linkVal, setLinkVal] = useState("");
  let [descriptionVal, setDescritionVal] = useState("");
  let [linkValError, setLinkValError] = useState(false);
  let [linkDescriptionError, setLinkDescriptionError] = useState(false);

  const onUpload = (e) => {
    debugger;
    const uploadfile = e?.target?.files;
    setFile([...uploadfile]);
  };
  const handleCloseAttachments = () => {
    setOpen1(false);
    setFile([]);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenAttachmentsModel = () => {
    setOpen1(true);
    setEditFile(false);
    setEditFileId("");
  };
  const handleCloseLinks = () => {
    setOpen2(false);
  };
  const handleClickOpenLinksModel = () => {
    setEditLink(false);
    setEditLinkId("");
    setOpen2(true);
    setLinkVal("");
    setDescritionVal("");
  };
  const handleCloseBrowse = () => {
    setOpen3(false);
  };
  const handleClickOpenBrowse = () => {
    setOpen3(true);
  };
  const handleTextFieldClick = (item) => {
    window.open(item.link, "_blank");
  };

  const deleteAttachment = async () => {
    try {
      setLoading(true);
      const { data: resp } = await deleteResource(uuid, "file");
      setLoading(false);
      if (resp) {
        toast.success("Attachemnt Deleted Sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        allResources.splice(
          allResources.findIndex((x) => x.uuid == uuid),
          1
        );
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

  const deleteLinks = async () => {
    try {
      setLoading(true);
      const { data: resp } = await deleteResource(uuid, "link");
      setLoading(false);
      if (resp) {
        toast.success("Link Deleted Sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        allLinks.splice(
          allLinks.findIndex((x) => x.uuid == uuid),
          1
        );
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

  const customerValitadion = Yup.object().shape({
    name: Yup.string().required(),
  });
  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      id: "",
      link: "",
      AttachmentsLink: "",
      description: "",
      userId: userId,
    },
    validationSchema: customerValitadion,
  });
  const handleResourcesSave = async () => {
    const data = new FormData();
    if (file?.length > 0) {
      for (const f of file) {
        data.append("file", f);
      }
    }
    if (file.length > 0) {
      setLoading(true);

      await addResources("", data)
        .then((res) => {
          setLoading(false);
          if (typeof res.data == "string") {
            setOpen1(false);
            toast.success(`File Added Sucessfully`, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setFile([]);
            getResources();
          } else {
            toast.error(`Something went wrong on adding file`, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };
  const handleLinksSave = async () => {
    if (linkVal === "") {
      setLinkValError(true);
    } else {
      setLinkValError(false);
    }

    if (descriptionVal === "") {
      setLinkDescriptionError(true);
    } else {
      setLinkDescriptionError(false);
    }

    if (linkVal !== "" && descriptionVal !== "") {
      const data = {
        link: linkVal,
        description: descriptionVal,
      };
      const formData = new FormData();
      const linkJson = JSON.stringify([data]);
      const blob3 = new Blob([linkJson], { type: "application/json" });
      formData.append("link", blob3);
      await addResources("", formData)
        .then((res) => {
          setLoading(false);
          if (typeof res.data == "string") {
            setOpen2(false);
            toast.success(`Link Added Sucessfully`, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setLinks([]);
            getResources();
            setLinkVal("");
            setDescritionVal("");
          } else {
            toast.error(`Something went wrong on adding link`, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  const getResources = async () => {
    await getResource()
      .then((res) => {
        if (res.data) {
          setAllResources(res.data.userFiles);
          setAllFiles(res.data.userFiles);
          setAllLinks(res.data.userLinks);
          setAllLink(res.data.userLinks);
        }
      })
      .catch((err) => {});
  };

  const downloadFile = (item) => {
    // const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = `data:${item.filetype};base64,` + item.file;
    link.download = item.filename;
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    getResources();
    // handleLinksEdit();
  }, []);

  const onFileSearch = () => {
    if (isLink) {
      const data =
        description.length > 0
          ? allLink.filter((x) =>
              x?.filename
                ?.toLocaleLowerCase()
                .includes(description?.toLocaleLowerCase())
            )
          : allLink;
      setAllLinks(data);
    } else {
      const data =
        description.length > 0
          ? allFiles.filter((x) =>
              x?.filename
                ?.toLocaleLowerCase()
                .includes(description?.toLocaleLowerCase())
            )
          : allFiles;
      setAllResources(data);
    }
    setDescription("");
    handleCloseBrowse();
  };

  let [editLink, setEditLink] = useState(false);
  let [editLinkId, setEditLinkId] = useState("");

  function handleEditLink(item) {
    setOpen2(true);
    setLinkVal(item?.link);
    setDescritionVal(item?.description);
    setEditLink(true);
    setEditLinkId(item?.uuid);
  }

  console.log(editLink);

  // useEffect(() => {
  //   if (open2 === false) {
  //     setEditLink(false);
  //     setEditLinkId("");
  //     setLinkVal("");
  //     setDescritionVal("");
  //   }
  // }, [open2]);

  const editLinkBtn = async () => {
    if (linkVal === "") {
      setLinkValError(true);
    } else {
      setLinkValError(false);
    }

    if (descriptionVal === "") {
      setLinkDescriptionError(true);
    } else {
      setLinkDescriptionError(false);
    }

    if (linkVal !== "" && descriptionVal !== "") {
      const form = new FormData();
      const data = {
        link: linkVal,
        description: descriptionVal,
      };
      form.append(
        "link",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      form.append("linkUuid", editLinkId);

      try {
        let res = await fetch("https://taaskserver.herokuapp.com/resources", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: form,
        });

        // let data = res.json();
        // if (data) {
        getResources();
        setEditLink(false);
        setEditLinkId("");
        setLinkVal("");
        setDescritionVal("");
        setOpen2(false);
        setLinks([]);
        toast.success(`Link is edited successfully`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // }
      } catch (error) {
        toast.error(`Something went wrong on edditing the link link`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  let [editFile, setEditFile] = useState(false);
  let [editFileId, setEditFileId] = useState("");

  function handleEditFile(item) {
    setEditFile(true);
    setEditFileId(item?.uuid);
    setOpen1(true);
  }

  const handleFileEditBtn = async () => {
    const form = new FormData();
    if (file?.length > 0) {
      for (const f of file) {
        form.append("file", f);
      }
    }
    form.append("fileUuid", editFileId);

    if (file.length > 0) {
      setLoading(true);
      try {
        let res = await fetch("https://taaskserver.herokuapp.com/resources", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: form,
        });
        setFile([]);
        setOpen1(false);
        getResources();
        setLoading(false);
        toast.success(`File Updated Successfully`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast.error(`Something went wrong on updating the file`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  console.log(file);

  return (
    <Box className="resources">
      <Grid container>
        <Grid item xs={6}>
          <Box className="attachmentHead">
            <Box className="resourcesTopHead">
              <Typography variant="h3">
                <img
                  src={AttachmentsIcon}
                  alt="img not found"
                  className="AttachmentsIcon"
                />
                Attachments
              </Typography>
              <Box>
                <img
                  src={SearchIcon}
                  alt="img not found"
                  onClick={() => {
                    handleClickOpenBrowse();
                    setisLink(false);
                  }}
                />
              </Box>
            </Box>
            <Box className="resourcesModelHead">
              <Button
                className="btn"
                onClick={() => handleClickOpenAttachmentsModel()}
              >
                <img src={PlusIcon} alt="img not found" />
                Attachment
              </Button>
            </Box>
            <Box>
              {allResources?.map((item, index) => {
                return (
                  <FormGroup className="inputHead">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        fullWidth
                        placeholder="Lorem Ipsum"
                        className="taskTitleInput"
                        InputProps={{
                          readOnly: true,
                          style: {
                            cursor: "pointer",
                          },
                          startAdornment: (
                            <IconButton component="span">
                              {item?.filename?.includes(".pdf") ? (
                                <PictureAsPdfIcon />
                              ) : (
                                <ImageIcon />
                              )}
                            </IconButton>
                          ),
                        }}
                        value={item.filename}
                        onClick={() => downloadFile(item)}
                      />
                      <span>
                        <EditIcon
                          sx={{ mr: 2, color: "blue", cursor: "pointer" }}
                          // onClick={() => {
                          //   setOpen(true);
                          //   setAttachment(item);
                          //   setIndex(index);
                          //   setisLink(false)
                          // }}
                          // onClick={handleClickOpenAttachmentsModel}
                          onClick={() => handleEditFile(item)}
                        />
                      </span>
                      <span>
                        <img
                          src={DeleteIcon}
                          onClick={() => {
                            setUuid(item?.uuid);
                            setOpen(true);
                            setisLink(false);
                          }}
                        />
                      </span>
                    </Box>
                  </FormGroup>
                );
              })}
            </Box>
            {/* <CustomPagination
              data={allResources}
              count={allResources?.length}
              // setCurrentItems={setAllResources}
              customInput={false}
              customSelect={false}
              paginationDetail={true}
              buttons={true}
            /> */}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className="linkHead">
            <Box className="resourcesTopHead">
              <Typography variant="h3">
                <img
                  src={LinksIcon}
                  alt="img not found"
                  className="AttachmentsIcon"
                />
                Links
              </Typography>
              <Box>
                <img
                  src={SearchIcon}
                  alt="img not found"
                  onClick={() => {
                    handleClickOpenBrowse();
                    setisLink(true);
                  }}
                />
              </Box>
            </Box>

            <Box className="resourcesModelHead">
              <Button
                className="btn"
                onClick={() => handleClickOpenLinksModel()}
              >
                <img src={PlusIcon} alt="img not found" />
                link
              </Button>
            </Box>
            <Box>
              {allLinks?.map((item) => {
                return (
                  <FormGroup className="inputHead">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingBottom: "8px",
                      }}
                    >
                      <TextField
                        fullWidth
                        placeholder="www.link.com"
                        className="taskTitleInput"
                        value={item.link}
                        onClick={() => handleTextFieldClick(item)}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <span>
                        <EditIcon
                          sx={{ mr: 2, color: "blue", cursor: "pointer" }}
                          // onClick={() => {
                          //   setOpen(true);
                          //   setAttachment(item);
                          //   setIndex(index);
                          //   setisLink(false)
                          // }}
                          // onClick={handleClickOpenLinksModel}
                          onClick={() => handleEditLink(item)}
                        />
                      </span>
                      <span>
                        <img
                          src={DeleteIcon}
                          onClick={() => {
                            setUuid(item?.uuid);
                            setOpen(true);
                            setisLink(true);
                          }}
                        />
                      </span>
                    </Box>
                    <TextField
                      fullWidth
                      placeholder="Description"
                      className="taskTitleInput"
                      value={item.description}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormGroup>
                );
              })}
            </Box>
            {/* <CustomPagination
              data={allLinks}
              count={allLinks?.length}
              // setCurrentItems={setCurrentItems}
              customInput={false}
              customSelect={false}
              paginationDetail={true}
              buttons={true}
            /> */}
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAttachments}
        aria-describedby="alert-dialog-slide-description"
        className="attachmentsModel"
      >
        <DialogTitle className="titleHead">
          Upload File
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
                  title="file"
                  name="file"
                  placeholder="file"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={file.map((x) => x.name)}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "24px",
            }}
          >
            {!editFile ? (
              <Button
                className="attachmentsSaveBtn"
                onClick={handleResourcesSave}
              >
                Upload Attachment
              </Button>
            ) : (
              <Button
                className="attachmentsSaveBtn"
                onClick={handleFileEditBtn}
              >
                Edit Attachment
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseLinks}
        aria-describedby="alert-dialog-slide-description"
        className="LinksModel"
      >
        <DialogTitle className="titleHead">
          Save Link
          <img src={CloseIcon} alt="not found" onClick={handleCloseLinks} />
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              paddingTop: "24px",
            }}
          >
            <FormGroup className="inputHead">
              <label htmlFor="CustomerNotes" className="CustomerNotes">
                Link
              </label>
              <TextField
                fullWidth
                value={linkVal}
                placeholder="Link"
                onChange={(e) => setLinkVal(e.target.value)}
              />
              {linkValError && (
                <p style={{ color: "red" }}>
                  Please provide the link to add a link resource
                </p>
              )}
            </FormGroup>
            <FormGroup
              className="inputHead"
              sx={{
                paddingTop: "24px ",
              }}
            >
              <label htmlFor="CustomerNotes" className="CustomerNotes">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Description"
                value={descriptionVal}
                onChange={(e) => setDescritionVal(e.target.value)}
              ></textarea>
              {linkDescriptionError && (
                <p style={{ color: "red" }}>
                  Please provide the description to add a link resource
                </p>
              )}
            </FormGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "24px",
            }}
          >
            {!editLink && (
              <Button
                className="linksSaveBtn"
                onClick={() => handleLinksSave()}
              >
                Save Link
              </Button>
            )}
            {editLink && (
              <Button className="linksSaveBtn" onClick={editLinkBtn}>
                Edit Link
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open3}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseBrowse}
        aria-describedby="alert-dialog-slide-description"
        className="LinksModel"
      >
        <DialogTitle className="titleHead">Browse</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              paddingTop: "24px",
            }}
          >
            <FormGroup className="inputHead">
              <TextField
                onChange={(e) => {
                  setDescription(e?.target?.value);
                }}
                fullWidth
                placeholder="Enter Value"
              />
            </FormGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "24px",
            }}
          >
            <Button className="linksSaveBtn" onClick={onFileSearch}>
              Browse
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <ToastContainer />
      <Loader loaderValue={loading} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this{" "}
            {isLink ? "Link" : "Attachment"}?
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions> */}
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={isLink ? deleteLinks : deleteAttachment}
          color="secondary"
          autoFocus
        >
          Delete
        </Button>
        {/* </DialogActions> */}
      </Dialog>
    </Box>
  );
};

export default Resources;
