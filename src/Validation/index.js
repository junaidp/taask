import * as yup from "yup";
import moment from "moment";

export const customerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  category: yup.string().required("category is required"),
  customerSince: yup.string().required("customer since is required"),
  customerStage: yup.string().required("customer stage is required"),
  contacts: yup.array().of(
    yup.object().shape({
      name: yup.string().required("contacts name is required"),
      jobTitle: yup.string().required("job title is required"),
      emailAddress: yup.string().required("email address is required"),
      // location: yup.string().required("location is required"),
    })
  ),
});
