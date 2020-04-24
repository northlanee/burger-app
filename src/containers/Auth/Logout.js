import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../store/auth-reducer/authReducer";

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
