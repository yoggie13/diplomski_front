import React from 'react'

export default function ReportProblem() {

    const reportHandler = e => {
        e.preventDefault();

        //konekt na api pa sa apija da se salje
        return;
    }

    return (
        <div className="FormClass" id="reportProblem">
            <form id="reportProblemForm" onSubmit={reportHandler}>
                <label htmlFor="problemType">
                    Tip problema*
                </label>
                <select required id="problemType" >
                    <option>
                        Loše računanje bodova
                    </option>
                </select>
                <label htmlFor="problemDescription">
                    Kratak opis problema*
                </label>
                <textarea required id="problemDescription"></textarea>
                <label htmlFor="problemPhoto">
                    Prilog skrinšota
                </label>
                <input type="file" accept="image/*" id="problemPhoto"></input>
                <input type="submit" value="Prijavi se" />
            </form>
        </div >
    )
}
