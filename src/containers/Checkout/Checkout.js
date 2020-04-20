import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0,
        },
        price: 0,
    };

    componentDidMount() {
        const ingredients = {};
        let price = 0;
        let query = decodeURIComponent(this.props.location.search);
        if (query[0] === "?") query = query.slice(1);
        const a = query.split("&");
        a.forEach((elem) => {
            const b = elem.split("=");

            if (b[0] !== "price") ingredients[b[0]] = Number(b[1]);
            else price = Number(b[1]);
        });
        this.setState({ ingredients: ingredients, price: price });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinuedHandler = () => {
        this.props.history.push(this.props.match.url + "/contact");
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.url + "/contact"}
                    render={() => (
                        <ContactData
                            price={this.state.price}
                            ingredients={this.state.ingredients}
                        />
                    )}
                />
            </div>
        );
    }
}

export default Checkout;
