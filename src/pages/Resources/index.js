import React, { useEffect, useState } from "react";
import "./Resources.css";
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
} from "@mui/material";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormData from "form-data";
import CustomerServices from "../../APIs/Customer";
import Loader from "../../components/Loader";
import CustomPagination from "../../components/Pagination";
// Images
import AttachmentsIcon from "../../assets/icons/Attachment.svg";
import SearchIcon from "../../assets/icons/search.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import LinksIcon from "../../assets/icons/Links.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import CloseIcon from "../../assets/icons/close.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Resources = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [file, setFile] = useState([]);
  const [description, setDescription] = useState();
  const [attachments, setAttachments] = useState([]);
  const [link, setLink] = useState();
  const [linkDescription, setLinkDescription] = useState();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  let userId = localStorage.getItem("token");
  const [currentItems, setCurrentItems] = useState([]);
  const [allResources, setAllResources] = useState([]);
  const [allLinks, setAllLinks] = useState([]);

  const onUpload = (e) => {
    const uploadfile = e?.target?.files[0];
    setFile(uploadfile);
  };
  const handleCloseAttachments = () => {
    setOpen1(false);
  };
  const handleClickOpenAttachmentsModel = () => {
    setOpen1(true);
  };
  const handleCloseLinks = () => {
    setOpen2(false);
  };
  const handleClickOpenLinksModel = () => {
    setOpen2(true);
  };
  const handleCloseBrowse = () => {
    setOpen3(false);
  };
  const handleClickOpenBrowse = () => {
    setOpen3(true);
  };

  const handleUploadAttachment = () => {
    const obj = {
      id: uuidv4(),
      fileId: file,
      description: description,
    };
    setAttachments((oldState) => [...oldState, obj]);
    setOpen1(false);
    toast.success("Attachment saved!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const deleteAttachment = (e, id) => {
    setAttachments(
      attachments?.filter((obj, i) => {
        if (obj?.id !== id) {
          return obj;
        }
      })
    );
  };

  const handleLinks = () => {
    const obj = {
      id: uuidv4(),
      link: link,
      description: linkDescription,
    };
    setLinks((oldState) => [...oldState, obj]);
    setOpen2(false);
    toast.success("Link saved!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const deleteLinks = (e, id) => {
    setLinks(
      links?.filter((obj) => {
        if (obj?.id !== id) {
          return obj;
        }
      })
    );
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
    setLoading(true);
    const resourcesData = {
      id: "",
      link: formik?.values?.AttachmentsLink,
      userId: formik?.values?.userId,
    };
    const data = new FormData();
    data.append("file", file);
    const resourcesJson = JSON.stringify(resourcesData);
    const blob = new Blob([resourcesJson], { type: "application/json" });
    data.append("resources", blob);
    await CustomerServices.saveResources(data)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(`${err.data.error}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleLinksSave = async () => {
    const data = {
      link: formik.values.link,
      description: formik.values.description,
      userId: formik.values.userId,
    };
    await CustomerServices.saveLink(data)
      .then((res) => {})
      .catch((err) => {
        toast.error(`${err.data.error}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const getResources = async () => {
    await CustomerServices.getResources(userId)
      .then((res) => {
        if (res) {
          setAllResources(res);
        }
      })
      .catch((err) => {
        console.log(err.data.error);
      });
  };

  const getLinks = async () => {
    await CustomerServices.getLinks(userId)
      .then((res) => {
        if (res) {
          setAllLinks(res);
        }
      })
      .catch((err) => {
        console.log(err.data.error);
      });
  };

  const downloadFile = async (e, data) => {
    await CustomerServices.downloadFile(data.fileId)
      .then(async (res) => {
        if (res) {
          toast.success("file is downloaded!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          const blob = new Blob([res], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "filename.pdf";
          document.body.appendChild(link);
          link.click();
        }
      })
      .catch((err) => {
        toast.error(`${err.data.error}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(() => {
    getResources();
    getLinks();
  }, []);

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
                  onClick={() => handleClickOpenBrowse()}
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
              {allResources.map((item, index) => {
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
                        value={item.link}
                        onClick={(e) => downloadFile(e, item)}
                      />
                      <span>
                        <img
                          src={DeleteIcon}
                          // onClick={(e) => deleteAttachment(e, item?.id)}
                        />
                      </span>
                    </Box>
                  </FormGroup>
                );
              })}
            </Box>
            <CustomPagination
              data={allResources}
              count={allResources?.length}
              setCurrentItems={setCurrentItems}
              customInput={false}
              customSelect={false}
              paginationDetail={true}
              buttons={true}
            />
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
                  onClick={() => handleClickOpenBrowse()}
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
              {allLinks.map((item) => {
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
                      />
                      <span>
                        <img
                          src={DeleteIcon}
                          // onClick={(e) => deleteLinks(e, item?.id)}
                        />
                      </span>
                    </Box>
                    <TextField
                      fullWidth
                      placeholder="Description"
                      className="taskTitleInput"
                      value={item.description}
                    />
                  </FormGroup>
                );
              })}
            </Box>
            <CustomPagination
              data={allLinks}
              count={allLinks?.length}
              setCurrentItems={setCurrentItems}
              customInput={false}
              customSelect={false}
              paginationDetail={true}
              buttons={true}
            />
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
                  value={file?.name}
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
            <FormGroup
              className="inputHead"
              sx={{
                paddingTop: "24px ",
              }}
            >
              <TextField
                fullWidth
                {...{
                  formik,
                  title: "AttachmentsLink",
                  name: "AttachmentsLink",
                  checkValidation: true,
                  placeholder: "www.link.com",
                  value: formik?.values?.AttachmentsLink,
                }}
                onChange={(e) => {
                  formik.setFieldValue("AttachmentsLink", e.target.value);
                }}
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
            <Button
              className="attachmentsSaveBtn"
              onClick={handleResourcesSave}
            >
              Upload Attachment
            </Button>
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
              <TextField
                fullWidth
                {...{
                  formik,
                  title: "link",
                  name: "link",
                  checkValidation: true,
                  placeholder: "www.link.com",
                  value: formik?.values?.link,
                }}
                onChange={(e) => {
                  formik.setFieldValue("link", e.target.value);
                  setLink(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup
              className="inputHead"
              sx={{
                paddingTop: "24px ",
              }}
            >
              <textarea
                name="description"
                placeholder="Description"
                {...{
                  formik,
                  title: "link",
                  name: "link",
                  checkValidation: true,
                  placeholder: "www.link.com",
                  value: formik?.values?.description,
                }}
                onChange={(e) => {
                  formik.setFieldValue("description", e.target.value);
                }}
              ></textarea>
            </FormGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "24px",
            }}
          >
            <Button className="linksSaveBtn" onClick={() => handleLinksSave()}>
              Upload Links
            </Button>
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
              <TextField fullWidth placeholder="lorem ipsum" />
            </FormGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "24px",
            }}
          >
            <Button className="linksSaveBtn">Browse</Button>
          </Box>
        </DialogContent>
      </Dialog>
      <ToastContainer />
      <Loader loaderValue={loading} />
    </Box>
  );
};

export default Resources;
