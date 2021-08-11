import React from 'react'

export default function ActiveGames({ changeRender }) {
    const handleClick = e => {
        e.preventDefault();

        changeRender("game");
    }
    return (
        <div className="ActiveGames">
            <h1>Aktivne igre</h1>
            <table>
                <thead>
                    <tr>
                        <th>Naziv igre</th>
                        <th>Broj igrača</th>
                        <th>Maks. broj poena</th>
                        <th>Datum isteka</th>
                        <th>Igraj</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dilema zatvorenika</td>
                        <td>2</td>
                        <td>2</td>
                        <td>12.8.2021</td>
                        <td><i className="fas fa-chevron-right fa-lg" onClick={handleClick}></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
