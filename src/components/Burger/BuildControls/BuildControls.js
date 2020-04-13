import React from "react";

import s from './BuildControls.module.css';
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' }
];

const BuildControls = ({ingredientAdded}) => {
    const controlElements = controls.map(control => {
        return <BuildControl
            key={control.type}
            label={control.label}
            ingredientAdded={() => ingredientAdded(control.type)}
        />;
    });

    return (
        <div className={s.BuildControls}>
            {controlElements}
        </div>
    );
};

export default BuildControls;