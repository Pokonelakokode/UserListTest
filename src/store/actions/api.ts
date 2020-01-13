import {createAction} from "@reduxjs/toolkit";
import {serverUrl} from "../../utils";
import {IUser} from "../reducers/users";

export const usersLoad = createAction("LOAD_USERS");
export const loadUsers = async (): Promise<IUser[]> => {
    const req = await fetch(`${serverUrl}/users.json`);
    const data = await req.json();
    return data || [];
};
