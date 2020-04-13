import React from "react";

import s from './Layout.module.css';

const Layout = (props) => {
    return (
        <>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={s.Content}>{props.children}</main>
        </>
    );
};

export default Layout;