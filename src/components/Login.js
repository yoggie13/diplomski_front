import React, { useState, useEffect } from 'react';
import {
    useHistory
} from "react-router-dom";
import Loading from './Loading';
import UserServices from '../services/UserServices.js';

export default function Login({ loginLogic }) {
    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
    const [errorState, setErrorState] = useState(false);
    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        document.title = "Login | Teorija igara"
    }, []);

    const loginHandler = async (e) => {
        e.preventDefault()

        setLoadingState(true);

        const res = await UserServices.Login(loginDetails.email, loginDetails.password);

        if (res.status === 200) {
            setLoadingState(false);
            setErrorState(false);
            await loginLogic();
        }
        else if (res.status === 400) {
            alert("Pogrešan unos");
        }
        else if (res.status === 404) {
            alert("Taj korisnik ne postoji");
        }
        setLoadingState(false)
    }

    return (
        <div className="FormClass">
            <form id="loginForm" onSubmit={loginHandler}>
                <label htmlFor="email">
                    Email
                </label>
                <input id="email" type="text" onChange={e => setLoginDetails({ ...loginDetails, email: e.target.value })} value={loginDetails.email} />
                <label htmlFor="password">
                    Šifra
                </label>
                <input id="password" type="password" onChange={e => setLoginDetails({ ...loginDetails, password: e.target.value })} value={loginDetails.password} />
                {
                    errorState
                        ? <p id="error">Uneli ste pogrešne podatke</p>
                        : null
                }
                {/* <a>Zaboravio si/la lozinku?</a> */}
                {
                    loadingState
                        ? <Loading smallerSize={true} />
                        : <input type="submit" value="Prijavi se" />
                }
            </form>
        </div>
    );
}
