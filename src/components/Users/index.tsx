import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {mainSelector} from "../../store";
import { userActions} from "../../store/reducers/users";
import Controls from "./Controls";
import User from "./User";
import { bindActionCreators } from "redux";
import { navigate } from "../../store/actions/hashRouter";

export interface IUsersState {
    search: string;
    page: number;
    count: 10 | 20 | 50 | 100;
}

const Users: React.FC = (props) => {
    const {users} = useSelector(mainSelector);
    const actions = bindActionCreators({
        navigate,
        update: userActions.UPDATE,
    }, useDispatch());
    const [state, setState] = React.useState<IUsersState>({search: "", count: 20, page: 0});
    const matcher = new RegExp(state.search, "gi");
    const filteredUsers = state.search.trim() !== "" ?
        users.filter((user) => (
            user.first_name.match(matcher) || user.last_name.match(matcher)
        )) :
        users;
    const usersComp = filteredUsers
        .slice(state.page * state.count, (state.page + 1) * state.count)
        .map((user) => <User user={user} key={user.id} update={actions.update} navigate={actions.navigate}/>);
    return (
        <div id="UsersList">
            <h2>Users</h2>
            <Controls setState={setState} state={state} length={filteredUsers.length}/>
            <div className="user-list">
                {usersComp}
            </div>

        </div>
    );
};

export default Users;
