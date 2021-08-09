import React from 'react'

export default function ReportProblem() {
    const reportHandler = e => {
        e.preventDefault();

        return;
    }
    return (
        <div className="FormClass" id="reportProblem">
            <form id="reportProblemForm" onSubmit={reportHandler}>
                <label>
                    Tip problema*
                </label>
                <select required id="problemType" >
                    <option>
                        Loše računanje bodova
                    </option>
                </select>
                <label>
                    Kratak opis problema*
                </label>
                <textarea required id="problemDescription"></textarea>
                <label>
                    Prilog skrinšota
                </label>
                <input type="file" accept="image/*" id="problemPhoto"></input>
                <input type="submit" value="Prijavi se" />
            </form>
        </div >
    )
}
