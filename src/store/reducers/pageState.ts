import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getHash} from "../../utils";

enum PageStateActionTypes {
    SET = "SET",
}

export enum Pages {
    ALL = "",
    USER = "USER",
    NEW = "NEW",
}

export interface IPageStateActions {
    SET: PayloadAction<Partial<IPageState>>;
}

interface IPageState {
    readonly loading: boolean;
    readonly currentPage: Pages,
}

const initialState: IPageState = {
    currentPage: getHash().page || Pages.ALL,
    loading: false,
};

export const pageState = createSlice({
    initialState,
    name: "pageState",
    reducers: {
        [PageStateActionTypes.SET]:
            (state, action: IPageStateActions["SET"]) => {
                return {
                    ...state,
                    ...action.payload,
                };
            },
    },
});

export const pageStateReducer = pageState.reducer;
export const pageStateActions = pageState.actions;
