import s from "./formFieldCreator.module.css";
import { Field } from "formik";
import Input from "../components/UI/Input/Input";
import React from "react";

const fieldCreator = (name, placeholder, type, errors, touched) => {
    return (
        <>
            {errors[name] && touched[name] ? (
                <div className={s.Error}>{errors[name]}</div>
            ) : null}
            <Field
                name={name}
                type={type}
                placeholder={placeholder}
                component={Input}
            />
        </>
    );
};

export default fieldCreator;
