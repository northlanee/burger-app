import axios from "../../api";

const SET_ORDERS = "SET_ORDERS";
const SET_LOADING = "SET_LOADING";

const initialState = {
    orders: [],
    loading: true,
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
    }
    return state;
};

export default ordersReducer;

export const setOrders = (orders) => ({ type: SET_ORDERS, orders });
const setLoading = (payload) => ({ type: SET_LOADING, payload });
export const getOrders = () => (dispatch) => {
    dispatch(setLoading(true));
    axios.get("/orders.json").then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({
                ...res.data[key],
                id: key,
            });
        }
        dispatch(setOrders(fetchedOrders));
        dispatch(setLoading(false));
    });
};
