import React, { Component } from "react";

import s from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerOpenHandler = () => {
        this.setState({ showSideDrawer: true });
    };

    render() {
        return (
            <>
                <Toolbar
                    opened={this.sideDrawerOpenHandler}
                    isAuth={this.props.isAuth}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isAuth={this.props.isAuth}
                />
                <main className={s.Content}>{this.props.children}</main>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.authReducer.token !== null,
});

export default connect(mapStateToProps)(Layout);
