import React from 'react';
import { useState } from 'react';
import './App.css';
import BasicTemplate from './BasicTemplate';
import UserPanel from './UserPanel';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  const [state, setState] = useState({ isLoggedIn: localStorage.getItem("User") !== null ? true : false, admin: localStorage.getItem("Admin") === null ? false : JSON.parse(localStorage.getItem("Admin")), User: JSON.parse(localStorage.getItem("User")) });

  const LoginLogic = (details, adminStatus = false) => {
    localStorage.setItem("User", JSON.stringify(details));
    localStorage.setItem("Admin", adminStatus);
    setState({ isLoggedIn: true, admin: adminStatus, User: JSON.parse(localStorage.getItem("User")) });
  }
  const LogoutLogic = e => {

    localStorage.removeItem("User");
    setState({ isLoggedIn: false, admin: false, User: null });

  }
  return (
    <div className="App">
      <Router>
        {
          state.isLoggedIn === true
            ? <UserPanel LogoutLogic={LogoutLogic} admin={state.admin} User={state.User} />
            : <BasicTemplate LoginLogic={LoginLogic} />
        }
      </Router>
    </div>
  );
}

export default App;
