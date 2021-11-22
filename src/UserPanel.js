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
import {
    Switch,
    Route,
} from "react-router-dom";

export default function UserPanel({ logoutLogic, admin, User }) {
    const [sidebarState, setSidebarState] = useState({
        sidebarStatus: window.innerWidth >= 900 ? true : false
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

        if (window.innerWidth < 900 && sidebarState.sidebarStatus)
            setSidebarState({ sidebarStatus: false });

    }

    return (
        <div className="UserPanel" onClick={closeSidebar}>
            {
                sidebarState.sidebarStatus
                    ? <Sidebar logoutLogic={logoutLogic} changePanelRender admin={admin} Username={User.email} userID={User.id} />
                    : <i className="fas fa-bars fa-2x" onClick={openSidebar}></i>
            }
            <div id='mainPart'>
                <Switch>
                    <Route path="/game/:id" children={<Game userID={User.id} />} />
                    <Route path='/allGames'>
                        <AllGames />
                    </Route>
                    <Route path='/scoreboards'>
                        <AllTables />
                    </Route>
                    <Route path='/dashboard/:id' children={<GameDashboard />} />
                    <Route path='/dashboard/' children={<GameDashboard />} />
                    <Route path='/createGame'>
                        <CreateGame />
                    </Route>
                    <Route path="/activeGames">
                        <ActiveGames userID={User.id} />
                    </Route>
                    <Route path='/payments/:id' children={<Rewards />} />
                    <Route path="/finishedGames">
                        <FinishedGames userID={User.id} />
                    </Route>
                    <Route path="/scoreboard">
                        <Scoreboard userID={User.id} />
                    </Route>
                    <Route path="/report">
                        <ReportProblem userID={User.id} />
                    </Route>
                    <Route path="/changePassword" >
                        <ChangePassword userID={User.id} />
                    </Route>
                    <Route path="/profile">
                        <UserInfo admin={admin} User={User} />
                    </Route>

                </Switch>
            </div>
        </div >
    )
}
