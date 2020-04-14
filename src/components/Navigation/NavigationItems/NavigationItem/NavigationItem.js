import React from "react";

import s from './NavigationItem.module.css';

const NavigationItem = (props) => {
    return (
        <li className={s.NavigationItem}>
            <a href={props.link} className={props.active ? s.active : null}>
                {props.children}
            </a>
        </li>
    );
};

export default NavigationItem;