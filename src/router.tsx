import React from "react";
import Users from "./components/Users";
import {Pages} from "./store/reducers/pageState";

export const router = (page: Pages): JSX.Element => {
    switch (page) {
        case Pages.ALL:
            return <Users/>;
        case Pages.USER:
            return <h1>USER</h1>;
        default:
            return <h1>NO PAGE</h1>;
    }
};
