import React from 'react';
import Sidebar from './Sidebar';
import UserInfo from './UserInfo';

export default function UserPanel({ LogoutLogic }) {
    return (
        <div className="UserPanel">
            <Sidebar LogoutLogic={LogoutLogic} />
            <UserInfo />
        </div>
    )
}
