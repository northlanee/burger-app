import * as Yup from "yup";

export const nameValidator = Yup.string()
    .min(3, "Too Short!")
    .max(25, "Too Long!")
    .required("Required!");

export const emailValidator = Yup.string()
    .email("Must be valid e-mail")
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required!");

export const flatValidator = Yup.number()
    .typeError("Must be a valid flat number")
    .integer("Must be a valid flat number")
    .max(999, "Must be a valid flat number")
    .required("Required!");

export default Yup;
