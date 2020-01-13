import * as React from "react";
import {IUser} from "../../store/reducers/users";

interface IProps {
    user: IUser;
}

const User: React.FC<IProps> = ({user}) => {
    return (
        <div>
            {user.first_name + user.last_name}
        </div>
    );
};

export default User;
