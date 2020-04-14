import React from "react";

import s from './Button.module.css';

const Button = (props) => {
    return (
        <button className={[s.Button, s[props.type]].join(' ')} onClick={props.clicked}>{props.children}</button>
    );
};

export default Button;