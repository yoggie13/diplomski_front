import React from 'react';
import { useState, useEffect } from 'react';


function checkDate(dueDate) {
    return Date.parse(dueDate) > Date.now();
}

export default function AllGames() {

    const [state, setstate] = useState({ games: [] });

    useEffect(() => {
        fetch(
            'http://localhost:46824/api/admin/games',
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
        <div className="AllGames">
            <h1>Pregled igara</h1>
            <table>
                <thead>
                    <tr>
                        <th>Naziv igre</th>
                        <th>Broj igrača koji su odigrali</th>
                        <th>Aktivna</th>
                        <th>Više info</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.games.map((game) =>
                            <tr key={game.id}>
                                <td>{game.name}</td>
                                <td>{game.playersPlayed}</td>
                                <td id="center">{
                                    checkDate(game.dueDate) === true
                                        ? <i className="fas fa-check-circle" id="icon-true"></i>
                                        : <i className="fas fa-times-circle" id="icon-false"></i>
                                }
                                </td>
                                <td id="center"><i id={game.id} className="fas fa-chevron-right"></i></td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}
