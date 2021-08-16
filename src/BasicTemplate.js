import { useState } from 'react';
import ChangePassword from './ChangePassword';
import Header from './Header';
import Login from './Login';
import HomePage from './HomePage';
import AdminLogin from './AdminPanels/AdminLogin'


export default function BasicTemplate({ LoginLogic }) {
    const [state, setState] = useState({ whatToRender: window.location.href.includes("admin") ? "adminlogin" : "homepage" });

    const changeRender = what => {
        setState({ whatToRender: what });
    }
    const backToUser = e => {
        window.location.href = window.location.href.replace("admin", "");
    }

    return (
        <div className="BasicTemplate">
            <Header />
            {
                state.whatToRender === "homepage"
                    ? <HomePage changeRender={changeRender} />
                    : state.whatToRender === "login"
                        ? <Login LoginLogic={LoginLogic} />
                        : state.whatToRender === "adminlogin"
                            ? <AdminLogin LoginLogic={LoginLogic} backToUser={backToUser} />
                            : null
            }
        </div>
    )
}
