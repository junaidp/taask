import React, { useState } from "react";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./login.css";
import {
  Box,
  TextField,
  FormGroup,
  Button,
} from "@mui/material";
import { Formik } from "formik";

// image
import Logo from "../../assets/icons/logo.svg";
import { loginSchema } from "../../Validation";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/Loader";
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (values) => {
    try {
      setLoading(true);
      const { data } = await login(values);
      setLoading(false);
      if (typeof data == "string") {
        toast.error(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success("Login Sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        const { token, ...result } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/upcoming-tasks");
      }
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={handleClick}
    >
      {(formik) => (
        <Box className="loginPage">
          <form className="formHead">
            <Box className="logoHead">
              <img src={Logo} alt="not found" className="logo" />
            </Box>
            <FormGroup className="inputHead">
              <TextField
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="input-error">{formik.errors.email}</p>
              ) : null}
            </FormGroup>
            <FormGroup className="inputHead">
              <TextField
                id="password-input"
                type={showPassword ? "text" : "password"}
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
            </FormGroup>
            <Box>
              <a href="#">Forgot Password?</a>
            </Box>
            <Button className="btn" onClick={formik.handleSubmit}>
              Sign in
            </Button>
            <p>
              not a member? <a href="/register">Signup</a>
            </p>
          </form>
          <ToastContainer />
          <Loader loaderValue={loading} />
        </Box>
      )}
    </Formik>
  );
};

export default Login;
