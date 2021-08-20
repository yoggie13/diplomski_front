import React from 'react';
import { useState } from 'react';
import ActiveGames from './UserPanels/ActiveGames';
import ChangePassword from './ChangePassword';
import FinishedGames from './UserPanels/FinishedGames';
import Game from './UserPanels/Game';
import ReportProblem from './ReportProblem';
import Scoreboard from './Scoreboard';
import Sidebar from './Sidebar';
import UserInfo from './UserInfo';
import CreateGame from './AdminPanels/CreateGame';
import AllGames from './AdminPanels/AllGames';
import AllTables from './AdminPanels/AllTables';
import GameDashboard from './AdminPanels/GameDashboard';
import Rewards from './AdminPanels/Rewards';
import Loading from './Loading';
import Confirmation from './AdminPanels/Confirmation';
export default function UserPanel({ LogoutLogic, admin, User }) {
    const [sidebarState, setSidebarState] = useState({
        sidebarStatus: window.innerWidth >= 900 ? true : false
    });
    const [panelState, setPanelState] = useState({
        whatToRender: admin === false ? "userinfo" : "rewards",
    });
    const [IDState, setIDState] = useState({
        id: 31
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

    const changeRender = (what, id = null) => {
        setIDState({ id: id });
        setPanelState({ whatToRender: what });
    }


    return (
        <div className="UserPanel" onClick={closeSidebar}>
            {
                sidebarState.sidebarStatus
                    ? <Sidebar LogoutLogic={LogoutLogic} changePanelRender={changeRender} admin={admin} Username={User.email} />
                    : <i className="fas fa-bars fa-2x" onClick={openSidebar}></i>
            }
            <div id='mainPart'>
                {
                    panelState.loading === true
                        ? <Loading />
                        : panelState.whatToRender === "userinfo"
                            ? <UserInfo changeRender={changeRender} admin={admin} User={User} />
                            : panelState.whatToRender === "scoreboard"
                                ? <Scoreboard />
                                : panelState.whatToRender === "activegames"
                                    ? <ActiveGames changeRender={changeRender} />
                                    : panelState.whatToRender === "game"
                                        ? <Game id={IDState.id} userID={User.id} />
                                        : panelState.whatToRender === "finishedgames"
                                            ? <FinishedGames changeRender={changeRender} />
                                            : panelState.whatToRender === "reportproblem"
                                                ? <ReportProblem userID={User.id} />
                                                : panelState.whatToRender === "changepassword"
                                                    ? <ChangePassword changeRender={changeRender} userID={User.id} />
                                                    : panelState.whatToRender === "gamedashboard"
                                                        ? <GameDashboard gameID={IDState.id} />
                                                        : panelState.whatToRender === "creategame"
                                                            ? <CreateGame changeRender={changeRender} />
                                                            : panelState.whatToRender === "confirmation"
                                                                ? <Confirmation game={IDState.id} changeRender={changeRender} />
                                                                : panelState.whatToRender === "allgames"
                                                                    ? <AllGames changeRender={changeRender} />
                                                                    : panelState.whatToRender === "alltables"
                                                                        ? <AllTables />
                                                                        : panelState.whatToRender === "rewards"
                                                                            ? <Rewards gameID={IDState.id} changeRender={changeRender} />
                                                                            : "GREŠKA"
                }
            </div>
        </div>
    )
}
