import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import Scoreboard from '../Scoreboard.js';
import ReportProblem from './ReportProblem.js';
import FinishedGames from './FinishedGames.js';
import ChangePassword from '../ChangePassword.js';
import UserInfo from '../UserInfo.js';
import ActiveGames from './ActiveGames.js';
import Game from './Game.js';
import Error from '../Error.js';
import Notifications from './Notifications.js';
import NotificationBell from './NotificationBell.js';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Notification from './Notifications.js';

export default function UserPanel({ user }) {

    let loc = useLocation();

    return (
        <>
            {
                !loc.pathname.includes('notifications')
                    ? <NotificationBell user={user} />
                    : null
            }
            <Switch>
                <Route path="/notifications">
                    <Notifications user={user} />
                </Route>
                <Route path="/finishedGames">
                    <FinishedGames userID={user.id} />
                </Route>
                <Route path="/scoreboard">
                    <Scoreboard userID={user.id} />
                </Route>
                <Route path="/report">
                    <ReportProblem userID={user.id} />
                </Route>
                <Route path="/changePassword" >
                    <ChangePassword userID={user.id} />
                </Route>
                <Route path="/profile">
                    <UserInfo user={user} />
                </Route>
                <Route path="/activeGames">
                    <ActiveGames userID={user.id} />
                </Route>
                <Route path="/game/:id" children={<Game userID={user.id} />} />
                <Route path="/profile">
                    <UserInfo user={user} />
                </Route>
                <Route path="*">
                    <Error />
                </Route>
            </Switch>
        </>
    )
}