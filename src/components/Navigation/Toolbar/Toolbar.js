import React from "react";

import s from './Toolbar.module.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../SideDrawer/ToggleButton/ToggleButton";

const Toolbar = (props) => {
    return (
        <header className={s.Toolbar}>
            <ToggleButton clicked={props.opened}/>
            <Logo height='80%'/>
            <nav className={s.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    );
};

export default Toolbar;