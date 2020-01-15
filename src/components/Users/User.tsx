import * as React from "react";
import { INavigateAction } from "../../store/actions/hashRouter";
import {Pages} from "../../store/reducers/pageState";
import {IUser} from "../../store/reducers/users";

interface IProps {
    user: IUser;
    update(user: Partial<IUser>): void;
    navigate(action: INavigateAction): void;
}

const User: React.FC<IProps> = ({user, update, navigate}) => {
    const updateStatus = () => update({...user, status: user.status === "active" ? "locked" : "active"});
    return (
        <div className="users-list-item">
            <p className="name" onClick={() => {navigate({data: {page: Pages.USER, userId: user.id}}); }}>
                {`${user.first_name} ${user.last_name}`}
            </p>
            <button className={`status ${user.status}`} onClick={updateStatus}>{user.status}</button>
        </div>
    );
};

export default User;
