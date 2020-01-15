import {createAction} from "@reduxjs/toolkit";
import {serverUrl} from "../../utils";
import {IUser} from "../reducers/users";

export const loadUsers = async (): Promise<IUser[]> => {
    const req = await fetch(`${serverUrl}/users.json`);
    const data = await req.json();
    return data || [];
};

export const updateUser = async (user: Partial<IUser>): Promise<any> => {
    await fetch(`${serverUrl}/users/${user.id}`, {
        body: JSON.stringify(user),
        headers: {"Content-Type": "application/json"},
        method: "PUT",
    });
    return user;
};

export const createUser = async (user: Partial<IUser>): Promise<any> => {
    const newUser = await fetch(`${serverUrl}/users`, {
        body: JSON.stringify(user),
        headers: {"Content-Type": "application/json"},
        method: "POST",
    });
    return await newUser.json();
}

export const apiActions = {
    createUser: createAction<Partial<IUser>>("UPDATE_USER"),
    loadUsers: createAction("LOAD_USERS"),
    updateUser: createAction<Partial<IUser>>("UPDATE_USER"),
};