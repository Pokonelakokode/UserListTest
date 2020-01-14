import {Dispatch, MiddlewareAPI} from "redux";
import {actionMatcher, setHash} from "../../utils";
import {navigate} from "../actions/hashRouter";
import {RootActions, RootState} from "../index";
import {pageStateActions} from "../reducers/pageState";

export const hashRouter = (store: MiddlewareAPI<any, RootState>) =>
    (next: Dispatch<RootActions>) =>
        async (action: RootActions) => {
            next(action);
            if (navigate.match(action)) {
                setHash(action.payload);
                store.dispatch(pageStateActions.SET(action.payload));
            }
};
