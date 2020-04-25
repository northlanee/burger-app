import React from "react";

import s from "./Order.module.css";

const Order = ({ ingredients, price }) => {
    const keys = Object.keys(ingredients);
    const ingredientsElements = keys.map((key) => {
        return (
            <span key={key} className={s.Ingredient}>
                {ingredients[key].label} ({ingredients[key].count})
            </span>
        );
    });

    return (
        <div className={s.Order}>
            <p>Ingredients: {ingredientsElements}</p>
            <p>
                Price: <strong>USD {Number(price).toFixed(2)}</strong>
            </p>
        </div>
    );
};

export default Order;
