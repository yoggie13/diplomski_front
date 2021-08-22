import React, { useState } from 'react';
import Loading from '../Loading';


export default function AdminLogin({ LoginLogic, backToUser }) {
    const [loginDetails, setLoginDetails] = useState({ email: "", password: "", status: 500 });
    const [state, setState] = useState({ error: false, loading: true });
    const [loadingState, setLoadingState] = useState(false);


    const loginHandler = e => {
        e.preventDefault();

        setLoadingState(true);

        fetch(
            'http://localhost:46824/api/admin/login',
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
                    setState({ error: true });
                    throw new Error();
                }

            })
            .then(response => {
                setLoadingState(false);
                setState({ error: false });
                LoginLogic(response, true);
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
                    state.error === true
                        ? <p id="error">Uneli ste pogrešne podatke</p>
                        : null
                }
                <a>Zaboravio si/la lozinku?</a>
                {
                    loadingState === true
                        ? <Loading smallerSize={true} />
                        : <input type="submit" value="Prijavi se" />
                }
                <div id="gobacktouserlogin" onClick={backToUser}>
                    <i className="fas fa-chevron-right fa-sm" id="chevron-left"></i>
                    <p>Loguj se kao korisnik</p>
                </div>
            </form>
        </div>
    );
}