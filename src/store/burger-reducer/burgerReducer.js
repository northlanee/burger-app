import { updateObject } from "../utility";
import axios from "../../api";

const prefix = "@burger/";

const SET_INGREDIENTS = prefix + "SET_INGREDIENTS";
const SET_BURGER = prefix + "SET_BURGER";

const initialState = {
    costs: {
        salad: 0.44,
        cheese: 0.57,
        meat: 1.2,
        bacon: 1.35,
    },
    ingredients: null,
    totalCost: 1.5,
    loading: true,
};

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.payload.ingredients,
                totalCost: 1.5,
            });
        case SET_BURGER:
            return updateObject(state, {
                ingredients: action.payload.ingredients,
                totalCost: action.payload.totalCost,
            });
        default:
            return state;
    }
};

export default burgerReducer;

export const setIngredients = (payload) => ({ type: SET_INGREDIENTS, payload });
export const setBurger = (payload) => ({ type: SET_BURGER, payload });

export const getIngredients = () => (dispatch) => {
    axios.get("/ingredients.json").then((response) => {
        dispatch(setIngredients({ ingredients: response.data }));
    });
};
