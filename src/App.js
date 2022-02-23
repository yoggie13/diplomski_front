import React from 'react';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import './App.css';
import BasicTemplate from './components/BasicTemplate';
import Panel from './pages/Panel';
import Loading from './components/Loading';
import UserServices from './services/UserServices';

function App() {
  const [state, setState] = useState({
    isAdmin: false,
    User: null
  });
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(true)
    checkCookie();
  }, [])

  const checkCookie = async () => {
    var res = await UserServices.CheckCookie();

    if (res.status === 200) {
      res.json()
        .then(user => {
          setState({ ...state, User: user, isAdmin: user.role === "Admin" ? true : false })
          setLoadingState(false);
        })
    }
    else {
      setLoadingState(false)
    }
  }
  const loginLogic = async () => {
    await checkCookie();
  }
  const logoutLogic = async (e) => {

    var res = await UserServices.Logout();

    if (res.status === 200) {
      setState({ isAdmin: false, User: null });
    }
  }
  return (
    <div className="App">
      {
        loadingState ?
          <Loading />
          :
          <Router>
            {
              state.User !== null
                ? <Panel logoutLogic={logoutLogic} isAdmin={state.isAdmin} user={state.User} />
                : <BasicTemplate loginLogic={loginLogic} />
            }
          </Router>
      }
    </div>
  );
}

export default App;
