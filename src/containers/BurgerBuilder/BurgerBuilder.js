import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

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
        purchasable: false
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

        return (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    disabled={disabledInfo}
                    price={this.state.totalCost}
                />
            </>
        );
    }

}

export default BurgerBuilder;