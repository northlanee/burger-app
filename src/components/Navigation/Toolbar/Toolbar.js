import React from "react";

import s from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../SideDrawer/ToggleButton/ToggleButton";

const Toolbar = ({ opened, isAuth }) => {
    return (
        <header className={s.Toolbar}>
            <ToggleButton clicked={opened} />
            <Logo height="80%" />
            <nav className={s.DesktopOnly}>
                <NavigationItems isAuth={isAuth} />
            </nav>
        </header>
    );
};

export default Toolbar;
