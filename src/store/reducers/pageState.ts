import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getHash} from "../../utils";

enum PageStateActionTypes {
    SET = "SET",
    SET_PAGE = "SET_PAGE",
    SET_USER = "SET_USER",
}

export enum Pages {
    ALL = "",
    USER = "user",
    NEW = "new",
}

export interface IPageStateActions {
    SET: PayloadAction<Partial<IPageState>>;
    SET_USER: PayloadAction<number | null>;
    SET_PAGE: PayloadAction<Pages>;
}

interface IPageState {
    readonly loading: boolean;
    readonly page: Pages;
    readonly userId: number | null;
}

const initialState: IPageState = {
    loading: false,
    page: getHash().page || Pages.ALL,
    userId: null,
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
        [PageStateActionTypes.SET_PAGE]:
            (state, action: IPageStateActions["SET_PAGE"]) => {
                return {
                    ...state,
                    currentPage: action.payload,
                };
            },
        [PageStateActionTypes.SET_USER]:
            (state, action: IPageStateActions["SET_USER"]) => {
                return {
                    ...state,
                    selectedUser: action.payload,
                };
            },
    },
});

export const pageStateReducer = pageState.reducer;
export const pageStateActions = pageState.actions;
