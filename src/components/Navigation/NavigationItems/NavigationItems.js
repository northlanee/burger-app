import React from "react";

import s from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => {
    return (
        <ul className={s.NavigationItems}>
            <NavigationItem link='/'>Burger Builder</NavigationItem>
            <NavigationItem link='/orders'>Orders</NavigationItem>
        </ul>
    );
};

export default NavigationItems;