import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import s from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = ({ open, closed, isAuth }) => {
    let classes = [s.SideDrawer, s.Close];
    if (open) classes = [s.SideDrawer, s.Open];

    return (
        <>
            <Backdrop show={open} clicked={closed} />
            <div className={classes.join(" ")}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems isAuth={isAuth} />
                </nav>
            </div>
        </>
    );
};

export default SideDrawer;
