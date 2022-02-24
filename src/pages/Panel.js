import React from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import UserPanel from '../components/user/UserPanel.js';
import AdminPanel from '../components/admin/AdminPanel.js';

export default function Panel({ logoutLogic, isAdmin, user }) {
    const [sidebarState, setSidebarState] = useState({
        sidebarStatus: window.innerWidth >= 900 ? true : false
    });
    const [openNotifications, setOpenNotifications] = useState(false);

    const handleResize = e => {
        if (window.innerWidth < 900 && sidebarState.sidebarStatus !== false) {
            setSidebarState({ sidebarStatus: false });
            return;
        }
        if (window.innerWidth >= 900 && sidebarState.sidebarStatus !== true) {
            setSidebarState({ sidebarStatus: true });
            return;
        }
    }
    window.addEventListener('resize', handleResize);

    const openSidebar = e => {
        e.preventDefault();

        setSidebarState({ sidebarStatus: true });
    }
    const closeSidebar = e => {
        e.preventDefault();

        if (window.innerWidth < 900 && sidebarState.sidebarStatus)
            setSidebarState({ sidebarStatus: false });

    }

    const handleNotifications = (e) => {
        e.preventDefault();

        console.log(e.target.className)

        if (e.target.className === "fas fa-bell fa-lg")
            setOpenNotifications(!openNotifications);
        else
            setOpenNotifications(false);
    }

    return (
        <div className="Panel" onClick={(e) => { handleNotifications(e); closeSidebar(e); }}>
            {
                sidebarState.sidebarStatus
                    ? <Sidebar logoutLogic={logoutLogic} changePanelRender isAdmin={isAdmin} Username={user.email} userID={user.id} />
                    : <i className="fas fa-bars fa-2x" onClick={openSidebar}></i>
            }
            <div id='mainPart'>
                {
                    isAdmin
                        ? <AdminPanel isAdmin={isAdmin} user={user} />
                        : <UserPanel user={user} openNotifications={openNotifications} />
                }
            </div>
        </div >
    )
}
