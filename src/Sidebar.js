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
import { useHistory } from 'react-router';


function formatUsername(Username) {
    return Username.split('@')[0];
}

export default function Sidebar({ LogoutLogic, admin, Username }) {

    const [state, setstate] = useState({ admin: false });

    let history = useHistory();
    const handleLogout = e => {
        e.preventDefault();
        LogoutLogic(e);

        history.push('/');
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
                            <li>
                                <Link to="/createGame">Kreiraj igru</Link>
                            </li>
                            <li>
                                <Link to="/allGames">Sve igre</Link>
                            </li>
                            <li>
                                <Link to="/scoreboards">Tabele</Link>
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