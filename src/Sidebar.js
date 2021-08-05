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
            <div id='sidebarFotter'>
                <i className="fas fa-exclamation-circle fa-2x"></i>
                <p>on20170077</p>
            </div>
        </div>
    );
}
