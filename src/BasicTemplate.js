import { useState } from 'react';
import ChangePassword from './ChangePassword';
import Header from './Header';
import Login from './Login';
import HomePage from './HomePage';


export default function BasicTemplate({ LoginLogic }) {
    const [renderer, setRenderer] = useState({ whatToRender: "homepage" });

    const changeRender = what => {
        setRenderer({ whatToRender: what });
    }

    return (
        <div className="BasicTemplate">
            <Header />
            {
                renderer.whatToRender === "homepage"
                    ? <HomePage changeRender={changeRender} />
                    : renderer.whatToRender === "login"
                        ? <Login LoginLogic={LoginLogic} />
                        : renderer.whatToRender === "changePassword"
                            ? <ChangePassword />
                            : null
            }
        </div>
    )
}
