import { create } from "react-test-renderer";
import {Provider} from "react-redux";
import {store} from "../store";
import React from "react";
import App from "./App";

describe("App component", () => {
    it("should be able to render", () => {
        const component = create(
            <Provider store={store}>
                <App/>
            </Provider>,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});