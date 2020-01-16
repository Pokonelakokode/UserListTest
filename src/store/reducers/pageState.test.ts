import { createStore, Store } from "redux";
import {IPageState, Pages, pageStateActions, pageStateReducer} from "./pageState";

describe("pageState reducer", () => {
    let store: Store<IPageState>;
    beforeEach(() => {
        store = createStore(pageStateReducer);
    });
    it("should be able to initialize", () => {
        expect(store.getState()).toStrictEqual({
            loading: false,
            message: "",
            page: Pages.ALL,
            userId: null,
        });
    });
    it("should be able to SET", () => {
        store.dispatch(pageStateActions.SET({loading: true}));
        expect(store.getState().loading).toBe(true);
    });
});
