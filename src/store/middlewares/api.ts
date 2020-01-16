import {batch} from "react-redux";
import {Dispatch, MiddlewareAPI} from "redux";
import {apiActions, createUser, loadUsers, updateUser} from "../actions/api";
import {navigate} from "../actions/hashRouter";
import {RootActions, RootState} from "../index";
import {Pages, pageStateActions} from "../reducers/pageState";
import {IUser, IUserActions, userActions} from "../reducers/users";

export const api = (store: MiddlewareAPI<any, RootState>) =>
    (next: Dispatch<RootActions>) =>
        async (action: RootActions) => {
            if (true === userActions.LOAD.match(action)) {
                store.dispatch(pageStateActions.SET({loading: true}));
                const users = await loadUsers();
                next(userActions.LOAD(users));
                return store.dispatch(pageStateActions.SET({loading: false}));
            } else if (userActions.UPDATE.match(action)) {
                store.dispatch(pageStateActions.SET({loading: true}));
                const updatedUser = await updateUser(action.payload.user as Partial<IUser>);
                next(userActions.UPDATE({user: updatedUser}));
                return batch(() => {
                    store.dispatch(pageStateActions.SET({
                        loading: false,
                        message: "USER UPDATED SUCCESSFULLY",
                    }));
                    action.payload.redirect && store.dispatch(navigate({data: {page: Pages.USER, userId: updatedUser.id}, push: true}));
                });
            } else if (true === userActions.ADD.match(action)) {
                store.dispatch(pageStateActions.SET({loading: true}));
                const newUser = await createUser(action.payload as IUser);
                next(userActions.ADD(newUser));
                return batch(() => {
                    store.dispatch(pageStateActions.SET({
                        loading: false,
                        message: "USER CREATED SUCCESSFULLY",
                    }));
                    store.dispatch(navigate({data: {page: Pages.USER, userId: newUser.id}, push: true}));
                });
            } else {
                return next(action);
            }
        };
