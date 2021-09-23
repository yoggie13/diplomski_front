import React from 'react'
import { useState, useEffect } from 'react';
import Loading from '../Loading';
import { Link } from 'react-router-dom';

function formatDate(dueDate) {
    var arr = dueDate.split('-');
    var day = arr[2].split('T')[0];

    return day + "." + arr[1] + "." + arr[0];
}

export default function ActiveGames({ userID }) {

    const [state, setstate] = useState({ games: [] });
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        document.title = "Aktivne igre | Teorija igara"
    }, []);

    useEffect(() => {

        setLoadingState(true);
        fetch(
            `https://teorijaigaradiplomski.azurewebsites.net/api/game/activegames/${userID}`,
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
                    games: response.games
                })
                setLoadingState(false)
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            })

    }, [])

    return (
        JSON.parse(localStorage.getItem("Admin")) === true
            ? <p>Prijavite se sa studentskim nalogom da biste pristupili ovim opcijama</p>
            : loadingState === true
                ? <Loading />
                :
                <div className="ActiveGames">
                    <h1>Aktivne igre</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Naziv igre</th>
                                <th>Broj igrača</th>
                                <th>Maks. broj poena</th>
                                <th>Odigrao/la</th>
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
                                        <td>{game.maxPayoff}</td>
                                        <td id="center">{
                                            game.played === true
                                                ? <i className="fas fa-check-circle" id="icon-true"></i>
                                                : <i className="fas fa-times-circle" id="icon-false"></i>
                                        }</td>
                                        <td>{formatDate(game.dueDate)}</td>
                                        <td id="center">
                                            <Link to={`/game/${game.id}`}>
                                                <i id={game.id} className="fas fa-chevron-right fa-lg"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
    )
}
