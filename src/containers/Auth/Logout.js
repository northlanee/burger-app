import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../store/auth-reducer/authReducer";
import { getIngredients } from "../../store/burger-reducer/burgerReducer";

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
        this.props.getIngredients();
    }

    render() {
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logOut()),
    getIngredients: () => dispatch(getIngredients()),
});

export default connect(null, mapDispatchToProps)(Logout);
