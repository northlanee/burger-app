import React from "react";

import s from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = ({ isAuth }) => {
    return (
        <ul className={s.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>

            {isAuth ? (
                <>
                    <NavigationItem link="/orders">Orders</NavigationItem>
                    <NavigationItem link="/logout">Logout</NavigationItem>
                </>
            ) : (
                <NavigationItem link="/auth">Sign In</NavigationItem>
            )}
        </ul>
    );
};

export default NavigationItems;
