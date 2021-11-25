import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import AllGames from './AllGames.js';
import AllTables from './AllTables.js';
import Confirmation from './Confirmation.js';
import CreateGame from './CreateGame.js';
import GameDashboard from './GameDashboard.js';
import Payments from './Payments.js';
import UserInfo from '../UserInfo.js';
import Error from '../Error.js';

export default function AdminPanel({ isAdmin, user }) {
    return (
        <Switch>
            <Route path='/allGames'>
                <AllGames />
            </Route>
            <Route path='/scoreboards'>
                <AllTables />
            </Route><Route path='/dashboard/:id' children={<GameDashboard />} />
            <Route path='/dashboard/' children={<GameDashboard />} />
            <Route path='/createGame'>
                <CreateGame />
            </Route>
            <Route path='/payments/:id' children={<Payments />} />
            <Route path="/profile">
                <UserInfo isAdmin={isAdmin} user={user} />
            </Route>
            <Route path="*">
                <Error />
            </Route>
        </Switch>
    )
}