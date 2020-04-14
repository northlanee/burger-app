import React from "react";

import s from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => {
    return (
        <ul className={s.NavigationItems}>
            <NavigationItem link='/' active>Burger Builder</NavigationItem>
            <NavigationItem link='/'>Checkout</NavigationItem>
        </ul>
    );
};

export default NavigationItems;