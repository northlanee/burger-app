import React from "react";

import s from "./Input.module.css";

const Input = ({ field, ...props }) => {
    return (
        <div className={s.Input}>
            <input {...field} {...props} />
        </div>
    );
};

export default Input;
