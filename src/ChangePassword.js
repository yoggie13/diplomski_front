import React from 'react'
import { useState } from 'react';
import Loading from './Loading';

export default function ChangePassword({ changeRender, userID }) {
    const [state, setState] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    const [errorState, setErrorState] = useState({ exists: false, text: "" })
    const [loadingState, setLoadingState] = useState(false);


    const handleSubmit = e => {
        e.preventDefault();
        console.log(1);
        if (state.newPassword != state.confirmPassword) {
            setErrorState({ exists: true, text: "Novi passwordi se ne podudaraju" });
            console.log(2);

            return;
        }
        setErrorState({ exists: false, text: "" });



        setLoadingState(true)

        fetch(
            `http://localhost:46824/api/students/changePass`,
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
                    return;
                }
                else if (res.status === 415) {
                    setLoadingState(false);
                    setErrorState({ exists: true, text: "Pogrešan stari password" });
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
            {
                loadingState === false
                    ? <form id="changePasswordForm">
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
                            errorState.exists === true
                                ? <small id="error">{errorState.text}</small>
                                : null
                        }
                        <input type="submit" value="Promeni" onClick={handleSubmit} />
                    </form>
                    : <Loading />
            }
        </div>
    )
}
