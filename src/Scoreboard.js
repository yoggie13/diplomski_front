import React from 'react'

export default function Scoreboard() {
    return (
        <div className="Scoreboard">
            <h1>Scoreboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Mesto</th>
                        <th>Ime i prezime</th>
                        <th>Indeks</th>
                        <th>Broj poena</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Ognjen Nikolić</td>
                        <td>20170077</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
