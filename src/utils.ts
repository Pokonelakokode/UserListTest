import { Pages } from "./store/reducers/pageState";

export const serverUrl = "http://js-assessment-backend.herokuapp.com";

interface IHash {
    page?: Pages;
    userId?: number;
}

export function getHash(): IHash {
    const hash = window.location.hash.substr(1);
    return hash.split("&").reduce((acc: {[key: string]: any}, el) => {
        const data = el.split("=");
        if (data.length === 2) { acc[data[0]] = data[1]; }
        return acc;
    }, {});
}
