import React from "react";
import User from "./components/User";
import Users from "./components/Users";
import {Pages} from "./store/reducers/pageState";
import Edit from "./components/User/Edit";

export const router = (page: Pages): JSX.Element => {
    switch (page) {
        case Pages.ALL:
            return <Users/>;
        case Pages.USER:
            return <User/>;
        case Pages.NEW:
            return <Edit/>;
        case Pages.EDIT:
            return <Edit/>;
        default:
            return <h1>NO PAGE</h1>;
    }
};
