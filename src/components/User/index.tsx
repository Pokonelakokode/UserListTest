import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {IUser, userSelector} from "../../store/reducers/users";
import {bindActionCreators} from "redux";
import {navigate} from "../../store/actions/hashRouter";
import { Pages } from "../../store/reducers/pageState";

const User: React.FC = (props) => {
    const user = useSelector(userSelector) as IUser;
    const actions = bindActionCreators({navigate}, useDispatch());
    if (!user) {
        return <div className="user-show"><h1>No such User</h1></div>
    }
    return (
        <div className="user-show">
            <h1>{`${user?.first_name} ${user?.last_name}`}</h1>
            <h3>{user?.status}</h3>
            <h5>User ID: {user.id}</h5>
            <h5>Created at: {user.created_at}</h5>
            <h5>Updated at: {user.updated_at}</h5>
            <div className="button-row">
                <button onClick={() => actions.navigate({data: {page: Pages.ALL}})}>
                    BACK
                </button>
                <button onClick={() => actions.navigate({data: {userId: user.id, page: Pages.EDIT }})}>
                    EDIT
                </button>
            </div>

        </div>
    );
};

export default User;
