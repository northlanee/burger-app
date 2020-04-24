import React from "react";

import Ingredient from "./Ingredient/Ingredient";

import s from "./Burger.module.css";

const Burger = ({ ingredients, ingredientsCount }) => {
    let ingredientElements = [];
    if (!ingredientsCount)
        ingredientElements = <p>Please, start adding elements</p>;
    else {
        const keys = Object.keys(ingredients);
        keys.forEach((key) => {
            if (ingredients[key].count) {
                for (let i = 0; i < ingredients[key].count; i++) {
                    ingredientElements.push(
                        <Ingredient
                            key={key + i}
                            cssClass={ingredients[key].className}
                        />
                    );
                }
            }
        });
    }

    return (
        <div className={s.Burger}>
            <Ingredient cssClass="BreadTop" />
            {ingredientElements}
            <Ingredient cssClass="BreadBottom" />
        </div>
    );
};

export default Burger;
