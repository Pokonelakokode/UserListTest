import {Dispatch, MiddlewareAPI} from "redux";
import {apiActions, loadUsers, updateUser, createUser} from "../actions/api";
import {RootActions, RootState} from "../index";
import {Pages, pageStateActions} from "../reducers/pageState";
import {IUser, userActions} from "../reducers/users";
import {batch} from "react-redux";
import {navigate} from "../actions/hashRouter";

export const api = (store: MiddlewareAPI<any, RootState>) =>
    (next: Dispatch<RootActions>) =>
        async (action: RootActions) => {
            switch (true) {
                case userActions.LOAD.match(action):
                    store.dispatch(pageStateActions.SET({loading: true}));
                    const users = await loadUsers();
                    next(userActions.LOAD(users));
                    return store.dispatch(pageStateActions.SET({loading: false}));
                case userActions.UPDATE.match(action):
                    store.dispatch(pageStateActions.SET({loading: true}));
                    const updatedUser = await updateUser(action.payload as Partial<IUser>);
                    next(userActions.UPDATE(updatedUser));
                    return batch(() => {
                        store.dispatch(pageStateActions.SET({
                            loading: false,
                            message: "USER UPDATED SUCCESSFULLY",
                        }));
                        store.dispatch(navigate({data: {page: Pages.USER, userId: updatedUser.id}, push: true}));
                    });
                case userActions.ADD.match(action):
                    store.dispatch(pageStateActions.SET({loading: true}));
                    const newUser = await createUser(action.payload as IUser);
                    next(userActions.ADD(newUser));
                    return batch(() => {
                        store.dispatch(pageStateActions.SET({
                            loading: false,
                            message: "USER CREATED SUCCESSFULLY",
                        }));
                        store.dispatch(navigate({data: {page: Pages.USER, userId: newUser.id}, push: true}));
                    })
                default:
                    return next(action);
            }
        };
