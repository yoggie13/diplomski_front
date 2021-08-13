import React from 'react';
import { useState } from 'react';
import './App.css';
import BasicTemplate from './BasicTemplate';
import UserPanel from './UserPanel';


function App() {
  const [state, setState] = useState({ isLoggedIn: localStorage.getItem("email") !== null ? true : false, admin: false });

  const LoginLogic = details => {
    if (details.email === "on20170077@student.fon.bg.ac.rs" && details.password === "123") {
      setState({ isLoggedIn: true, admin: false });
      localStorage.setItem("email", details.email);
    }

  }
  const LogutLogic = e => {
    localStorage.removeItem("email");
    setState({ isLoggedIn: false, admin: false });
  }
  return (
    <div className="App">
      {
        state.isLoggedIn === true
          ? <UserPanel LogoutLogic={LogutLogic} admin={state.admin} />
          : <BasicTemplate LoginLogic={LoginLogic} />
      }
    </div>
  );
}

export default App;
