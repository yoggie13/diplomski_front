import React from 'react';
import logo from './img/laboi_logo.png';

export default function Sidebar({ LogoutLogic }) {

    const handleLogout = e => {
        e.preventDefault();

        LogoutLogic(e);
    }
    return (
        <div className="sidebar">
            <img src={logo} />
            <ul>
                <li>
                    Aktivne igre
                </li>
                <li>
                    Završene igre
                </li>
                <li>
                    Scoreboard
                </li>
            </ul>
            <div id='sidebarFooter'>
                <i className="fas fa-exclamation-circle fa-2x" id="report"></i>
                <p>on20170077</p>
                <i className="fas fa-sign-out-alt fa-2x" id="logOut" onClick={handleLogout}></i>
            </div>
        </div>
    );
}