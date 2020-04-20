import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinuedHandler = () => {
        this.props.history.push(this.props.match.url + "/contact");
    };

    render() {
        const { ingredients, price } = this.props;

        return (
            <div>
                <CheckoutSummary
                    ingredients={ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.url + "/contact"}
                    render={() => (
                        <ContactData price={price} ingredients={ingredients} />
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalCost,
    };
};

export default connect(mapStateToProps, null)(Checkout);
