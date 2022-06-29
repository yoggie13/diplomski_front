import React from 'react';
import { useState, useEffect } from 'react';
import Loading from '../Loading';
import GameServices from '../../services/GameServices.js'
import { useHistory } from 'react-router-dom';

export default function AllGames() {

    const [gamesState, setGamesState] = useState();
    const [loadingState, setLoadingState] = useState(true);
    let history = useHistory()

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
                    <div className='GamesArray'>
                        {
                            gamesState.map((game) =>
                                <div key={game.id} className='GameInfo'
                                    onClick={e => {
                                        e.preventDefault()
                                        history.push(`/dashboard/${game.id}`)
                                    }}>
                                    <h3>{game.name}</h3>
                                    <p>Оdigralo: {game.playersPlayed}</p>
                                    <p>Aktivna: {
                                        game.active
                                            ? <i className="fas fa-check-circle" id="icon-true"></i>
                                            : <i className="fas fa-times-circle" id="icon-false"></i>
                                    }
                                    </p>
                                </div>
                            )}
                    </div>
                </div>
                : <p>Trenutno nema aktivnih igara</p>
    )
}
