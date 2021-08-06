import { useState } from 'react';
import './App.css';
import BasicTemplate from './BasicTemplate';
import UserPanel from './UserPanel';


function App() {
  const [loggedIn, setLoggedIn] = useState({ loggedIn: false });

  const LoginLogic = details => {

    if (details.email === "on20170077@student.fon.bg.ac.rs" && details.password === "123") {
      setLoggedIn(true);
    }
  }
  return (
    <div className="App">
      {loggedIn === true
        ? <UserPanel />
        : <BasicTemplate LoginLogic={LoginLogic} />
      }
    </div>
  );
}

export default App;
