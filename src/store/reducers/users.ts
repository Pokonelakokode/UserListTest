import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";

export enum UserActionTypes {
    LOAD = "LOAD",
    ADD = "ADD",
    UPDATE = "UPDATE",
    SET_STATUS = "SET_STATUS",
}

export interface IUserActions {
    LOAD: PayloadAction<IUser[]>;
    ADD: PayloadAction<IUser>;
    UPDATE: PayloadAction<{user: Partial<IUser>, redirect?: boolean}>;
    SET_STATUS: PayloadAction<Partial<IUser>>;
}

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    status: "active" | "locked";
    created_at: Date;
    updated_at: Date;
}

const initialState: IUser[] = [];

export const users = createSlice({
    initialState,
    name: "users",
    reducers: {
        [UserActionTypes.LOAD]:
            (state, action: IUserActions["LOAD"]) => {
                return action.payload;
            },
        [UserActionTypes.ADD]:
            (state, action: IUserActions["ADD"]) => {
                return [
                    ...state,
                    action.payload,
                ];
            },
        [UserActionTypes.UPDATE]:
            (state, action: IUserActions["UPDATE"]) => {
                return state.map((user) => user.id === action.payload.user.id ?
                    {...user, ...action.payload.user} :
                    user,
                );
            },
    },
});

export const userSelector = (state: RootState): IUser | null => {
    return state.users.find((user) => user.id === state.pageState.userId) || null;
};

export const userActions = users.actions;
export const usersReducer = users.reducer;
