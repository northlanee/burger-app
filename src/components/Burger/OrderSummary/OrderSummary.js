import React from "react";

const OrderSummary = ({ingredients}) => {
    const ingredientsSummary = [];
    for (let key in ingredients) {
        if (ingredients.hasOwnProperty(key)) {
            ingredientsSummary.push(<li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {ingredients[key]}
            </li>);
        }
    }

    return (
        <>
            <h3>Your order</h3>
            <p>iBurger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to checkout?</p>
        </>
    );
};

export default OrderSummary;