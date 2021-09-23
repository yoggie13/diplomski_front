import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Loading from '../Loading';


function checkDate(dueDate) {
    return Date.parse(dueDate) > Date.now();
}

export default function AllGames() {

    const [state, setstate] = useState({ games: [] });
    const [loadingState, setLoadingState] = useState(true);

    let history = useHistory();

    useEffect(() => {
        document.title = "Sve igre | Teorija igara"
    }, []);

    useEffect(() => {
        setLoadingState(true)

        fetch(
            'https://teorijaigaradiplomski.azurewebsites.net/api/admin/games',
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


    return (
        JSON.parse(localStorage.getItem("Admin")) === false
            ? <p>Prijavite se sa administratorskim nalogom da biste pristupili ovim opcijama</p>
            : loadingState === true
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
                                        <td id="center">
                                            <Link to={`dashboard/${game.id}`}>
                                                <i id={game.id} className="fas fa-chevron-right"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
    )
}
