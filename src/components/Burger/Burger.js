import React from "react";

import Ingredient from "./Ingredient/Ingredient";

import s from './Burger.module.css';

const Burger = ({ingredients}) => {
    const ingredientsArray = [];
    for (let key in ingredients) {
        if (ingredients.hasOwnProperty(key)) {
            if (ingredients[key]) {
                for (let i=0;i<ingredients[key];i++) {
                    ingredientsArray.push(String(key));
                }
            }
        }
    }

    let ingredientElements = [];
    if (!ingredientsArray.length) ingredientElements = <p>Please, start adding elements</p>;
    else {
        ingredientElements = ingredientsArray.map((element, index) => {
            return <Ingredient key={index} type={element}/>;
        });
    }


    return (
        <div className={s.Burger}>
            <Ingredient type='bread-top'/>
            {ingredientElements}
            <Ingredient type='bread-bottom'/>
        </div>
    );
};

export default Burger;