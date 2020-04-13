import React from "react";

import s from './BuildControl.module.css';

const BuildControl = ({label, ingredientAdded}) => {
    return (
        <div className={s.BuildControl}>
            <div className={s.Label}>{label}</div>
            <button className={s.Less}>Less</button>
            <button className={s.More} onClick={ingredientAdded}>More</button>
        </div>
    );
};

export default BuildControl;