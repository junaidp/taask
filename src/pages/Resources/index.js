import React, { useState } from "react";
import "./Resources.css";
// Mui imports
import {
  Box,
  Grid,
  Typography,
  FormGroup,
  TextField,
  Pagination,
  PaginationItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Slide,
} from "@mui/material";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
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
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [file, setFile] = useState(null);
  const onUpload = (e) => {
    setFile(e?.target?.files[0]);
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
              <button
                className="btn"
                onClick={() => handleClickOpenAttachmentsModel()}
              >
                <img src={PlusIcon} alt="img not found" />
                Attachment
              </button>
            </Box>
            <Box>
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
                  />
                  <span>
                    <img src={DeleteIcon} />
                  </span>
                </Box>
              </FormGroup>

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
                  />
                  <span>
                    <img src={DeleteIcon} />
                  </span>
                </Box>
              </FormGroup>

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
                  />
                  <span>
                    <img src={DeleteIcon} />
                  </span>
                </Box>
              </FormGroup>

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
                  />
                  <span>
                    <img src={DeleteIcon} />
                  </span>
                </Box>
              </FormGroup>

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
                  />
                  <span>
                    <img src={DeleteIcon} />
                  </span>
                </Box>
              </FormGroup>

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
                  />
                  <span>
                    <img src={DeleteIcon} />
                  </span>
                </Box>
              </FormGroup>

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
                  />
                  <span>
                    <img src={DeleteIcon} />
                  </span>
                </Box>
              </FormGroup>

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
                  />
                  <span>
                    <img src={DeleteIcon} />
                  </span>
                </Box>
              </FormGroup>
            </Box>
            <Box className="tableFooter">
              <Box className="entries">
                <span>Showing 1 to 03 of 50 entries</span>
              </Box>
              <Box className="PaginationHead">
                <Box className="paginationBox">
                  <Pagination
                    count={5}
                    siblingCount={-1}
                    variant="outlined"
                    shape="rounded"
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ArrowLeftRoundedIcon,
                          next: ArrowRightRoundedIcon,
                        }}
                        {...item}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>
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
              <button
                className="btn"
                onClick={() => handleClickOpenLinksModel()}
              >
                <img src={PlusIcon} alt="img not found" />
                link
              </button>
            </Box>
            <Box>
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
                  />
                  <span>
                    <img src={DeleteIcon} />
                  </span>
                </Box>
                <TextField
                  fullWidth
                  placeholder="Description"
                  className="taskTitleInput"
                />
              </FormGroup>

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
                  />
                  <span>
                    <img src={DeleteIcon} />
                  </span>
                </Box>
                <TextField
                  fullWidth
                  placeholder="Description"
                  className="taskTitleInput"
                />
              </FormGroup>

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
                  />
                  <span>
                    <img src={DeleteIcon} />
                  </span>
                </Box>
                <TextField
                  fullWidth
                  placeholder="Description"
                  className="taskTitleInput"
                />
              </FormGroup>

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
                  />
                  <span>
                    <img src={DeleteIcon} />
                  </span>
                </Box>
                <TextField
                  fullWidth
                  placeholder="Description"
                  className="taskTitleInput"
                />
              </FormGroup>

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
                  />
                  <span>
                    <img src={DeleteIcon} />
                  </span>
                </Box>
                <TextField
                  fullWidth
                  placeholder="Description"
                  className="taskTitleInput"
                />
              </FormGroup>
            </Box>
            <Box className="tableFooter">
              <Box className="entries">
                <span>Showing 1 to 03 of 50 entries</span>
              </Box>
              <Box className="PaginationHead">
                <Box className="paginationBox">
                  <Pagination
                    count={5}
                    siblingCount={-1}
                    variant="outlined"
                    shape="rounded"
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ArrowLeftRoundedIcon,
                          next: ArrowRightRoundedIcon,
                        }}
                        {...item}
                      />
                    )}
                  />
                </Box>
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
            <FormGroup
              className="inputHead"
              sx={{
                paddingTop: "24px ",
              }}
            >
              <textarea name="description" placeholder="Description"></textarea>
            </FormGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "24px",
            }}
          >
            <Button className="attachmentsSaveBtn">Upload Attachment</Button>
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
              <TextField fullWidth placeholder="www.link.com" />
            </FormGroup>
            <FormGroup
              className="inputHead"
              sx={{
                paddingTop: "24px ",
              }}
            >
              <textarea name="description" placeholder="Description"></textarea>
            </FormGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "24px",
            }}
          >
            <Button className="linksSaveBtn">Upload Attachment</Button>
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
    </Box>
  );
};

export default Resources;
