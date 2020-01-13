import * as React from "react";
import {IUser} from "../../store/reducers/users";

interface IProps {
    user: IUser;
    update(user: Partial<IUser>): void;
}

const User: React.FC<IProps> = ({user, update}) => {
    const updateStatus = () => update({...user, status: user.status === "active" ? "locked" : "active"});
    return (
        <React.Fragment>
            <p className="user">
                {`${user.first_name} ${user.last_name}`}
            </p>
            <p className="status" onClick={updateStatus}>{user.status}</p>
        </React.Fragment>
    );
};

export default User;
