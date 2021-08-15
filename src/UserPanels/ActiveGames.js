import React from 'react'
import { useState, useEffect } from 'react';

function formatDate(dueDate) {
    var arr = dueDate.split('-');
    var day = arr[2].split('T')[0];

    return day + "." + arr[1] + "." + arr[0];
}

export default function ActiveGames({ changeRender }) {

    const [state, setstate] = useState({ games: [] });
    const handleClick = e => {
        e.preventDefault();

        changeRender("game", e.target.id);
    }


    useEffect(() => {
        fetch(
            'http://localhost:46824/api/game/activegames',
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
                    games: response
                })
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="ActiveGames">
            <h1>Aktivne igre</h1>
            <table>
                <thead>
                    <tr>
                        <th>Naziv igre</th>
                        <th>Broj igrača</th>
                        {/* <th>Maks. broj poena</th> */}
                        <th>Datum isteka</th>
                        <th>Igraj</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.games.map((game, index) =>
                            <tr key={index}>
                                <td>{game.name}</td>
                                <td>{game.numberOfPlayers}</td>
                                {/* <td>2</td> */}
                                <td>{formatDate(game.dueDate)}</td>
                                <td id="center"><i id={game.id} className="fas fa-chevron-right fa-lg" onClick={handleClick}></i></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
