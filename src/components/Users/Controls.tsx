import * as React from "react";
import {Dispatch} from "react";
import {IUsersState} from "./index";

interface IProps {
    state: IUsersState;
    setState: Dispatch<IUsersState>;
    length: number;
}

const Controls: React.FC<IProps> = ({setState, state, length}) => {
    const setPage = (num: number) => {
        let nextPage;
        switch (true) {
            case state.page + num < 0:
                nextPage = 0;
                break;
            case (state.page + num + 1) * state.count > length:
                nextPage = state.page;
                break;
            default:
                nextPage = state.page + num;
        }
        setState({...state, page: nextPage});

    }
    return (
        <div className="controls">
            <input value={state.search}
                   onChange={(e) => {
                       setState({...state, search: e.target.value, page: 0});
                   }}
                   placeholder="Search"
            />
            <div className="pager">
                <div className="arrow"
                     onClick={() => setPage(-1)}
                >
                    ⇐
                </div>
                <div>
                    Users: <b>{length}</b><br/>
                    Page: <b>{state.page + 1}/{Math.ceil(length / state.count)}</b>
                </div>
                <div className="arrow"
                     onClick={() => setPage(+1)}
                >
                    ⇒
                </div>
            </div>


        </div>
    );
};

export default Controls;
