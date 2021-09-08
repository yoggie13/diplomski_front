import React, { useEffect } from 'react'
import { useState } from 'react';
import Loading from '../Loading';
import { useHistory } from 'react-router';

function formatDate(dueDate) {
    var splitDate = dueDate.split('-');
    var dayAndTime = splitDate[2].split('T');

    return `${dayAndTime[0]}.${splitDate[1]}.${splitDate[0]} - ${dayAndTime[1]}`

}

export default function ({ game }) {
    const [loadingState, setLoadingState] = useState(false);

    let history = useHistory();


    const saveGame = async (e) => {
        e.preventDefault();

        setLoadingState(true);

        fetch(
            'https://diplomskiapi20210828140836.azurewebsites.net/api/admin/game',
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body:
                    localStorage.getItem("Game")

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
                if (game.Type < 5)
                    history.push("/allGames");
                else {
                    history.push(`/payments/${response}`);
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
        <div className="Confirmation">
            {
                loadingState === false
                    ? <>
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
                                game.Chat === true ?
                                    <i className="fas fa-check-circle" id="icon-true"></i>
                                    : <i className="fas fa-times-circle" id="icon-false"></i>
                            }</p>
                        </div>
                        <div id="strategyInputWrapper">
                            <div className="StrategyShow" id="firstPlayerStrategies">
                                <h3>Strategije prvog igrača</h3>
                                <ul>{
                                    game.Strategies.map((strategy) => {
                                        if (strategy.FirstOrSecondPlayer === 1) {
                                            return <>
                                                <li>{strategy.Text} {
                                                    strategy.Default === true
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
                                <h3>Strategije drugog igrača</h3>
                                <ul>{
                                    game.Strategies.map((strategy) => {
                                        if (strategy.FirstOrSecondPlayer === 2) {
                                            return <>
                                                <li>{strategy.Text} {
                                                    strategy.Default === true
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
                        <div className="ButtonsAlignRight">
                            <button id="confirmGame" onClick={e => saveGame(e)}>Unos igre</button>
                        </div>
                    </>
                    : <Loading />
            }
        </div>
    )
}
