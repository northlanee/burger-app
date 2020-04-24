import { updateObject } from "../utility";
import axios from "../../api";

const prefix = "@burger/";

const SET_LOADING = prefix + "SET_LOADING";
const SET_BURGER = prefix + "SET_BURGER";

const initialState = {
    ingredients: null,
    ingredientsCount: null,
    totalPrice: null,
    loading: true,
};

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BURGER:
            return {
                ...state,
                ingredients: action.payload.ingredients,
                ingredientsCount: action.payload.ingredientsCount,
                totalPrice: action.payload.totalPrice,
            };
        case SET_LOADING:
            return updateObject(state, {
                loading: action.payload,
            });
        default:
            return state;
    }
};

export default burgerReducer;

const countIngredients = (ingredients) => {
    const keys = Object.keys(ingredients);
    return keys.reduce((prev, key) => {
        return prev + ingredients[key].count;
    }, 0);
};

export const setBurger = (payload) => ({ type: SET_BURGER, payload });
export const setLoading = (payload) => ({ type: SET_LOADING, payload });

export const getIngredients = () => (dispatch) => {
    dispatch(setLoading(true));
    axios
        .get("/ingr.json")
        .then((response) => {
            const { totalPrice, ...ingredients } = response.data;
            dispatch(
                setBurger({
                    ingredients,
                    ingredientsCount: countIngredients(ingredients),
                    totalPrice,
                })
            );
            dispatch(setLoading(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(setLoading(false));
        });
};
