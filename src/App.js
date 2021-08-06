import { useState } from 'react';
import './App.css';
import BasicTemplate from './BasicTemplate';
import UserPanel from './UserPanel';


function App() {
  const [loggedIn, setLoggedIn] = useState({ loggedIn: localStorage.getItem("email") !== null ? true : false });

  const LoginLogic = details => {
    if (details.email === "on20170077@student.fon.bg.ac.rs" && details.password === "123") {
      setLoggedIn(true);
      localStorage.setItem("email", details.email);
    }

  }
  const LogutLogic = e => {
    localStorage.removeItem("email");
    setLoggedIn(false);
  }
  return (
    <div className="App">
      {loggedIn === true || loggedIn.loggedIn === true
        ? <UserPanel LogoutLogic={LogutLogic} />
        : <BasicTemplate LoginLogic={LoginLogic} />
      }
      {console.log(loggedIn)}
    </div>
  );
}

export default App;
