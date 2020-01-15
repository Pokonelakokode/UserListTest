import { createStore, Store } from "redux";
import {IUser, userActions, usersReducer} from "./users";

const testData: IUser[] = [{
    created_at: new Date(),
    first_name: "TEST",
    id: 1,
    last_name: "DATA",
    status: "locked",
    updated_at: new Date(),
}];

describe("users reducers", () => {
    let store: Store<IUser[]>;
    beforeEach(() => {
        store = createStore(usersReducer);
    });
    it("should be able to initialize", () => {
        expect(store.getState()).toEqual([]);
    });
    it("should be able to load", () => {
        store.dispatch(userActions.LOAD(testData));
        expect(store.getState()).toStrictEqual(testData);
    });
    it("should be able to update", () => {
        store = createStore(usersReducer, testData);
        store.dispatch(userActions.UPDATE({...testData[0], first_name: "TEST2"}));
        expect(store.getState()[0].first_name).toBe("TEST2");
    });
    it("should be able to add", () => {
        store.dispatch(userActions.ADD(testData[0]));
        expect(store.getState()).toStrictEqual(testData);
    });
});