import * as React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {mainSelector} from "../../store";
import {navigate} from "../../store/actions/hashRouter";
import {Pages} from "../../store/reducers/pageState";
import {IUser, userActions, userSelector} from "../../store/reducers/users";

const Edit: React.FC = (props) => {
    const actions = bindActionCreators({
        createUser: userActions.ADD,
        navigate,
        updateUser: userActions.UPDATE,
    }, useDispatch());
    const {pageState: {page}} = useSelector(mainSelector);
    const selectedUser: Partial<IUser> = useSelector(userSelector) || {first_name: "", last_name: "", status: "active"};
    const [user, setUser] = React.useState<Partial<IUser>>(
        page === Pages.NEW ?
            {first_name: "", last_name: "", status: "active"} :
            selectedUser,
    );
    useEffect(() => {
        setUser(selectedUser);
    }, [selectedUser.id]);
    const commit = () => user.id ? actions.updateUser({user, redirect: true}) : actions.createUser(user as IUser);
    const data = user.id ? {page: Pages.USER, userId: user.id} : {page: Pages.ALL};
    return (
        <div className="user-form">
            <h3>{user.id ? `Edit ${user.first_name} ${user.last_name}` : "Create user"}</h3>
            <input
                value={user.first_name}
                placeholder="First name"
                onChange={(e) => setUser({...user, first_name: e.target.value})}
            />
            <input
                value={user.last_name}
                placeholder="Last name"
                onChange={(e) => setUser({...user, last_name: e.target.value})}
            />
            <div className="button-row">
                <button onClick={() => actions.navigate({data, push: true})}>
                    {user.id ? "CANCEL" : "BACK"}
                </button>
                <button onClick={commit}>{user.id ? "UPDATE" : "CREATE"}</button>
            </div>
        </div>
    );
};

export default Edit;
