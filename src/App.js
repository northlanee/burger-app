import React, { Component } from "react";
import "./App.css";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Redirect, Route, Switch } from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import { connect } from "react-redux";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout";
import Spinner from "./components/UI/Spinner/Spinner";
import { initialLogIn } from "./store/auth-reducer/authReducer";

class App extends Component {
    componentDidMount() {
        this.props.initialLogIn();
    }

    render() {
        const routes = this.props.isAuth ? (
            <Switch>
                <Route exact path="/" component={BurgerBuilder} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/auth" component={Auth} />
                <Redirect to="/" />
            </Switch>
        ) : (
            <Switch>
                <Route exact path="/" component={BurgerBuilder} />
                <Route exact path="/auth" component={Auth} />
                <Redirect to="/" />
            </Switch>
        );

        return (
            <div className="App">
                {this.props.initLoading ? (
                    <Spinner />
                ) : (
                    <Layout>{routes}</Layout>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initLoading: state.authReducer.initLoading,
    isAuth: state.authReducer.token !== null,
});

export default connect(mapStateToProps, { initialLogIn })(App);
