import React from "react";
import PropTypes from "prop-types";

import s from "./Ingredient.module.css";

const Ingredient = ({ cssClass }) => {
    return <div className={s[cssClass]} />;
};

Ingredient.propTypes = {
    cssClass: PropTypes.string.isRequired,
};

export default Ingredient;
