import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import GameServices from '../../services/GameServices';
import { useHistory } from 'react-router-dom';

function formatDate(dueDate) {
    var d = new Date(dueDate);
    return d.toLocaleDateString('sr');
}

export default function Games({ userID }) {

    const [state, setstate] = useState({ games: [] });
    const [loadingState, setLoadingState] = useState(true);
    const [filterArr, setFilterArr] = useState(["aktivne", "završene"])
    const [checkedFilter, setCheckedFilter] = useState(0)
    let history = useHistory()

    useEffect(() => {
        document.title = "Igre | Teorija igara"
    }, []);

    useEffect(() => {
        setLoadingState(true);

        if (checkedFilter === 0)
            GetActiveGames();
        else if (checkedFilter === 1)
            GetFinishedGames();
    }, [checkedFilter]);

    const GetActiveGames = async () => {
        var res = await GameServices.GetActiveGames(userID);

        if (res.status === 200) {
            res.json()
                .then(response => {
                    setstate({
                        games: response.games
                    })
                    setLoadingState(false)
                })
        }
        else {
            console.log('error');
            setLoadingState(false);
        }
    }
    const GetFinishedGames = async () => {
        var res = await GameServices.GetFinishedGames(userID);

        if (res.status === 200) {
            res.json()
                .then(response => {
                    setstate({
                        games: response.games
                    })
                    setLoadingState(false)
                })
        }
        else {
            console.log('error');
            setLoadingState(false);
        }
    }
    const openGame = (e, id) => {
        e.preventDefault();

        console.log(id)

        history.push(`/game/${id}`);
    }

    return (

        <div className="Games">
            <h1>Igre</h1>
            <ul className='Filter'>
                {
                    filterArr.map((filter, index) =>
                        <li key={index}
                            id={checkedFilter === index ? "checked" : "unchecked"}
                            onClick={(e) => {
                                e.preventDefault()
                                setCheckedFilter(index)
                            }}>
                            {filter}
                        </li>
                    )
                }
            </ul>
            {
                loadingState
                    ? <Loading />
                    : <>
                        {
                            state.games.length > 0
                                ? <div className='GamesArray'>
                                    {
                                        checkedFilter === 0
                                            ? state.games.map((game, index) =>
                                                <div className="GameInfo" key={index} onClick={e => openGame(e, game.id)}>
                                                    <h3>{game.name}</h3>
                                                    <p>Broj igrača: {game.numberOfPlayers}</p>
                                                    <p>Maks. isplata: {game.maxPayoff}</p>
                                                    <p>Odigrana: {
                                                        game.played
                                                            ? <i className="fas fa-check-circle" id="icon-true"></i>
                                                            : <i className="fas fa-times-circle" id="icon-false"></i>
                                                    }</p>
                                                    <p>Datum isteka: {formatDate(game.dueDate)}</p>
                                                </div>
                                            )
                                            : state.games.map((game, index) =>
                                                <div className="GameInfo" key={index} onClick={e => openGame(e, game.id)}>
                                                    <h3>{game.name}</h3>
                                                    <p>Odigrana: {
                                                        game.played
                                                            ? <i className="fas fa-check-circle" id="icon-true"></i>
                                                            : <i className="fas fa-times-circle" id="icon-false"></i>
                                                    }</p>
                                                    <p>Osvojenih poena: {game.pointsGotten}</p>
                                                    {/* <p>Datum isteka: {formatDate(game.dueDate)}</p> */}
                                                </div>
                                            )
                                    }
                                </div>
                                : <p>Trenutno nema aktivnih igara</p>
                        }</>
            }
        </div >
    )
}
