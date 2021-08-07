import { useState } from 'react';
import ChangePassword from './ChangePassword';
import Header from './Header';
import Login from './Login';
import HomePage from './HomePage';


export default function BasicTemplate({ LoginLogic }) {
    const [state, setState] = useState({ whatToRender: "homepage" });

    const changeRender = what => {
        setState({ whatToRender: what });
    }

    return (
        <div className="BasicTemplate">
            <Header />
            {
                state.whatToRender === "homepage"
                    ? <HomePage changeRender={changeRender} />
                    : state.whatToRender === "login"
                        ? <Login LoginLogic={LoginLogic} />
                        : null
            }
        </div>
    )
}
