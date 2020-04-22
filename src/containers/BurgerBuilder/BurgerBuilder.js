import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import {
    getIngredients,
    setBurger,
} from "../../store/burger-reducer/burgerReducer";

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
    };

    componentDidMount() {
        this.props.getIngredients();
    }

    updatePurchaseState(ingredients) {
        let sum = 0;
        for (let key in ingredients) {
            sum += ingredients[key];
        }
        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = (purchasing) => {
        this.setState({ purchasing });
    };

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: "/checkout",
        });
    };

    addOrRemoveIngredientHelper = (type, newIngredientCount) => {
        const updatedIngredients = { ...this.props.ingredients };
        updatedIngredients[type] = newIngredientCount;
        const newTotalCost = this.props.totalCost + this.props.costs[type];
        this.props.setBurger({
            ingredients: updatedIngredients,
            totalCost: newTotalCost,
        });
        this.updatePurchaseState(updatedIngredients);
    };

    addIngredientHandler = (type) => {
        const newIngredientCount = this.props.ingredients[type] + 1;
        this.addOrRemoveIngredientHelper(type, newIngredientCount);
    };

    removeIngredientHandler = (type) => {
        if (this.props.ingredients[type] <= 0) return;
        const newIngredientCount = this.props.ingredients[type] - 1;
        this.addOrRemoveIngredientHelper(type, newIngredientCount);
    };

    render() {
        const { ingredients, totalCost } = this.props;

        const disabledInfo = { ...ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        const orderSummary = (
            <OrderSummary
                ingredients={ingredients}
                purchaseCancel={() => this.purchaseHandler(false)}
                purchaseContinue={this.purchaseContinueHandler}
                price={totalCost}
            />
        );

        let burger = <Spinner />;
        if (ingredients) {
            burger = (
                <>
                    <Burger ingredients={ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        purchasable={this.state.purchasable}
                        disabled={disabledInfo}
                        price={totalCost}
                        purchasing={() => this.purchaseHandler(true)}
                    />
                </>
            );
        }

        return (
            <>
                <Modal
                    show={this.state.purchasing}
                    modalClose={() => this.purchaseHandler(false)}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerReducer.ingredients,
        costs: state.burgerReducer.costs,
        totalCost: state.burgerReducer.totalCost,
        loading: state.burgerReducer.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setBurger: (payload) => dispatch(setBurger(payload)),
        getIngredients: () => dispatch(getIngredients()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
