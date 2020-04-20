import { createStore, combineReducers } from "redux";
import ordersReducer from "./orders-reducer";
import burgerReducer from "./burger-reducer";

const reducers = combineReducers({
    ordersReducer,
    burgerReducer,
});

export default createStore(reducers);
