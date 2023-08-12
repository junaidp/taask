import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  FormGroup,
  Slide,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./UserProfile.css";
import { loginSchema, profileSchema, registerSchema } from "../../Validation";
import { getUserProfile } from "../../services/user.service";
import { forwardRef, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import CloseIcon from "../../assets/icons/close.svg";
import axios from "axios";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const UserProfile = ({ open, onClose }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [initialValues, setIntialValues] = useState("");
  const userInfo = async () => {
    try {
      const { data: resp } = await getUserProfile();
      if (typeof resp == "object") {
        setIntialValues({
          firstname: resp.firstname,
          lastname: resp.firstname,
          email: resp.email,
          password: "",
        });
        console.log(resp);
      }
    } catch (error) {}
  };
  // useEffect(() => {
  //   userInfo();
  // }, []);
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  // let [user, setUser] = useState();
  // useEffect(() => {
  //   const start = async () => {
  //     let token = localStorage.getItem("token");
  //     const headers = {
  //       authorization: `Bearer ${token}`,
  //       // "Content-Type": "application/json",
  //     };

  //     axios
  //       .post("https://taaskserver.herokuapp.com/user/profile", null, {
  //         headers,
  //       })
  //       .then((response) => {
  //         // Handle the response here
  //         console.log("Response:", response.data);
  //       })
  //       .catch((error) => {
  //         // Handle errors here
  //         console.error("Error:", error.message);
  //       });
  //   };
  //   start();
  // }, []);

  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  return (
    <Box m="50px">
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        className="attachmentsModel"
      >
        <DialogTitle className="titleHead">
          User Profile
          <img src={CloseIcon} alt="not found" onClick={onClose} />
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={profileSchema}
            onSubmit={onClose}
          >
            {(formik) => (
              <Box
                sx={{
                  paddingTop: "24px",
                }}
                className="loginPage"
              >
                <form className="formHead">
                  <Box className="logoHead">
                    {/* <img src={Logo} alt="not found" className="logo" /> */}
                  </Box>
                  <FormGroup className="inputHead">
                    <TextField
                      type="text"
                      name="firstname"
                      placeholder="FirstName"
                      value={user?.firstname}
                      // value={formik.values.firstname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {/* {formik.touched.firstname && formik.errors.firstname ? (
                      <p className="input-error">{formik.errors.firstname}</p>
                    ) : null} */}
                  </FormGroup>
                  <FormGroup className="inputHead">
                    <TextField
                      type="text"
                      name="lastname"
                      placeholder="LastName"
                      value={user?.lastname}
                      // value={formik.values.lastname}
                      // onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {/* {formik.touched.lastname && formik.errors.lastname ? (
                      <p className="input-error">{formik.errors.lastname}</p>
                    ) : null} */}
                  </FormGroup>
                  <FormGroup className="inputHead">
                    <TextField
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={user?.email}
                      // value={formik.values.email}
                      disabled
                      // onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </FormGroup>
                  {/* <FormGroup className="inputHead">
                    <TextField
                      id="password-input"
                      // type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      //       {showPassword ?<VisibilityIcon/>:<VisibilityOffIcon/>}
                      //       </IconButton>
                      //     </InputAdornment>
                      //   ),
                      // }}
                      name="password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <p className="input-error">{formik.errors.password}</p>
                    ) : null}
                  </FormGroup> */}
                  <Box>{/* <a href="#">Forgot Password?</a> */}</Box>
                  <Button className="btn" onClick={onClose}>
                    Close
                  </Button>
                </form>
                <ToastContainer />
                {/* <Loader loaderValue={loading} /> */}
              </Box>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default UserProfile;
