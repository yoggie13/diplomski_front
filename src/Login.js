import React, { useState } from 'react';
import App from './App';

export default function Login({ LoginLogic }) {
    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

    const loginHandler = e => {
        e.preventDefault();

        LoginLogic(loginDetails);
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
                <a>Zaboravio si/la lozinku?</a>
                <input type="submit" value="Prijavi se" />
            </form>
        </div>
    );
}
