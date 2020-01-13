import {configureStore, combineReducers} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {pageStateReducer} from "./reducers/pageState";

export const rootReducer = combineReducers({
    pageState: pageStateReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore<RootState>({
    devTools: process.env.NODE_ENV === "production" ? false : {trace: true, traceLimit: 25},
    middleware: [thunk],
    reducer: rootReducer,
});
