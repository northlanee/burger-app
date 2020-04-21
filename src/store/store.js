import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import ordersReducer from "./orders-reducer";
import burgerReducer from "./burger-reducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
    ordersReducer,
    burgerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
