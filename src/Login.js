import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { useHistory } from 'react-router';

export default function Login({ LoginLogic, falseEntry }) {
    const [loginDetails, setLoginDetails] = useState({ email: "", password: "", status: 500 });
    const [state, setState] = useState({ error: falseEntry });
    const [loadingState, setLoadingState] = useState(false);

    let history = useHistory();

    const loginHandler = e => {
        e.preventDefault();

        setLoadingState(true);
        fetch(
            'https://diplomskiapi20210828140836.azurewebsites.net/api/students/login',
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
                    setState({ error: true });
                    setLoadingState(false);
                    throw new Error();
                }

            })
            .then(response => {
                setState({ error: false });
                setLoadingState(false);
                LoginLogic(response);
                history.push('/profile');
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
            </form>
        </div>
    );
}
