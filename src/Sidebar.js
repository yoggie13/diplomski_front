import React from 'react';
import logo from './img/laboi_logo.png';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import ActiveGames from './UserPanels/ActiveGames';
import FinishedGames from './UserPanels/FinishedGames';
import Scoreboard from './Scoreboard';

function formatUsername(Username) {
    return Username.split('@')[0];
}

export default function Sidebar({ LogoutLogic, changePanelRender, admin, Username, userID }) {

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



    return (
        <div className="sidebar">
            <img src={logo} />
            {
                admin === false
                    ? <ul>
                        <li>
                            <Link to="/activeGames">Aktivne igre</Link>
                        </li>
                        <li>
                            <Link to="/finishedGames">Završene igre</Link>
                        </li>
                        <li>
                            <Link to="/scoreboard">Scoreboard</Link>
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
                        ? <Link to="/report"><i className="fas fa-exclamation-circle fa-2x" id="report"></i></Link>
                        : null
                }
                <Link to="/profile">{formatUsername(Username)}</Link>
                <i className="fas fa-sign-out-alt fa-2x" id="logOut" onClick={handleLogout}></i>
            </div>

        </div>
    );
}