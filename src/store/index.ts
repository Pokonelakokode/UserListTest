import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { api } from "./middlewares/api";
import {hashRouter} from "./middlewares/hashRouter";
import {IPageStateActions, pageStateReducer} from "./reducers/pageState";
import {IUserActions, usersReducer} from "./reducers/users";

export const rootReducer = combineReducers({
    pageState: pageStateReducer,
    users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootActions = IPageStateActions[keyof IPageStateActions] | IUserActions[keyof IUserActions];
export const mainSelector = (state: RootState) => state;

export const store = configureStore<RootState>({
    devTools: process.env.NODE_ENV === "production" ? false : {trace: true, traceLimit: 25},
    middleware: [hashRouter, api, thunk],
    reducer: rootReducer,
});
if (process.env.NODE_ENV === "development") {
    // @ts-ignore
    window.store = store;
}
