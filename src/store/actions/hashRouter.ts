import {createAction} from "@reduxjs/toolkit";
import {getHash} from "../../utils";
import {Pages} from "../reducers/pageState";

export interface INavigateAction {
    data: {
        page: Pages;
        userId?: number | null;
    };
    push?: boolean;
}

export const navigate = createAction<INavigateAction>("NAVIGATE");
export const getPage = () => getHash().page || Pages.ALL;
export const getUserId = () => getHash().userId ? parseInt(getHash().userId!, 10) : null;
