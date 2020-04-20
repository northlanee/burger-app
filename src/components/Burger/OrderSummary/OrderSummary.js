import React from "react";
import Button from "../../UI/Button/Button";

const OrderSummary = ({
    ingredients,
    purchaseCancel,
    purchaseContinue,
    price,
}) => {
    const ingredientsSummary = [];
    for (let key in ingredients) {
        ingredientsSummary.push(
            <li key={key}>
                <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
                {ingredients[key]}
            </li>
        );
    }

    return (
        <>
            <h3>Your order</h3>
            <p>iBurger with the following ingredients:</p>
            <ul>{ingredientsSummary}</ul>
            <p>
                <strong>Total price: {price.toFixed(2)}$</strong>
            </p>
            <p>Continue to checkout?</p>
            <Button clicked={purchaseCancel} type="Danger">
                CANCEL
            </Button>
            <Button clicked={purchaseContinue} type="Success">
                CONTINUE
            </Button>
        </>
    );
};

export default OrderSummary;
