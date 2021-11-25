import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import Scoreboard from '../Scoreboard.js';
import ReportProblem from './ReportProblem.js';
import FinishedGames from './FinishedGames.js';
import ChangePassword from '../ChangePassword.js';
import UserInfo from '../UserInfo.js';
import ActiveGames from './ActiveGames.js';
import Game from './Game.js';
import Error from '../Error.js';

export default function UserPanel({ user }) {
    return (
        <Switch>
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
    )
}