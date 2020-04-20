const prefix = "@burger_";

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
};

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload.ingredients,
            };
        case SET_BURGER:
            return {
                ...state,
                ingredients: action.payload.ingredients,
                totalCost: action.payload.totalCost,
            };
    }
    return state;
};

export default burgerReducer;

export const setIngredients = (payload) => ({ type: SET_INGREDIENTS, payload });
export const setBurger = (payload) => ({ type: SET_BURGER, payload });
