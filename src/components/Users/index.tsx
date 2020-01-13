import * as React from "react";
import {useSelector} from "react-redux";
import {mainSelector, RootState} from "../../store";
import User from "./User";

const Users: React.FC = (props) => {
    const {users} = useSelector(mainSelector);
    const usersComp =  users.map((user) => <User user={user} key={user.id}/>);
    return (
        <div>
            {usersComp}
        </div>
    );
};

export default Users;
