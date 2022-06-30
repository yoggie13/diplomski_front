import {
    Switch,
    Route,
} from "react-router-dom";
import Scoreboard from '../Scoreboard.js';
import ReportProblem from './ReportProblem.js';
import FinishedGames from './FinishedGames.js';
import ChangePassword from '../ChangePassword.js';
import UserInfo from '../UserInfo.js';
import Games from './Games.js';
import Error from '../Error.js';
import GameHolder from './GameHolder.js';
import '../../assets/styles/Panel.css'

export default function UserPanel({ user }) {

    return (
        <>
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
                <Route path="/games">
                    <Games userID={user.id} />
                </Route>
                <Route path="/game/:id" children={<GameHolder userID={user.id} />} />
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