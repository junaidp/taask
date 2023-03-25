import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../../Auth";

// image
import Logo from "../../assets/icons/logo.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, login } = useAuth();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const customerValitadion = Yup.object().shape({
    name: Yup.string().required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: customerValitadion,
  });

  const handleClick= ()=>{
    login(formik?.values?.email, formik?.values?.password)
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
        </FormGroup>
        <FormGroup className="inputHead">
          <TextField
            id="password-input"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormGroup>
        <Box>
          <a href="#">Forgot Password?</a>
        </Box>
        <Button className="btn" onClick={handleClick}>Sign in</Button>
        <p>
          not a member? <a href="#">Signup</a>
        </p>
      </form>
    </Box>
  );
};

export default Login;
