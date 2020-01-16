import {store} from "./index";

describe("Store test", () => {
    it("should be able to initialize", () => {
        expect(store.getState()).toStrictEqual({
            pageState: {
                loading: false,
                message: "",
                page: "all",
                userId: null,
            },
            users: [],
        });
    });
});
