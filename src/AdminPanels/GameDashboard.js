import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { useState, useEffect } from 'react'
import Loading from '../Loading';
import { map } from 'async';

function formatDate(dueDate) {
    var splitDate = dueDate.split('-');
    var dayAndTime = splitDate[2].split('T');

    return `${dayAndTime[0]}.${splitDate[1]}.${splitDate[0]} - ${dayAndTime[1]}`

}
export default function GameDashboard({ gameID }) {
    const [gameState, setGameState] = useState([{ game: [] }]);
    const [loadingState, setLoadingState] = useState(true);
    const [apiState, setApiState] = useState(gameID != undefined ? `game/${gameID}` : "dashboard")


    useEffect(() => {

        setLoadingState(true)
        fetch(

            `http://localhost:46824/api/admin/${apiState}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                if (res.status === 200)
                    return res.json()
                else if (res.status === 404)
                    return false;
            })
            .then(response => {
                console.log(response)
                setGameState({
                    ...gameState, game: response
                });
                setLoadingState(false);
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            })

    }, [])


    return (
        <div className="GameDashboard">{console.log(gameState.game)}
            {
                loadingState === true
                    ? <Loading />
                    : gameState.game != false
                        ? <>
                            <h1>Dashboard</h1>
                            <h2>{gameState.game.name}</h2>
                            <p>{gameState.game.text}</p>
                            <div id="text">
                                <div id="stats">
                                    <div className="statWrap">
                                        <p>Broj igrača koji su odigrali:</p>
                                        <p className="result">{gameState.game.playersPlayed}</p>
                                    </div>
                                    <div className="statWrap">
                                        <p>Datum isteka:</p>
                                        <p className="result">{formatDate(gameState.game.dueDate)}</p>
                                    </div>
                                    {
                                        gameState.game.finalValue != null
                                            ? <div className="statWrap">
                                                <p>Trenutna konačna vrednost:</p>
                                                <p className="result">{gameState.game.finalValue}</p>
                                            </div>
                                            : null
                                    }
                                </div>
                                <hr></hr>
                            </div>
                            <div className="PieCharts">
                                <div id="firstPlayer">
                                    <h2>Prvi igrač</h2>
                                    <div className="PieWithInfo">
                                        <PieChart
                                            animate={true}
                                            data={gameState.game.strategiesPlayerOne}
                                            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}

                                        />
                                        <ul>
                                            {
                                                gameState.game.strategiesPlayerOne.map((strategy, index) =>
                                                    <li id={`color${strategy.color.split('#')[1]}`} key={index}>{strategy.title}</li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                                {
                                    gameState.game.hasSecondPlayer === true
                                        ? <div id="secondPlayer">
                                            <h2>Drugi igrač</h2>
                                            <div className="PieWithInfo">
                                                <PieChart
                                                    animate={true}
                                                    data={gameState.game.strategiesPlayerTwo}
                                                    label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}

                                                />
                                                <ul>
                                                    {
                                                        gameState.game.strategiesPlayerTwo.map((strategy, index) =>
                                                            <li id={`color${strategy.color.split('#')[1]}`} key={index}>{strategy.title}</li>
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>
                        </>
                        : <p>Trenutno nema aktivnih igara</p>
            }
        </div >
    )
}
