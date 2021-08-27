import React from 'react';
import { useState, useEffect } from 'react';
import Loading from '../Loading';


function checkDate(dueDate) {
    return Date.parse(dueDate) > Date.now();
}

export default function AllGames({ changeRender }) {

    const [state, setstate] = useState({ games: [] });
    const [loadingState, setLoadingState] = useState(true);


    useEffect(() => {
        setLoadingState(true)

        fetch(
            'https://diplomskiapi20210828005205.azurewebsites.net/api/admin/games',
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
                setLoadingState(false)
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            })

    }, [])

    const handleClick = e => {
        e.preventDefault();

        changeRender("gamedashboard", e.target.id);
    }
    return (
        loadingState === true
            ? <Loading />
            : <div className="AllGames">
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
                                    <td id="center"><i id={game.id} onClick={handleClick} className="fas fa-chevron-right"></i></td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
    )
}
