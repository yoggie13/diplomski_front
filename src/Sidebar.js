import React from 'react';
import logo from './img/laboi_logo.png';

export default function Sidebar({ LogoutLogic, changePanelRender }) {

    const handleLogout = e => {
        e.preventDefault();
        LogoutLogic(e);
    }
    const handleUsernameClick = e => {
        e.preventDefault();
        changePanelRender("userinfo");
    }
    const handleActiveGamesClick = e => {
        e.preventDefault();
        changePanelRender("activegames");
    }
    const handleFinishedGamesClick = e => {
        e.preventDefault();
        changePanelRender("finishedgames");
    }
    const handleScoreboardClick = e => {
        e.preventDefault();
        changePanelRender("scoreboard");
    }
    const handleReportClick = e => {
        e.preventDefault();
        changePanelRender("reportproblem");
    }

    return (
        <div className="sidebar">
            <img src={logo} />
            <ul>
                <li onClick={handleActiveGamesClick}>
                    Aktivne igre
                </li>
                <li onClick={handleFinishedGamesClick}>
                    Završene igre
                </li>
                <li onClick={handleScoreboardClick}>
                    Scoreboard
                </li>
            </ul>
            <div id='sidebarFooter'>
                <i onClick={handleReportClick} className="fas fa-exclamation-circle fa-2x" id="report"></i>
                <p onClick={handleUsernameClick}>on20170077</p>
                <i className="fas fa-sign-out-alt fa-2x" id="logOut" onClick={handleLogout}></i>
            </div>
        </div>
    );
}