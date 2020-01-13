import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum UserActionTypes {
    ADD = "ADD",
    UPDATE = "UPDATE",
}

interface IUserActions {
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
