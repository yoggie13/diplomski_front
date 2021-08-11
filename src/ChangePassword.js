import React from 'react'

export default function ChangePassword({ changeRender }) {
    return (
        <div className="FormClass" id="changePasswordDiv">
            <form id="changePasswordForm">
                <label htmlFor="oldPassword">
                    Stari password
                </label>
                <input id="oldPassword" type="password" />
                <label htmlFor="newPassword">
                    Novi password
                </label>
                <input id="newPassword" type="password" />
                <label htmlFor="confirmPassword">
                    Potvrdi novi password
                </label>
                <input id="confirmPassword" type="password" />
                <input type="submit" value="Promeni" />
            </form>
        </div>
    )
}
