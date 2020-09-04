import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {authoriztionReducer} from "./authorizationReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
    authorization: authoriztionReducer,
});

export const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));