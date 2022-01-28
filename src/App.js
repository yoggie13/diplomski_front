import React from 'react';
import { useState } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import './App.css';
import BasicTemplate from './components/BasicTemplate';
import Panel from './pages/Panel';


function App() {
  const [state, setState] = useState({
    isLoggedIn: localStorage.getItem("User") !== null ? true : false,
    isAdmin: localStorage.getItem("Admin") === null ? false : JSON.parse(localStorage.getItem("Admin")),
    User: JSON.parse(localStorage.getItem("User"))
  });

  const loginLogic = (details, adminStatus = false) => {
    localStorage.setItem("User", JSON.stringify(details));
    localStorage.setItem("Admin", adminStatus);
    console.log(adminStatus)
    setState({ isLoggedIn: true, isAdmin: adminStatus, User: JSON.parse(localStorage.getItem("User")) });
  }
  const logoutLogic = e => {
    localStorage.removeItem("User");
    setState({ isLoggedIn: false, isAdmin: false, User: null });

  }
  return (
    <div className="App">
      <Router>
        {
          state.isLoggedIn
            ? <Panel logoutLogic={logoutLogic} isAdmin={state.isAdmin} user={state.User} />
            : <BasicTemplate loginLogic={loginLogic} />
        }
      </Router>
    </div>
  );
}

export default App;
