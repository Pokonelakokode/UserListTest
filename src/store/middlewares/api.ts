import { Dispatch, MiddlewareAPI } from "redux";
import {apiActions, loadUsers, updateUser} from "../actions/api";
import {RootActions, RootState} from "../index";
import { pageStateActions } from "../reducers/pageState";
import {IUser, userActions} from "../reducers/users";

export const api = (store: MiddlewareAPI<any, RootState>) =>
    (next: Dispatch<RootActions>) =>
        async (action: RootActions) => {
            switch (true) {
                case apiActions.loadUsers.match(action):
                    store.dispatch(pageStateActions.SET({loading: true}));
                    const users = await loadUsers();
                    next(userActions.LOAD(users));
                    return store.dispatch(pageStateActions.SET({loading: false}));
                case userActions.UPDATE.match(action):
                    store.dispatch(pageStateActions.SET({loading: true}));
                    const updatedUser = await updateUser(action.payload as Partial<IUser>);
                    next(userActions.UPDATE(updatedUser));
                    return store.dispatch(pageStateActions.SET({loading: false}));
                default:
                    return next(action);
            }
        };
