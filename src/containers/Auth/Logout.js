import React, { Component } from "react";
import { logOut } from "../../store/auth-reducer/auth-reducer";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logOut()),
});

export default connect(null, mapDispatchToProps)(Logout);
