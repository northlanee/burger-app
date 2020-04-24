import React from "react";

import s from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
];

const BuildControls = ({
    ingredientAdded,
    ingredientRemoved,
    disabled,
    price,
    purchasable,
    purchasing,
    isAuth,
}) => {
    const controlElements = controls.map((control) => {
        return (
            <BuildControl
                key={control.type}
                label={control.label}
                ingredientAdded={() => ingredientAdded(control.type)}
                ingredientRemoved={() => ingredientRemoved(control.type)}
                disabled={disabled[control.type]}
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
                disabled={!purchasable}
                className={s.OrderButton}
                onClick={purchasing}
            >
                {isAuth ? "ORDER NOW" : "SIGN IN TO ORDER"}
            </button>
        </div>
    );
};

export default BuildControls;
