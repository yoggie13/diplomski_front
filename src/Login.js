import React from 'react';

export default function Login() {
    return (
        <div className="FormClass">
            <form id="loginForm">
                <label for="email">
                    Email
                </label>
                <input id="email" type="text" />
                <label for="password">
                    Password
                </label>
                <input id="password" type="password" />
                <a>Zaboravio si/la lozinku?</a>
                <input type="submit" value="Prijavi se" />
            </form>
        </div>
    );
}
