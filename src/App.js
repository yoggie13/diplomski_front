import React from 'react';
import { useState } from 'react';
import './App.css';
import BasicTemplate from './BasicTemplate';
import UserPanel from './UserPanel';


function App() {
  const [state, setState] = useState({ isLoggedIn: localStorage.getItem("User") !== null ? true : false, admin: localStorage.getItem("Admin") === null ? false : JSON.parse(localStorage.getItem("Admin")), User: JSON.parse(localStorage.getItem("User")) });

  const LoginLogic = (details, adminStatus = false) => {
    localStorage.setItem("User", JSON.stringify(details));
    localStorage.setItem("Admin", adminStatus);
    setState({ isLoggedIn: true, admin: adminStatus, User: JSON.parse(localStorage.getItem("User")) });
  }
  const LogutLogic = e => {
    localStorage.removeItem("User");
    setState({ isLoggedIn: false, admin: false, User: null });
  }
  return (
    <div className="App">
      {
        state.isLoggedIn === true
          ? <UserPanel LogoutLogic={LogutLogic} admin={state.admin} User={state.User} />
          : <BasicTemplate LoginLogic={LoginLogic} User={state.User} />
      }
    </div>
  );
}

export default App;
