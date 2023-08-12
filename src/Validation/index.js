import * as yup from "yup";
import moment from "moment";

export const customerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  category: yup.string().required("Category is required"),
  customerSince: yup.string().required("Customer since is required"),
  customerStage: yup.string().required("Customer stage is required"),
  contacts: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Contact name is required"),
      jobTitle: yup.string().required("Job title is required"),
      emailAddress: yup
        .string()
        .email("Invalid email address")
        .required("Email address is required")
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Invalid email address format"
        ),
      location: yup.string().required("Location is required"),
    })
  ),
});

export const TaskSchema = yup.object().shape({
  taskName: yup.string().required("task title is required"),
  subTask: yup.array().of(
    yup.object().shape({
      name: yup.string().required("subtask name is required"),
    })
  ),
  dueDate: yup.string().required("Due Date is required"),
});

export const ProjectSchema = yup.object().shape({
  name: yup.string().required("project name is required"),
  // resources: yup.array().of(
  //   yup.object().shape({
  //     fileId: yup.string().required("file name is required"),
  //   })
  // ),
  // taskIds: yup.array().required("taskIds is required"),
  dueDate: yup.string().required("Due Date is required"),
});
export const loginSchema = yup.object().shape({
  password: yup.string().required('Password is required').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one digit'
  ),
  email: yup.string().email('Invalid email address').required('Email is required'),
});
export const registerSchema = yup.object().shape({
  firstname: yup.string().required('First Name is required').matches(/^[a-zA-Z]*$/, 'Please enter a valid first name'),
  lastname: yup.string().required('Last Name is required').matches(/^[a-zA-Z]*$/, 'Please enter a valid last name'),
  password: yup.string().required('Password is required').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one digit'
  ),
  email: yup.string().email('Invalid email address').required('Email is required'),
});

export const profileSchema = yup.object().shape({
  firstname: yup.string().required('First Name is required').matches(/^[a-zA-Z]*$/, 'Please enter a valid first name'),
  lastname: yup.string().required('Last Name is required').matches(/^[a-zA-Z]*$/, 'Please enter a valid last name'),
  password: yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one digit'
  ),
});

