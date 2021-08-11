import React from 'react';
import { useState } from 'react';
import ActiveGames from './UserPanels/ActiveGames';
import ChangePassword from './ChangePassword';
import FinishedGames from './UserPanels/FinishedGames';
import Game from './UserPanels/Game';
import ReportProblem from './ReportProblem';
import Scoreboard from './Scoreboard';
import Sidebar from './Sidebar';
import UserInfo from './UserPanels/UserInfo';
import CreateGame from './AdminPanels/CreateGame';
import AllGames from './AdminPanels/AllGames';
import AllTables from './AdminPanels/AllTables';
import GameDashboard from './AdminPanels/GameDashboard';

export default function UserPanel({ LogoutLogic, admin }) {
    const [sidebarState, setSidebarState] = useState({
        sidebarStatus: window.innerWidth >= 900 ? true : false
    });
    const [panelState, setPanelState] = useState({
        whatToRender: admin === false ? "userinfo" : "gamedashboard"
    });

    const handleResize = e => {
        if (window.innerWidth < 900 && sidebarState.sidebarStatus !== false) {
            setSidebarState({ sidebarStatus: false });
            return;
        }
        if (window.innerWidth >= 900 && sidebarState.sidebarStatus !== true) {
            setSidebarState({ sidebarStatus: true });
            return;
        }
    }
    window.addEventListener('resize', handleResize);

    const openSidebar = e => {
        e.preventDefault();

        setSidebarState({ sidebarStatus: true });
    }
    const closeSidebar = e => {
        e.preventDefault();

        if (window.innerWidth < 900 && sidebarState.sidebarStatus === true)
            setSidebarState({ sidebarStatus: false });

    }

    const changeRender = what => {
        setPanelState({ whatToRender: what });
    }


    return (
        <div className="UserPanel" onClick={closeSidebar}>
            {
                sidebarState.sidebarStatus
                    ? <Sidebar LogoutLogic={LogoutLogic} changePanelRender={changeRender} admin={admin} />
                    : <i className="fas fa-bars fa-2x" onClick={openSidebar}></i>
            }
            <div id='mainPart'>
                {
                    panelState.whatToRender === "userinfo"
                        ? <UserInfo changeRender={changeRender} admin={admin} />
                        : panelState.whatToRender === "scoreboard"
                            ? <Scoreboard />
                            : panelState.whatToRender === "activegames"
                                ? <ActiveGames changeRender={changeRender} />
                                : panelState.whatToRender === "game"
                                    ? <Game />
                                    : panelState.whatToRender === "finishedgames"
                                        ? <FinishedGames />
                                        : panelState.whatToRender === "reportproblem"
                                            ? <ReportProblem />
                                            : panelState.whatToRender === "changepassword"
                                                ? <ChangePassword changeRender={changeRender} />
                                                : panelState.whatToRender === "gamedashboard"
                                                    ? <GameDashboard />
                                                    : panelState.whatToRender === "creategame"
                                                        ? <CreateGame />
                                                        : panelState.whatToRender === "allgames"
                                                            ? <AllGames />
                                                            : panelState.whatToRender === "alltables"
                                                                ? <AllTables />
                                                                : "GREŠKA"
                }
            </div>
        </div>
    )
}
