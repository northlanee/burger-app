import { updateObject } from "../utility";
import axios from "../../api";

const prefix = "@burger/";

const SET_LOADING = prefix + "SET_LOADING";
const SET_BURGER = prefix + "SET_BURGER";
const SET_INITIALIZED = prefix + "SET_INITIALIZED";

const initialState = {
    ingredients: null,
    ingredientsCount: null,
    totalPrice: null,
    initialized: false,
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
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: action.payload,
            };
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
export const setInitialized = (payload) => ({ type: SET_INITIALIZED, payload });

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
            dispatch(setInitialized(true));
            dispatch(setLoading(false));
        })
        .catch(() => {
            dispatch(setLoading(false));
        });
};
