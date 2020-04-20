const SET_ORDERS = "SET_ORDERS";

const initialState = {
    orders: [],
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.payload.orders,
            };
    }
    return state;
};

export default ordersReducer;

export const setOrders = (payload) => ({ type: SET_ORDERS, payload: payload });
