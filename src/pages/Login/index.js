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
import { loginSchema } from "../../Validation";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const { user, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  const handleClick= async ()=>{

    if(formik.isValid){
      login(formik.values);
    }
    else{
      toast.error(formik.errors.email||formik.errors.password, {
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
        <Box>
          <a href="#">Forgot Password?</a>
        </Box>
        <Button className="btn" onClick={handleClick}>Sign in</Button>
        <p>
          not a member? <a href = "/register">Signup</a>
        </p>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default Login;
