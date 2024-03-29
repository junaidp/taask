import React, { useState } from "react";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./login.css";
import { Box, TextField, FormGroup, Button } from "@mui/material";
import { Formik } from "formik";

// image
import Logo from "../../assets/icons/logo.svg";
import { registerSchema } from "../../Validation";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/Loader";
// import { register } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (values) => {
    console.log(values);

    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://taaskserver.herokuapp.com/register",
        values
      );
      // const { data } = await register(values);
      setLoading(false);
      if (typeof data == "string") {
        toast.error(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      } else {
        toast.success("Account Register Sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => navigate("/login"), 1000);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      }}
      validationSchema={registerSchema}
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
                type="text"
                name="firstname"
                placeholder="FirstName"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <p className="input-error">{formik.errors.firstname}</p>
              ) : null}
            </FormGroup>
            <FormGroup className="inputHead">
              <TextField
                type="text"
                name="lastname"
                placeholder="LastName"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastname && formik.errors.lastname ? (
                <p className="input-error">{formik.errors.lastname}</p>
              ) : null}
            </FormGroup>
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
            <Box>{/* <a href="#">Forgot Password?</a> */}</Box>
            <Button className="btn" onClick={formik.handleSubmit}>
              Register
            </Button>
          </form>
          <ToastContainer />
          <Loader loaderValue={loading} />
        </Box>
      )}
    </Formik>
  );
};

export default Register;
