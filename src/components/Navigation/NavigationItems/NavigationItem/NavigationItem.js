import React from "react";

import s from './NavigationItem.module.css';
import {NavLink} from "react-router-dom";

const NavigationItem = (props) => {
    return (
        <li className={s.NavigationItem}>
            <NavLink exact to={props.link} activeClassName={s.active}>
                {props.children}
            </NavLink>
        </li>
    );
};

export default NavigationItem;