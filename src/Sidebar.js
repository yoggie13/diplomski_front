import React from 'react';
import logo from './img/laboi_logo.png';

export default function Sidebar() {
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
                <i className="fas fa-exclamation-circle fa-2x" id="report" c></i>
                <p>on20170077</p>
                <i class="fas fa-sign-out-alt fa-2x" id="logOut"></i>
            </div>
        </div>
    );
}