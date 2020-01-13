import { Dispatch, MiddlewareAPI } from "redux";
import {loadUsers, usersLoad} from "../actions/api";
import {RootActions, RootState} from "../index";
import { pageStateActions } from "../reducers/pageState";
import {userActions} from "../reducers/users";

export const api = (store: MiddlewareAPI<any, RootState>) =>
    (next: Dispatch<RootActions>) =>
        async (action: RootActions) => {
            switch (true) {
                case usersLoad.match(action):
                    store.dispatch(pageStateActions.SET({loading: true}));
                    const users = await loadUsers();
                    next(userActions.LOAD(users));
                    return store.dispatch(pageStateActions.SET({loading: false}));
                default:
                    return next(action);
            }
        };
