import {
    Switch,
    Route,
} from "react-router-dom";
import Header from './Header';
import Login from './Login';
import HomePage from '../pages/Homepage';

export default function BasicTemplate({ loginLogic }) {


    return (
        <div className="BasicTemplate">
            <Header />
            <Switch>
                <Route path="/login">
                    <Login loginLogic={loginLogic} isAdmin={false} />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </div>
    )
}
