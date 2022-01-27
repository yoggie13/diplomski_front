import React from 'react'
import { useState, useEffect } from 'react';
import Config from '../config.json';
import Loading from './Loading';

export default function ChangePassword({ userID }) {
    const [state, setState] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    const [errorState, setErrorState] = useState({ exists: false, text: "" })
    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        document.title = "Promena šifre | Teorija igara"
    }, []);
    const handleSubmit = e => {
        e.preventDefault();
        if (state.newPassword !== state.confirmPassword) {
            setErrorState({ exists: true, text: "Novi passwordi se ne podudaraju" });
            return;
        }
        else if (state.oldPassword === state.newPassword) {
            setErrorState({ exists: true, text: "Uneli ste isti password i za stari i za novi" });
            return;
        }

        setErrorState({ exists: false, text: "" });

        setLoadingState(true)

        var db = localStorage.getItem("Admin") ? "admin" : "students";

        fetch(
            `http://${Config.BASE_URL}:46824/api/user/changePass`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ID: userID,
                    Password: state.oldPassword,
                    Email: state.newPassword
                })
            })
            .then(res => {
                if (res.status === 200) {
                    setLoadingState(false);
                    alert("Izmenjeno");
                    setState({ oldPassword: "", newPassword: "", confirmPassword: "" })
                    return;
                }
                else if (res.status === 415) {
                    setLoadingState(false);
                    setErrorState({ exists: true, text: "Pogrešan stari password" });
                    return;
                }
                else if (res.status === 400) {
                    setLoadingState(false);
                    setErrorState({ exists: true, text: "Novi password ne može biti stari password" });
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            })
    }

    return (
        <div className="FormClass" id="changePasswordDiv">
            <form id="changePasswordForm">
                <label htmlFor="oldPassword">
                    Stari password
                </label>
                <input id="oldPassword" type="password" value={state.oldPassword} onChange={e => setState({ ...state, oldPassword: e.target.value })} />
                <label htmlFor="newPassword">
                    Novi password
                </label>
                <input id="newPassword" type="password" value={state.newPassword} onChange={e => setState({ ...state, newPassword: e.target.value })} />
                <label htmlFor="confirmPassword">
                    Potvrdi novi password
                </label>
                <input id="confirmPassword" type="password" value={state.confirmPassword} onChange={e => setState({ ...state, confirmPassword: e.target.value })} />
                {
                    errorState.exists
                        ? <small id="error">{errorState.text}</small>
                        : null
                }
                {
                    loadingState
                        ? <Loading smallerSize={true} />
                        : <input type="submit" value="Promeni" onClick={handleSubmit} />
                }
            </form>

        </div>
    )
}
