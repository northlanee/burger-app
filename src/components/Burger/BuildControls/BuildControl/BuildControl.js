import React from "react";

import s from './BuildControl.module.css';

const BuildControl = ({label, ingredientAdded, ingredientRemoved, disabled}) => {
    return (
        <div className={s.BuildControl}>
            <div className={s.Label}>{label}</div>
            <button className={s.Less} onClick={ingredientRemoved} disabled={disabled}>Less</button>
            <button className={s.More} onClick={ingredientAdded}>More</button>
        </div>
    );
};

export default BuildControl;