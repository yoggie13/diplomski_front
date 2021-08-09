import React from 'react';
import { useState } from 'react';
import ActiveGames from './ActiveGames';
import ChangePassword from './ChangePassword';
import FinishedGames from './FinishedGames';
import ReportProblem from './ReportProblem';
import Scoreboard from './Scoreboard';
import Sidebar from './Sidebar';
import UserInfo from './UserInfo';

export default function UserPanel({ LogoutLogic }) {
    const [sidebarState, setSidebarState] = useState({
        sidebarStatus: window.innerWidth >= 900 ? true : false
    });
    const [panelState, setPanelState] = useState({
        whatToRender: "userinfo"
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
                    ? <Sidebar LogoutLogic={LogoutLogic} changePanelRender={changeRender} />
                    : <i className="fas fa-bars fa-2x" onClick={openSidebar}></i>
            }
            <div id='mainPart'>
                {
                    panelState.whatToRender === "userinfo"
                        ? <UserInfo changeRender={changeRender} />
                        : panelState.whatToRender === "scoreboard"
                            ? <Scoreboard />
                            : panelState.whatToRender === "activegames"
                                ? <ActiveGames />
                                : panelState.whatToRender === "finishedgames"
                                    ? <FinishedGames />
                                    : panelState.whatToRender === "reportproblem"
                                        ? <ReportProblem />
                                        : panelState.whatToRender === "changepassword"
                                            ? <ChangePassword changeRender={changeRender} />
                                            : null
                }
            </div>
        </div>
    )
}
