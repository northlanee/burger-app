import React, {Component} from "react";
import axios from './../../api/orders';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {

    state = {
        costs: {
            salad: 0.44,
            cheese: 0.57,
            meat: 1.2,
            bacon: 1.35
        },
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalCost: 1.5,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    updatePurchaseState(ingredients) {
        let sum = 0;
        for (let key in ingredients) {
            if (ingredients.hasOwnProperty(key)) {
                sum += ingredients[key];
            }
        }
        this.setState({purchasable: sum > 0});
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalCost.toFixed(2),
            customer: {
                name: 'Vasya',
                address: {
                    city: 'Kyiv',
                    address: 'Pushkina, 69',
                    flat: 69
                }
            }
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    };

    addIngredientHandler = (type) => {
        const newIngredientCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newIngredientCount;
        const newTotalCost = this.state.totalCost + this.state.costs[type];
        this.setState({ingredients: updatedIngredients, totalCost: newTotalCost});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) return;
        const newIngredientCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newIngredientCount;
        const newTotalCost = this.state.totalCost - this.state.costs[type];
        this.setState({ingredients: updatedIngredients, totalCost: newTotalCost});
        this.updatePurchaseState(updatedIngredients);
    };

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) { disabledInfo[key] = disabledInfo[key] <= 0; }

        let orderSummary = <Spinner/>;
        if (!this.state.loading) {
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalCost}
            />
        }

        return (
            <>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    disabled={disabledInfo}
                    price={this.state.totalCost}
                    purchasing={this.purchaseHandler}
                />
            </>
        );
    }

}

export default BurgerBuilder;