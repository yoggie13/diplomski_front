import React from 'react'

export default function ChangePassword({ changeRender }) {
    return (
        <div className="FormClass" id="changePasswordDiv">
            <form id="changePasswordForm">
                <label>
                    Stari password
                </label>
                <input id="oldPassword" type="password" />
                <label>
                    Novi password
                </label>
                <input id="newPassword" type="password" />
                <label>
                    Potvrdi novi password
                </label>
                <input id="confirmPassword" type="password" />
                <input type="submit" value="Promeni" />
            </form>
        </div>
    )
}
