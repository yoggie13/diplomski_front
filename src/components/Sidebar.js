import React from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import logo from '../assets/laboi_logo.png';

// function formatUsername(Username) {
//     return Username.split('@')[0];
// }

export default function Sidebar({ logoutLogic, isAdmin, userID, username }) {

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
                isAdmin
                    ? <ul>
                        <li>
                            <Link to="/create">Kreiraj igru</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/allGames">Sve igre</Link>
                        </li>
                        <li>
                            <Link to="/scoreboards">Tabele</Link>
                        </li>
                    </ul>
                    : <ul>
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
            }
            <div id='sidebarFooter'>
                {
                    isAdmin
                        ? null
                        : <Link to="/report"><i className="fas fa-exclamation-circle fa-2x" id="report"></i></Link>
                }
                {
                    isAdmin
                        ? <Link to="/profile">{username}</Link>
                        : <Link to="/profile">{userID}</Link>
                }
                <i className="fas fa-sign-out-alt fa-2x" id="logOut" onClick={handleLogout}></i>
            </div>

        </div>
    );
}