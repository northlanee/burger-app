import React from "react";

import s from './Backdrop.module.css';

const Backdrop = (props) => {
    return props.show ? <div className={s.Backdrop} onClick={props.clicked}/> : null;
};

export default Backdrop;