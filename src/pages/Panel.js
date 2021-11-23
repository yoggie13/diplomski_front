import React from 'react';
import { useState } from 'react';
import ActiveGames from '../components/user/ActiveGames';
import ChangePassword from '../components/ChangePassword';
import FinishedGames from '../components/user/FinishedGames';
import Game from '../components/user/Game';
import ReportProblem from '../components/user/ReportProblem';
import Scoreboard from '../components/Scoreboard';
import Sidebar from '../components/Sidebar';
import UserInfo from '../components/UserInfo';
import CreateGame from '../components/admin/CreateGame';
import AllGames from '../components/admin/AllGames';
import AllTables from '../components/admin/AllTables';
import GameDashboard from '../components/admin/GameDashboard';
import Rewards from '../components/admin/Rewards';
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
