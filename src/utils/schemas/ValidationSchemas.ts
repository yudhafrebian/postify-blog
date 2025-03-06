import { title } from "process";
import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First Name must be atleast 2 characters")
    .required("First Name must be filled"),
  lastName: Yup.string()
    .min(2, "Last Name must be atleast 2 characters")
    .required("Last Name must be filled"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Please fill your valid email"),
  password: Yup.string()
    .min(6, "Password min. 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[\W]/, "Password must contain at least one symbol")
    .required("Password must be filled"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password is not match")
    .required("Confirmation Password must be filled"),
});


export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Please fill your valid email"),
  password : Yup.string().required("Password is required")
})

export const postMessageSchema = Yup.object().shape({
  postMessage: Yup.string().max(350, "Maximum Characters Reached!").required("Please Fill At Least One Character")
})

export const articleSchema = Yup.object().shape({
  title: Yup.string().max(55, "Maximum Characters Reached!").required("Please Fill At Least One Character"),
  description: Yup.string().max(300, "Maximum Characters Reached!").required("Please Fill At Least One Character"),
  content: Yup.string().required("Please Fill At Least One Character"),
  thumbnail: Yup.string().required("Please Fill At Least One Image URL"),
  category: Yup.string().required("Please Select At Least One Category"),
})