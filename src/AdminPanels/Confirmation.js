import React, { useEffect } from 'react'
import { useState } from 'react';
import Loading from '../Loading';

function formatDate(dueDate) {
    var splitDate = dueDate.split('-');
    var dayAndTime = splitDate[2].split('T');

    return `${dayAndTime[0]}.${splitDate[1]}.${splitDate[0]} - ${dayAndTime[1]}`

}

export default function ({ game, changeRender }) {
    const [loadingState, setLoadingState] = useState(false);


    const saveGame = async (e) => {
        e.preventDefault()

        setLoadingState(true);

        fetch(
            'http://localhost:46824/api/admin/game',
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
                    // localStorage.removeItem("Game");
                    return res.json();
                }
                else {
                    throw new Error();
                }

            })
            .then(response => {
                console.log(response);
                changeRender("rewards", response);
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
                        <div id="strategyInputWrapper">
                            <div className="StrategyShow" id="firstPlayerStrategies">
                                <h3>Strategije prvog igrača</h3>
                                <ul>{
                                    game.Strategies.map((strategy) => {
                                        if (strategy.FirstOrSecondPlayer === 1)
                                            return <li>{strategy.Text}</li>
                                    })
                                }
                                </ul>
                            </div>
                            <div className="StrategyShow" id="secondPlayerStrategies">
                                <h3>Strategije drugog igrača</h3>
                                <ul>{
                                    game.Strategies.map((strategy) => {
                                        if (strategy.FirstOrSecondPlayer === 2)
                                            return <li>{strategy.Text}</li>
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
