import React, { useState } from 'react';

export default function AdminLogin({ LoginLogic }) {
    const [loginDetails, setLoginDetails] = useState({ email: "", password: "", status: 500 });
    const [state, setState] = useState({ error: false });

    const loginHandler = e => {
        e.preventDefault();


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
                    return res.json();
                }
                else {
                    setState({ error: true });
                    throw new Error();
                }

            })
            .then(response => {
                setState({ error: false });
                LoginLogic(response, true);
            })
            .catch(error => {
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
                <input type="submit" value="Prijavi se" />
            </form>
        </div>
    );
}
