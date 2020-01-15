import React from "react";
import { render } from "react-dom";
import {Provider} from "react-redux";
import App from "./components/App";
import {store} from "./store";
import {apiActions} from "./store/actions/api";
import "./style.scss";
import {userActions} from "./store/reducers/users";

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("app"),
);
store.dispatch(userActions.LOAD([]));
