import React from "react";

import s from "./Button.module.css";

const Button = (props) => {
    return (
        <button
            className={[s.Button, s[props.btnType]].join(" ")}
            onClick={props.clicked}
            type={props.type}
        >
            {props.children}
        </button>
    );
};

export default Button;
