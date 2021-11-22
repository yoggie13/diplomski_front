import {
    Switch,
    Route,
} from "react-router-dom";
import Header from './Header';
import Login from './Login';
import HomePage from './HomePage';
import AdminLogin from './AdminPanels/AdminLogin';


export default function BasicTemplate({ loginLogic }) {


    return (
        <div className="BasicTemplate">
            <Header />
            <Switch>
                <Route path="/login">
                    <Login loginLogic={loginLogic} />
                </Route>
                <Route path="/admin">
                    <AdminLogin loginLogic={loginLogic} />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </div>
    )
}
