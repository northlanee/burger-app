import React from "react";

import s from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const BuildControls = ({
    ingredients,
    ingredientsCount,
    ingredientAdded,
    ingredientRemoved,
    price,
    purchasing,
    isAuth,
}) => {
    const ingredientsKeys = Object.keys(ingredients);
    const controlElements = ingredientsKeys.map((key) => {
        return (
            <BuildControl
                key={key}
                label={ingredients[key].label}
                ingredientAdded={() => ingredientAdded(key)}
                ingredientRemoved={() => ingredientRemoved(key)}
                disabled={ingredients[key].count <= 0}
            />
        );
    });

    return (
        <div className={s.BuildControls}>
            <p>
                Current price: <strong>{price.toFixed(2)}$</strong>
            </p>
            {controlElements}
            <button
                disabled={ingredientsCount <= 0}
                className={s.OrderButton}
                onClick={purchasing}
            >
                {isAuth ? "ORDER NOW" : "SIGN IN TO ORDER"}
            </button>
        </div>
    );
};

export default BuildControls;
