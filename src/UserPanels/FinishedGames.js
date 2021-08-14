import React from 'react'

export default function FinishedGames() {
    return (
        <div className="FinishedGames">
            <h1>Završene igre</h1>
            <table>
                <thead>
                    <tr>
                        <th>Naziv igre</th>
                        <th>Broj igrača</th>
                        <th>Osvojenih poena</th>
                        <th>Link do igre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dilema zatvorenika</td>
                        <td>2</td>
                        <td>2</td>
                        <td id="center"><i className="fas fa-chevron-right fa-lg"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
