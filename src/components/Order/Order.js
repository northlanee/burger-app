import React from "react";

import s from './Order.module.css';

const Order = ({ingredients, price}) => {
    return (
        <div className={s.Order}>
            <p>Ingredients:
                Salad ({ingredients.salad}),
                Cheese ({ingredients.cheese}),
                Meat ({ingredients.meat}),
                Bacon ({ingredients.bacon})
            </p>
            <p>Price: <strong>USD {Number(price).toFixed(2)}</strong></p>
        </div>
    )
};

export default Order;