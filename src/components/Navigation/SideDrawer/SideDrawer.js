import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import s from './SideDrawer.module.css';
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
    let classes = [s.SideDrawer, s.Close];
    if (props.open) classes = [s.SideDrawer, s.Open];

    return (
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={classes.join(' ')}>

                <Logo height='11%'/>
                <nav>
                    <NavigationItems/>
                </nav>

            </div>
        </>
    );
};

export default SideDrawer;