import React from 'react'
import { useState, useEffect } from 'react';
import Loading from '../Loading';

export default function FinishedGames({ changeRender, userID }) {

    const [state, setstate] = useState({ games: [] });
    const [loadingState, setLoadingState] = useState(true);


    const handleClick = e => {
        e.preventDefault();

        changeRender("game", e.target.id);
    }

    useEffect(() => {
        setLoadingState(true);
        fetch(
            `https://diplomskiapi20210828140836.azurewebsites.net/api/game/finishedgames/${userID}`,
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
                setLoadingState(false)
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            })


    }, [])

    return (
        loadingState === true
            ? <Loading />
            :
            <div className="FinishedGames">
                <h1>Završene igre</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Naziv igre</th>
                            <th>Broj igrača</th>
                            <th>Osvojenih poena</th>
                            <th>Odigrao/la</th>
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
                                    <td id="center">{
                                        game.Played === true
                                            ? <i className="fas fa-check-circle" id="icon-true"></i>
                                            : <i className="fas fa-times-circle" id="icon-false"></i>
                                    }</td>
                                    <td id="center"><i id={game.ID} className="fas fa-chevron-right fa-lg" onClick={handleClick}></i></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
    )
}
