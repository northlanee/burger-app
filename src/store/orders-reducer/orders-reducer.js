import axios from "../../api";

const prefix = "@orders/";

const SET_ORDERS = prefix + "SET_ORDERS";
const SET_LOADING = prefix + "SET_LOADING";

const initialState = {
    orders: [],
    loading: false,
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
        default:
            return state;
    }
};

export default ordersReducer;

export const setOrders = (orders) => ({ type: SET_ORDERS, orders });
const setLoading = (payload) => ({ type: SET_LOADING, payload });

export const getOrders = (token) => (dispatch) => {
    dispatch(setLoading(true));
    console.log(token);
    axios.get("/orders.json?auth=" + token).then((res) => {
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

export const orderHandler = (order, token, history) => (dispatch) => {
    dispatch(setLoading(true));
    axios.post("/orders.json?auth=" + token, order).then(() => {
        dispatch(setLoading(false));
        history.push("/orders");
    });
};
