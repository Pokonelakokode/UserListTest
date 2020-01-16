import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getHash} from "../../utils";
import { RootState } from "..";

enum PageStateActionTypes {
    SET = "SET",
}

export enum Pages {
    ALL = "all",
    USER = "user",
    NEW = "new",
    EDIT = "edit",
}

export interface IPageStateActions {
    SET: PayloadAction<Partial<IPageState>>;
}

export interface IPageState {
    readonly loading: boolean;
    readonly page: Pages;
    readonly userId: number | null;
    readonly message: string;
}

const initialState: IPageState = {
    loading: false,
    message: "",
    page: getHash().page || Pages.ALL,
    userId: getHash().userId ? parseInt(getHash().userId!, 10) : null,
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

export const pageStateSelector = (state: RootState) => state.pageState;

export const pageStateReducer = pageState.reducer;
export const pageStateActions = pageState.actions;
