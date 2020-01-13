import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum UserActionTypes {
    LOAD = "LOAD",
    ADD = "ADD",
    UPDATE = "UPDATE",
}

export interface IUserActions {
    LOAD: PayloadAction<IUser[]>;
    ADD: PayloadAction<IUser>;
    UPDATE: PayloadAction<Partial<IUser>>;
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
                return state.map((user) => user.id === action.payload.id ? {...user, ...action.payload} : user);
            },
    },
});

export const userActions = users.actions;
export const usersReducer = users.reducer;