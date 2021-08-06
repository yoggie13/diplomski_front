import React from 'react';
import { useState } from 'react';
import './App.css';
import BasicTemplate from './BasicTemplate';
import UserPanel from './UserPanel';


function App() {
  const [loggedIn, setLoggedIn] = useState({ isLoggedIn: localStorage.getItem("email") !== null ? true : false });

  const LoginLogic = details => {
    if (details.email === "on20170077@student.fon.bg.ac.rs" && details.password === "123") {
      setLoggedIn({ isLoggedIn: true });
      localStorage.setItem("email", details.email);
    }

  }
  const LogutLogic = e => {
    localStorage.removeItem("email");
    setLoggedIn({ isLoggedIn: false });
  }
  return (
    <div className="App">
      {loggedIn.isLoggedIn === true
        ? <UserPanel LogoutLogic={LogutLogic} />
        : <BasicTemplate LoginLogic={LoginLogic} />
      }
    </div>
  );
}

export default App;
