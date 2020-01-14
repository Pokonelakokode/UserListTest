import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import { bindActionCreators } from "redux";
import {router} from "../router";
import {mainSelector} from "../store";
import {navigate} from "../store/actions/hashRouter";
import {Pages} from "../store/reducers/pageState";
import {getHash} from "../utils";

const App: React.FC = (props) => {
    const {pageState: {page}} = useSelector(mainSelector);
    const actions = bindActionCreators({navigate }, useDispatch());
    React.useEffect(() => {
        const fn = () => actions.navigate({
            page: getHash().page || Pages.ALL,
            userId: getHash().userId || null,
         });
        window.addEventListener("popstate", fn);
        return () => window.removeEventListener("popstate", fn);
    }, []);
    return router(page);
};

export default App;
