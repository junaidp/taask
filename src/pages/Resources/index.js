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
  IconButton,
  DialogContentText,
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
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SearchIcon from "../../assets/icons/search.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import LinksIcon from "../../assets/icons/Links.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import CloseIcon from "../../assets/icons/close.svg";
import { addResources, deleteResource, getResource } from "../../services/customer.service";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Resources = () => {
  const [open, setOpen] = useState(false);
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
  const [allFiles, setAllFiles] = useState([]);
  const [allLinks, setAllLinks] = useState([]);
  const [isLink, setisLink] = useState(false);
  const [uuid, setUuid] = useState(false);

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


  const deleteAttachment = async () => {
    try {
      setLoading(true);
      const { data: resp } = await deleteResource(uuid,'file');
      setLoading(false);
      if (resp) {
        toast.success("Attachemnt Deleted Sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        allResources.splice(allResources.findIndex((x)=>x.uuid==uuid), 1);
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
      const { data: resp } = await deleteResource(uuid,'link');
      setLoading(false);
      if (resp) {
        toast.success("Link Deleted Sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        allLinks.splice(allLinks.findIndex((x)=>x.uuid==uuid), 1);
        setOpen(false)
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
    setLoading(true);
    const data = new FormData();
    if(file?.length>0){
      for (const f of file) {
        data.append("file",f);
      }
    }
    await addResources('',data)
      .then((res) => {
        setLoading(false);
        if(typeof res.data == "string"){
          setOpen1(false);
          toast.success(`File Added Sucessfully`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setFile([]);
          getResources()
        }
        else{
          toast.error(`Something went wrong on adding file`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleLinksSave = async () => {
    const data = {
      link: formik.values.link,
      description: formik.values.description,
    };
    const formData = new FormData();
    const linkJson = JSON.stringify([data]);
    const blob3 = new Blob([linkJson], { type: "application/json" });
    formData.append("link",blob3);
    await addResources('',formData)
      .then((res) => {
        setLoading(false);
        if(typeof res.data == "string"){
          setOpen2(false);
          toast.success(`Link Added Sucessfully`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLinks([])
          getResources()
        }
        else{
          toast.error(`Something went wrong on adding link`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const getResources = async () => {
    await getResource()
      .then((res) => {
        if (res.data) {
          setAllResources(res.data.userFiles);
          setAllFiles(res.data.userFiles);
          setAllLinks(res.data.userLinks)
        }
      })
      .catch((err) => {
      });
  };

  const downloadFile = (item) => {
          // const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = `data:${item.filetype};base64,` +item.file;
          link.download = item.filename;
          document.body.appendChild(link);
          link.click();
        }

  useEffect(() => {
    getResources();
  }, []);
  const onFileSearch = () => {
    const data = (description.length>0)?
    allFiles.filter((x)=>x?.filename?.toLocaleLowerCase().includes(description?.toLocaleLowerCase())):
    allFiles;
    setAllResources(data);
    handleCloseBrowse();
  };

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
                            cursor: 'pointer',
                          },
                          startAdornment: (
                            <IconButton component="span">
                              <AttachFileIcon/>
                            </IconButton>
                          ),
                        }}
                        value={item.filename}
                        onClick={() => downloadFile(item)}
                      />
                      <span>
                        <img
                          src={DeleteIcon}
                          onClick={() =>{
                            setUuid(item?.uuid)
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
                      />
                      <span>
                        <img
                          src={DeleteIcon}
                          onClick={() =>{
                            setUuid(item?.uuid)
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
                  InputProps={{
                      readOnly:true
                    }}
                  value={file.map((x)=>x.name)}
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
                  title: "description",
                  name: "description",
                  checkValidation: true,
                  placeholder: "description",
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
        <DialogTitle className="titleHead">File Browse</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              paddingTop: "24px",
            }}
          >
            <FormGroup className="inputHead">
              <TextField onChange={(e)=>{setDescription(e?.target?.value)}} fullWidth placeholder="lorem ipsum" />
            </FormGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "24px",
            }}
          >
            <Button className="linksSaveBtn" onClick={onFileSearch}>Browse</Button>
          </Box>
        </DialogContent>
      </Dialog>
      <ToastContainer />
      <Loader loaderValue={loading} />
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
            <Button onClick={isLink?deleteLinks:deleteAttachment} color="secondary" autoFocus>
              Delete
            </Button>
            {/* </DialogActions> */}
          </Dialog>
    </Box>
  );
};

export default Resources;
