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
        purchasing: false,
    };

    componentDidMount() {
        this.props.getIngredients();
    }

    purchaseHandler = (purchasing) => {
        if (this.props.isAuth) this.setState({ purchasing });
        else this.props.history.push("/auth");
    };

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: "/checkout",
        });
    };

    updateIngredient = (name, count) => {
        const newIngredients = { ...this.props.ingredients };
        newIngredients[name].count = this.props.ingredients[name].count + count;
        this.props.setBurger({
            ingredients: newIngredients,
            ingredientsCount: this.props.ingredientsCount + count,
            totalPrice:
                this.props.totalPrice +
                (count > 0
                    ? +newIngredients[name].price
                    : -newIngredients[name].price),
        });
    };

    addIngredientHandler = (name) => {
        this.updateIngredient(name, 1);
    };

    removeIngredientHandler = (name) => {
        this.updateIngredient(name, -1);
    };

    render() {
        const { ingredients, ingredientsCount, totalPrice } = this.props;

        // const orderSummary = (
        //     <OrderSummary
        //         ingredients={ingredients}
        //         purchaseCancel={() => this.purchaseHandler(false)}
        //         purchaseContinue={this.purchaseContinueHandler}
        //         price={totalCost}
        //     />
        // );

        let burger = <Spinner />;
        if (!this.props.loading) {
            burger = (
                <>
                    <Burger
                        ingredients={ingredients}
                        ingredientsCount={ingredientsCount}
                    />
                    <BuildControls
                        ingredients={ingredients}
                        ingredientsCount={this.props.ingredientsCount}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        price={totalPrice}
                        purchasing={() => this.purchaseHandler(true)}
                        isAuth={this.props.isAuth}
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
                    {/*{orderSummary}*/}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerReducer.ingredients,
        ingredientsCount: state.burgerReducer.ingredientsCount,
        totalPrice: state.burgerReducer.totalPrice,
        loading: state.burgerReducer.loading,
        isAuth: state.authReducer.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getIngredients: () => dispatch(getIngredients()),
        setBurger: (burger) => dispatch(setBurger(burger)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
