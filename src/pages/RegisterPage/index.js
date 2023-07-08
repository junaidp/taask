import React, { useState, useEffect } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import "./login.css";
import {
  Box,
  TextField,
  FormControl,
  FormGroup,
  Toast,
  Button,
  Typography,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import { ErrorMessage, useFormik } from "formik";
import { useAuth } from "../../Auth";

// image
import Logo from "../../assets/icons/logo.svg";
import { loginSchema, registerSchema } from "../../Validation";
import { toast, ToastContainer } from "react-toastify";
const Register = () => {
  const { register} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName:"",
      lastName:"",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
  });

  const handleClick= async ()=>{
    debugger;
    if(formik.isValid){
      register(formik.values);
    }
    else{
      toast.error(formik.errors.firstName||formik.errors.lastName||formik.errors.email||formik.errors.password, {
        position: toast.POSITION.TOP_RIGHT,
      });

    }
    
  }
  return (
    <Box className="loginPage">
      <form className="formHead">
        <Box className="logoHead">
          <img src={Logo} alt="not found" className="logo" />
        </Box>
        <FormGroup className="inputHead">
          <TextField
            type="text"
            {...{
              formik,
              title: "First Name",
              name: "firstname",
              placeholder: "First Name",
              checkValidation: true,
              value: formik?.values?.firstName,
            }}
            onChange={(e) => {
              formik.setFieldValue("firstName", e.target.value);
            }}
          />
          {/* <ErrorMessage name="email" component="div" className="error-message" /> */}
        </FormGroup>
        <FormGroup className="inputHead">
          <TextField
            type="text"
            {...{
              formik,
              title: "Last Name",
              name: "lastname",
              placeholder: "Last Name",
              checkValidation: true,
              value: formik?.values?.lastName,
            }}
            onChange={(e) => {
              formik.setFieldValue("lastName", e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="inputHead">
          <TextField
            type="email"
            {...{
              formik,
              title: "Email",
              name: "email",
              placeholder: "Email",
              checkValidation: true,
              value: formik?.values?.email,
            }}
            onChange={(e) => {
              formik.setFieldValue("email", e.target.value);
            }}
          />
          {/* <ErrorMessage name="email" component="div" className="error-message" /> */}
        </FormGroup>
        <FormGroup className="inputHead">
          <TextField
            id="password-input"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ?<VisibilityIcon/>:<VisibilityOffIcon/>}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...{
              formik,
              title: "Password",
              name: "password",
              placeholder: "Password",
              checkValidation: true,
              value: formik?.values?.password,
            }}
            onChange={(e) => {
              formik.setFieldValue("password", e.target.value);
            }}
          />
          {/* <ErrorMessage name="password" component="div" className="error-message" /> */}
        </FormGroup>
        <Button className="btn" onClick={handleClick}>Sign Up</Button>
        <p>
          not a member? <a href="/">SignIn</a>
        </p>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default Register;
