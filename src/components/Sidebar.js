import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import logo from '../assets/laboi_logo.png';
import '../assets/styles/Sidebar.css';

// function formatUsername(Username) {
//     return Username.split('@')[0];
// }

export default function Sidebar({ logoutLogic, isAdmin, setSidebarState }) {
    const [opened, setOpened] = useState(window.innerWidth > 900 ? true : false)

    let history = useHistory();
    const handleLogout = e => {
        e.preventDefault();
        logoutLogic(e);

        history.push('/');
    }
    const handleResize = e => {
        if (window.innerWidth < 900 && opened !== false) {
            setOpened(false);
            return;
        }
    }
    window.addEventListener('resize', handleResize);

    return (
        <>  {
            opened
                ? <div className="sidebar">
                    <div id='sidebarHeader'>
                        <img src={logo} alt="laboi logo" />
                        <i className="fas fa-arrow-left fa"
                            onClick={e => {
                                e.preventDefault();
                                setOpened(false)
                            }}>
                        </i>
                    </div>
                    <div id='sidebarMain'>
                        {
                            isAdmin
                                ? <ul>
                                    <li className='sidebar-li'>
                                        <Link to="/create">
                                            <div className='sidebar-div'>
                                                <i className="fas fa-plus"></i>
                                                <p>Kreiraj igru</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard">
                                            <div className='sidebar-div'>
                                                <i className="fas fa-tachometer-alt"></i>
                                                <p>Dashboard</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/allGames">
                                            <div className='sidebar-div'>
                                                <i className="fas fa-gamepad"></i>
                                                <p>Sve igre</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/scoreboards">
                                            <div className='sidebar-div'>
                                                <i className="fas fa-trophy"></i>
                                                <p>Tabele</p>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                                : <ul>
                                    <li>
                                        <Link to="/games">
                                            <div className='sidebar-div'>
                                                <i className="fas fa-gamepad"></i>
                                                <p>Igre</p>
                                            </div>
                                        </Link>

                                    </li>
                                    <li>
                                        <Link to="/scoreboard">
                                            <div className='sidebar-div'>
                                                <i className="fas fa-trophy"></i>
                                                <p>Tabela</p>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                        }
                    </div>
                    <div id='sidebarFooter'>
                        {
                            isAdmin
                                ? null
                                : <Link to="/report">
                                    <i className="fas fa-exclamation-circle fa-2x" id="report"></i>
                                </Link>
                        }
                        <i className="fas fa-sign-out-alt fa-2x" id="logOut" onClick={handleLogout}></i>
                    </div>
                </div>
                : <div className='smallSidebar'>
                    <i className="fas fa-bars fa-2x"
                        onClick={e => {
                            e.preventDefault()
                            setOpened(true)
                        }}>
                    </i>
                    <div className='smallSidebar-list'>
                        {
                            isAdmin
                                ? <>
                                    <Link to="/create">
                                        <i className="fas fa-plus fa-lg"></i>
                                    </Link>
                                    <Link to="/dashboard">
                                        <i className="fas fa-tachometer-alt fa-lg"></i>
                                    </Link>
                                    <Link to="/allGames">
                                        <i className="fas fa-gamepad fa-lg"></i>
                                    </Link>
                                    <Link to="/scoreboards">
                                        <i className="fas fa-trophy fa-lg"></i>
                                    </Link>
                                </>
                                : <>
                                    <Link to='/games'>
                                        <i className="fas fa-gamepad fa-lg"></i>
                                    </Link>
                                    <Link to='/scoreboard'>
                                        <i className="fas fa-trophy fa-lg"></i>
                                    </Link>
                                </>
                        }
                    </div>

                </div>
        }
        </>
    );
}