import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signUp } from "../../store/auth-reducer/authReducer";
import SignUp from "../../components/Auth/SignUp/SignUp";
import SignIn from "../../components/Auth/SignIn/SignIn";
import { Redirect } from "react-router-dom";

class Auth extends Component {
    state = {
        signUp: false,
    };

    switchMode = () => {
        this.setState((prevState) => {
            return { signUp: !prevState.signUp };
        });
    };

    signUpHandler = (values) => {
        this.props.signUp(values);
    };

    signInHandler = (values) => {
        this.props.signIn(values);
    };

    render() {
        const { loading, error } = this.props;

        if (this.props.isAuth && !this.props.builtBurger)
            return <Redirect to="/" />;
        if (this.props.isAuth && this.props.builtBurger)
            return <Redirect to="/checkout" />;

        return this.state.signUp ? (
            <SignUp
                signUpHandler={this.signUpHandler}
                switchMode={this.switchMode}
                loading={loading}
                error={error}
            />
        ) : (
            <SignIn
                signInHandler={this.signInHandler}
                switchMode={this.switchMode}
                loading={loading}
                error={error}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuth: state.authReducer.token !== null,
    builtBurger: state.burgerReducer.ingredientsCount > 0,
});

export default connect(mapStateToProps, { signUp, signIn })(Auth);
