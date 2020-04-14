import React from "react";

import s from './ToggleButton.module.css';

const ToggleButton = ({clicked}) => {
    return <div className={s.ToggleButton} onClick={clicked}>
        <div/>
        <div/>
        <div/>
    </div>;
};

export default ToggleButton;