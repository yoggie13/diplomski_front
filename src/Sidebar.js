import React from 'react';
import logo from './img/laboi_logo.png';
import { useState } from 'react';

function formatUsername(Username) {
    return Username.split('@')[0];
}

export default function Sidebar({ LogoutLogic, changePanelRender, admin, Username }) {

    const [state, setstate] = useState({ admin: false });
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
    const handleAdminAllGames = e => {
        e.preventDefault();
        changePanelRender("allgames");
    }
    const handleCreateGameClick = e => {
        e.preventDefault();
        changePanelRender("creategame");
    }
    const handleTablesClick = e => {
        e.preventDefault();
        changePanelRender("alltables");
    }
    const handleChangePass = e => {
        e.preventDefault();
        changePanelRender("changepassword");
    }


    return (
        <div className="sidebar">
            <img src={logo} />
            {
                admin === false
                    ? <ul>
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
                    : admin === true
                        ? <ul>
                            <li onClick={handleCreateGameClick}>
                                Kreiraj igru
                            </li>
                            <li onClick={handleAdminAllGames}>
                                Sve igre
                            </li>
                            <li onClick={handleTablesClick}>
                                Tabele
                            </li>
                        </ul>
                        : null
            }
            <div id='sidebarFooter'>
                {
                    admin === false
                        ? <i onClick={handleReportClick} className="fas fa-exclamation-circle fa-2x" id="report"></i>
                        : <i className="fas fa-unlock-alt fa-2x" onClick={handleChangePass}></i>
                }
                <p onClick={handleUsernameClick}>{formatUsername(Username)}</p>
                <i className="fas fa-sign-out-alt fa-2x" id="logOut" onClick={handleLogout}></i>
            </div>
        </div>
    );
}