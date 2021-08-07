import React from 'react';
import { useState } from 'react';
import Sidebar from './Sidebar';
import UserInfo from './UserInfo';

export default function UserPanel({ LogoutLogic }) {
    const [state, setState] = useState({ sidebarStatus: window.innerWidth >= 900 ? true : false });

    const handleResize = e => {
        if (window.innerWidth < 900 && state.sidebarStatus !== false) {
            setState({ sidebarStatus: false });
            return;
        }
        if (window.innerWidth >= 900 && state.sidebarStatus !== true) {
            setState({ sidebarStatus: true });
            return;
        }
    }
    window.addEventListener('resize', handleResize);

    const openSidebar = e => {
        e.preventDefault();

        setState({ sidebarStatus: true });
    }
    const closeSidebar = e => {
        e.preventDefault();

        if (window.innerWidth < 900 && state.sidebarStatus === true)
            setState({ sidebarStatus: false });

    }


    return (
        <div className="UserPanel" onClick={closeSidebar}>
            {state.sidebarStatus
                ? <Sidebar LogoutLogic={LogoutLogic} />
                : <i className="fas fa-bars fa-2x" onClick={openSidebar}></i>
            }
            <UserInfo />
        </div>
    )
}
