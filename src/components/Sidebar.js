import React from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import logo from '../assets/laboi_logo.png';

function formatUsername(Username) {
    return Username.split('@')[0];
}

export default function Sidebar({ logoutLogic, admin, Username }) {

    let history = useHistory();
    const handleLogout = e => {
        e.preventDefault();
        logoutLogic(e);

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
                    : admin
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