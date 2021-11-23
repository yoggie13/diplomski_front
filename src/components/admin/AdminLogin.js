import React, { useState, useEffect } from 'react';
import {
    Link,
    useHistory
} from "react-router-dom";
import Loading from '../Loading';

export default function AdminLogin({ loginLogic }) {
    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
    const [errorState, setErrorState] = useState(false);
    const [loadingState, setLoadingState] = useState(false);

    let history = useHistory();

    useEffect(() => {
        document.title = "Login | Teorija igara"
    }, []);

    const loginHandler = e => {
        e.preventDefault();

        setLoadingState(true);

        fetch(
            'https://teorijaigaradiplomski.azurewebsites.net/api/admin/login',
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: loginDetails.email,
                    Password: loginDetails.password
                }
                )
            })
            .then(res => {
                if (res.status === 200) {
                    setLoadingState(false);

                    return res.json();
                }
                else {
                    setLoadingState(false);
                    setErrorState(true);
                    throw new Error();
                }

            })
            .then(response => {
                setLoadingState(false);
                setErrorState(false);
                loginLogic(response, true);
                history.push('/dashboard');
            })
            .catch(error => {
                setLoadingState(false);
                return;
            });
    }

    return (

        <div className="FormClass">
            <form id="loginForm" onSubmit={loginHandler}>
                <label htmlFor="email">
                    Email
                </label>
                <input id="email" type="text" onChange={e => setLoginDetails({ ...loginDetails, email: e.target.value })} value={loginDetails.email} />
                <label htmlFor="password">
                    Password
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
                <div id="gobacktouserlogin">
                    <Link to="/login">
                        <i className="fas fa-chevron-right fa-sm" id="chevron-left"></i>
                    </Link>
                    <p>Loguj se kao korisnik</p>
                </div>
            </form>
        </div>
    );
}