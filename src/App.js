import React from 'react';
import { useState } from 'react';
import './App.css';
import BasicTemplate from './BasicTemplate';
import UserPanel from './UserPanel';


function App() {
  const [state, setState] = useState({ isLoggedIn: localStorage.getItem("email") !== null ? true : false, admin: false, User: null });

  const LoginLogic = details => {
    // if (details.admin === false) {
    setState({ isLoggedIn: true, admin: false, User: details });
    localStorage.setItem("email", details.Email);
    // }
    // else if (details.admin === true) {
    //   setState({ isLoggedIn: true, admin: true, user: details });
    //   localStorage.setItem("email", details.email);
    // }
    // else {
    //   return;
    // }

  }
  const LogutLogic = e => {
    localStorage.removeItem("email");
    setState({ isLoggedIn: false, admin: false, User: null });
  }
  return (
    <div className="App">
      {
        state.isLoggedIn === true
          ? <UserPanel LogoutLogic={LogutLogic} admin={state.admin} User={state.User} />
          : <BasicTemplate LoginLogic={LoginLogic} falseEntry={state.falseEntry} />
      }
    </div>
  );
}

export default App;
