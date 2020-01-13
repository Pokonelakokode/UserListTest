import React from "react";
import { render } from "react-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import "./style.scss";

render(
    <Provider store={store}>
        <h1>ASD</h1>
    </Provider>,
    document.getElementById("app"),
);
