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

interface IPageStateActions {
    SET: PayloadAction<Partial<IPageState>>;
}

interface IPageState {
    readonly ready: boolean;
    readonly currentPage: Pages,
}

const initialState: IPageState = {
    currentPage: getHash().page || Pages.ALL,
    ready: false,
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
