import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import * as serviceWorker from "./serviceWorker";
import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import prodReducer from "./redux/reducers/prodReducer";
import signupReducer from "./redux/reducers/signupLoginReducer";
import orderReducer from "./redux/reducers/orderReducer";
import { BrowserRouter} from 'react-router-dom';

const loggerMiddlaware = store => {
    return next => {
      return action => {
        console.log("MyLoggerMiddleware: Dispatching ==> ", action);
        console.log("MyLoggerMiddleware: State BEFORE : ", store.getState());
        const result = next(action);
        console.log("MyLoggerMiddleware: State AFTER : ", store.getState());
        return result;
      };
    };
  };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    prodReducer,
    signupReducer,
    orderReducer,
})
const middlewares =[thunk];
const store = createStore(reducers, applyMiddleware(...middlewares));

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,  
    document.getElementById("root")
    );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
