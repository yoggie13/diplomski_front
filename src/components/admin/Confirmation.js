import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import Loading from '../Loading';

function formatDate(dueDate) {
    var splitDate = dueDate.split('-');
    var dayAndTime = splitDate[2].split('T');

    return `${dayAndTime[0]}.${splitDate[1]}.${splitDate[0]} - ${dayAndTime[1]}`
}

export default function Confirmation({ game, strategies, range }) {

    const [loadingState, setLoadingState] = useState(false);
    const data = {
        "game": game,
        "strategies": strategies,
        "range": range
    }

    let history = useHistory();

    useEffect(() => {
        document.title = "Potvrda igre | Teorija igara"
    }, []);

    const saveGame = async (e) => {
        e.preventDefault();

        setLoadingState(true);

        fetch(
            'http://localhost:46824/api/game/create',
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify(data)
            })
            .then(res => {
                if (res.status === 200) {
                    alert("Sačuvano");
                    localStorage.removeItem("Game");
                    return res.json();
                }
                else {
                    throw new Error();
                }
            })
            .then(response => {
                if (game.Model > 1 && game.Model < 5)
                    history.push("/allGames");
                else {
                    history.push(`/Payoffs/${response}`);
                }
                setLoadingState(false);
                return;
            })
            .catch(error => {
                alert("Čuvanje nije uspelo, pokušajte ponovo");
                setLoadingState(false)
                return "error";
            });
    }
    return (
        < div className="Confirmation" >
            {
                loadingState
                    ? <Loading />
                    : <>
                        <h1>Potvrda igre</h1>
                        <h2>{game.Name}</h2>
                        <p>{game.Text}</p>
                        <div className="statWrap">
                            <p>Datum isteka:</p>
                            <p className="result">{formatDate(game.DueDate)}</p>
                        </div>
                        <div className="statWrap">
                            <p>Chat: </p>
                            <p className="result">{
                                game.Chat ?
                                    <i className="fas fa-check-circle" id="icon-true"></i>
                                    : <i className="fas fa-times-circle" id="icon-false"></i>
                            }</p>
                        </div>
                        {
                            game.Model > 1 && game.Model < 4
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
                                    <div className="StrategyShow" id="secondPlayerStrategies">
                                        {
                                            game.Model === 1
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
                                </div>
                        }
                        <div className="ButtonsAlignRight">
                            <button id="confirmGame" onClick={e => saveGame(e)}>Unos igre</button>
                        </div>
                    </>
            }
        </div >
    )
}
