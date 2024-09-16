import * as yup from "yup";

export const registerSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
  phone: yup.string()
    .length(10, "Phone number must be exactly 10 digits")
    .matches(/^[0-9]+$/, "Phone number must be digits only"),
  dob: yup.date()
    .required("Date of Birth is required")
    .nullable()
    .transform((_, originalValue) => (originalValue ? new Date(originalValue) : null))
    .max(new Date(), "Date of Birth cannot be in the future")
    .test("is-valid-date", "Date of birth must be valid", (value) => value instanceof Date && !isNaN(value.getTime())),
  gender: yup.string()
    .oneOf(["m", "f", "o"], "Invalid gender")
    .required("Gender is required"),
  address: yup.string().required("Address is required")
});
