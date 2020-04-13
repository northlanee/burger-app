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
        totalCost: 1.5
    };

    addIngredientHandler = (type) => {
        const newIngredientCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newIngredientCount;
        const newTotalCost = Math.round((this.state.totalCost + this.state.costs[type]) * 100) / 100;
        this.setState({ingredients: updatedIngredients, totalCost: newTotalCost});
    };

    removeIngredientHandler = (type) => {
        const newIngredientCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newIngredientCount;
        this.setState({ingredients: updatedIngredients});
    };

    render() {
        return (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler}/>
            </>
        );
    }

}

export default BurgerBuilder;