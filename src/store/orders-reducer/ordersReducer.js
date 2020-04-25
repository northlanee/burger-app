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

export const getOrders = (token, userId) => (dispatch) => {
    dispatch(setLoading(true));
    const queryParams =
        "?auth=" + token + '&orderBy="customer/id"&equalTo="' + userId + '"';
    axios.get("/orders.json" + queryParams).then((res) => {
        let orders = [];
        if (res.data) {
            const keys = Object.keys(res.data);
            orders = keys.map((key) => {
                return { ...res.data[key], id: key };
            });
        }
        dispatch(setOrders(orders));
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
