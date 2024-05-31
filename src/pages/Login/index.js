import React, { useEffect, useState } from "react";
import "./login.css";
import { Box, TextField, FormGroup, Button } from "@mui/material";
import { Formik } from "formik";

// image
import Logo from "../../assets/icons/logo.svg";
import { loginSchema } from "../../Validation";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/Loader";
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
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
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="input-error">{formik.errors.password}</p>
              ) : null}
            </FormGroup>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <a>Forgot Password?</a>
              </Box>
              <Box>
                <a href="/register">Sign Up</a>
              </Box>
            </Box>
            <Button className="btn" onClick={formik.handleSubmit}>
              Sign in
            </Button>
          </form>
          <ToastContainer />
          <Loader loaderValue={loading} />
        </Box>
      )}
    </Formik>
  );
};

export default Login;
