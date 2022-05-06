import React from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import UserPanel from '../components/user/UserPanel.js';
import AdminPanel from '../components/admin/AdminPanel.js';
import PanelHeader from '../components/PanelHeader.js';
import { Link } from 'react-router-dom';

export default function Panel({ logoutLogic, isAdmin, user }) {
    const [openNotifications, setOpenNotifications] = useState(false);

    const handleNotifications = (e) => {
        e.preventDefault();

        if (e.target.className === "fas fa-bell fa-2x")
            setOpenNotifications(!openNotifications);
        else
            setOpenNotifications(false);
    }
    return (
        <div className="Panel" onClick={(e) => { handleNotifications(e); }}>
            <Sidebar logoutLogic={logoutLogic} isAdmin={isAdmin} userID={user.id} username={user.name} />
            <div className='PanelNotSidebar'>
                <PanelHeader user={user} openNotifications={openNotifications} />
                <div id='mainPart'>
                    {
                        isAdmin
                            ? <AdminPanel isAdmin={isAdmin} user={user} />
                            : <UserPanel user={user} />
                    }
                </div>
            </div>
        </div >
    )
}
