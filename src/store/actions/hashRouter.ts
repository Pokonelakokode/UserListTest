import {createAction} from "@reduxjs/toolkit";
import {Pages} from "../reducers/pageState";

export interface INavigateAction {
    page: Pages;
    userId: number | null;
}

export const navigate = createAction<INavigateAction>("NAVIGATE");