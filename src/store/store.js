import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import ordersReducer from "./orders-reducer";
import burgerReducer from "./burger-reducer";
import authReducer from "./auth-reducer/auth-reducer";

const reducers = combineReducers({
    ordersReducer,
    burgerReducer,
    authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
