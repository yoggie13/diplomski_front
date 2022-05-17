import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../Loading';
import GameServices from '../../services/GameServices.js'
import SuccessAnimation from '../SuccessAnimation';

function formatDate(dueDate) {
    var d = new Date(dueDate);
    return d.toLocaleDateString('sr') + " " + d.toLocaleTimeString('sr')
}
export default function Confirmation() {

    let loc = useLocation()
    var game = loc.state.game;
    var strategies = loc.state.strategies;
    var range = loc.state.range;
    var gameModels = loc.state.gameModels;

    const [loadingState, setLoadingState] = useState(false);
    const [successState, setSuccessState] = useState(false);

    const data = {
        "game": game,
        "strategies": strategies,
        "range": range
    }

    let history = useHistory();

    useEffect(() => {
        document.title = "Potvrda igre | Teorija igara"
    }, []);

    useEffect(() => {
        return () => {
            if (history.action === "POP") {
                handlePreviousPage()
            }
        }
    })

    const handlePreviousPage = (e = undefined) => {
        if (e !== undefined)
            e.preventDefault()

        history.push('/create', { gameMainInfo: data.game, strategies: data.strategies, range: data.range })
    }

    const saveGame = async (e) => {
        e.preventDefault();

        setLoadingState(true);

        var localDate = data.game.DueDate;
        var localStartDate = data.game.StartDate;

        data.game.DueDate = new Date(localDate).toUTCString();
        data.game.StartDate = new Date(localStartDate).toUTCString();

        if (data.game.Model === gameModels.indexOf("Students Dilemma")) {
            strategies.secondPlayerStrategies = [];
        }

        const res = await GameServices.InsertGame(data);

        data.game.DueDate = localDate;
        data.game.StartDate = localStartDate;

        if (res.status === 200) {
            setSuccessState(true);
            res.json()
                .then(response => {
                    if (game.Model >= gameModels.indexOf("Students Dilemma") && game.Model <= gameModels.indexOf("Travellers Dilemma"))
                        setTimeout(() => history.push("/allGames"), 2000);
                    else {
                        history.push(`/Payoffs/${response}`);
                    }
                })
        }
        else {
            alert("Čuvanje nije uspelo, pokušajte ponovo");
        }

        setLoadingState(false)
    }
    return (
        <>
            {
                successState
                    ? <SuccessAnimation setSuccessState={setSuccessState} />
                    : loadingState
                        ? <Loading />
                        : < div className="Confirmation" >

                            <h1>Potvrda igre</h1>
                            <h2>{game.Name}</h2>
                            <p>{game.Text}</p>
                            <div className="statWrap">
                                <p>Datum početka:</p>
                                <p className="result">{formatDate(game.StartDate)}</p>
                            </div>
                            <div className="statWrap">
                                <p>Datum isteka:</p>
                                <p className="result">{formatDate(game.DueDate)}</p>
                            </div>
                            <div className="statWrap">
                                <p>Chat: </p>
                                <p className="result">{
                                    game.ChatEnabled ?
                                        <i className="fas fa-check-circle" id="icon-true"></i>
                                        : <i className="fas fa-times-circle" id="icon-false"></i>
                                }</p>
                            </div>
                            <div className="statWrap">
                                <p>Višeetapna: </p>
                                <p className="result">{
                                    game.MultiStage ?
                                        <i className="fas fa-check-circle" id="icon-true"></i>
                                        : <i className="fas fa-times-circle" id="icon-false"></i>
                                }</p>
                            </div>
                            {
                                game.MultiStage ?
                                    <>
                                        <div className="statWrap">
                                            <p>Broj iteracija:</p>
                                            <p className="result">{game.MultiStageNumber}</p>
                                        </div>
                                        <div className="statWrap">
                                            <p>Iteracije se dešavaju na svakih:</p>
                                            <p className="result">{game.MultiStageInterval}</p>
                                        </div>
                                    </>
                                    : null
                            }
                            {
                                game.Model >= gameModels.indexOf("The P Beauty Contest") && game.Model <= gameModels.indexOf("Travellers Dilemma")
                                    ? <>
                                        <div className="statWrap" >
                                            <p>Minimalna vrednost:</p>
                                            <p className="result">{range.MinValue}</p>
                                        </div>
                                        <div className="statWrap" >
                                            <p>Maksimalna vrednost:</p>
                                            <p className="result">{range.MaxValue}</p>
                                        </div>
                                        <div className="statWrap" >
                                            <p>Default vrednost:</p>
                                            <p className="result">{range.DefaultValue}</p>
                                        </div>
                                    </>
                                    : <div id="strategyInputWrapper">
                                        <div className="StrategyShow" id="firstPlayerStrategies">
                                            <h3>Strategije prvog igrača</h3>
                                            <ul>{
                                                strategies.firstPlayerStrategies.map((strategy) => {
                                                    if (strategy.FirstOrSecondPlayer === 1) {
                                                        return <>
                                                            <li>{strategy.Text} {
                                                                strategy.Default
                                                                    ? <i className="fas fa-check-circle" id="icon-true"></i>
                                                                    : null
                                                            }</li>

                                                        </>
                                                    }
                                                })
                                            }
                                            </ul>
                                        </div>
                                        {
                                            game.Model !== gameModels.indexOf("Students Dilemma")
                                                ? <div className="StrategyShow" id="secondPlayerStrategies">
                                                    {
                                                        game.Model === gameModels.indexOf("Common Good")
                                                            ? <h3>Strategije grupe</h3>
                                                            : <h3>Strategije drugog igrača</h3>
                                                    }
                                                    <ul>{
                                                        strategies.secondPlayerStrategies.map((strategy) => {
                                                            if (strategy.FirstOrSecondPlayer === 2) {
                                                                return <>
                                                                    <li>{strategy.Text} {
                                                                        strategy.Default
                                                                            ? <i className="fas fa-check-circle" id="icon-true"></i>
                                                                            : null
                                                                    }</li>
                                                                </>
                                                            }
                                                        })
                                                    }
                                                    </ul>
                                                </div>
                                                : null
                                        }
                                    </div>
                            }
                            <div className="ButtonsAlignRight">
                                <button id="confirmGame" onClick={e => saveGame(e)}>Unos igre</button>
                            </div>
                        </div >
            }
        </>
    )
}
