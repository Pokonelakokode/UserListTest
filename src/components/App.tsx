import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import { bindActionCreators } from "redux";
import {router} from "../router";
import {mainSelector} from "../store";
import {getPage, getUserId, navigate} from "../store/actions/hashRouter";
import Loader from "./Loader";
import {pageStateSelector} from "../store/reducers/pageState";

const App: React.FC = (props) => {
    const {page, loading} = useSelector(pageStateSelector);
    const actions = bindActionCreators({navigate }, useDispatch());
    React.useEffect(() => {
        const fn = () => actions.navigate({
            data: {
                page: getPage(),
                userId: getUserId(),
            },
            push: true,
         });
        window.addEventListener("popstate", fn);
        return () => window.removeEventListener("popstate", fn);
    }, []);
    return (
        <React.Fragment>
            {router(page)}
            <Loader/>
        </React.Fragment>
    );
};

export default App;
