import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import GameServices from '../../services/GameServices.js'

export default function AllGames() {

    const [gamesState, setGamesState] = useState();
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        document.title = "Sve igre | Teorija igara"
    }, []);

    useEffect(() => {
        setLoadingState(true);
        GetGames();
    }, [])

    const GetGames = async () => {
        const res = await GameServices.GetAllGames();

        if (res.status === 200) {
            res.json()
                .then(response => {
                    setGamesState(response)
                    setLoadingState(false);
                })
        }
        else {
            setGamesState(false);
            setLoadingState(false);
        }
    }

    return (
        loadingState
            ? <Loading />
            : gamesState !== false
                ? <div className="AllGames">
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
                                gamesState.map((game) =>
                                    <tr key={game.id}>
                                        <td>{game.name}</td>
                                        <td>{game.playersPlayed}</td>
                                        <td id="center">{
                                            game.active
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
                : <p>Trenutno nema aktivnih igara</p>
    )
}
