import React from 'react';
import Sidebar from './Sidebar';
import UserInfo from './UserInfo';

export default function UserPanel() {
    return (
        <div className="UserPanel">
            <Sidebar />
            <UserInfo />
        </div>
    )
}
