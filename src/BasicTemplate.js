import { useState } from 'react';
import ChangePassword from './ChangePassword';
import Header from './Header';
import Login from './Login';
import HomePage from './HomePage';
import AdminLogin from './AdminPanels/AdminLogin';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default function BasicTemplate({ LoginLogic }) {


    return (
        <div className="BasicTemplate">
            <Header />
            <Switch>
                <Route path="/login">
                    <Login LoginLogic={LoginLogic} />
                </Route>
                <Route path="/admin">
                    <AdminLogin LoginLogic={LoginLogic} />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </div>
    )
}
