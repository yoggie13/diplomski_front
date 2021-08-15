import React from 'react'
import { useState, useEffect } from 'react';

export default function FinishedGames() {

    const [state, setstate] = useState({ games: [] });

    useEffect(() => {
        fetch(
            'http://localhost:46824/api/game/finishedgames/20170077',
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(response => {
                setstate({
                    games: response.Games
                })
            })
            .catch(error => console.log(error))
    }, [])

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
                    {
                        state.games.map((game) =>
                            <tr key={game.ID}>
                                <td>{game.Name}</td>
                                <td>{game.NumberOfPlayers}</td>
                                <td>{game.PointsGotten}</td>
                                <td id="center"><i className="fas fa-chevron-right fa-lg"></i></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
