import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { useState, useEffect } from 'react'
import Loading from '../Loading';
import { map } from 'async';

export default function GameDashboard({ gameID = 12 }) {
    const [gameState, setGameState] = useState([{ gameInfo: [] }]);
    const [loadingState, setLoadingState] = useState(true);


    useEffect(() => {

        setLoadingState(true)
        fetch(

            `http://localhost:46824/api/admin/game/${gameID}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(response => {
                setGameState({
                    ...gameState, gameInfo: response
                });
                setLoadingState(false);
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            })

    }, [])


    return (
        <div className="GameDashboard">
            {
                loadingState === false
                    ? <>
                        <h1>{gameState.gameInfo.name}</h1>
                        <p>{gameState.gameInfo.text}</p>
                        <div id="text">
                            <div id="stats">
                                <div className="statWrap">
                                    <p>Broj igrača koji su odigrali:</p>
                                    <p className="result">{gameState.gameInfo.playersPlayed}</p>
                                </div>
                                <div className="statWrap">
                                    <p>Datum isteka:</p>
                                    <p className="result">{gameState.gameInfo.dueDate}</p>
                                </div>
                                {
                                    gameState.gameInfo.finalValue != null
                                        ? <div className="statWrap">
                                            <p>Trenutna konačna vrednost:</p>
                                            <p className="result">{gameState.gameInfo.finalValue}</p>
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
                                        data={gameState.gameInfo.strategiesPlayerOne}
                                    />
                                    <ul>
                                        {
                                            gameState.gameInfo.strategiesPlayerOne.map((strategy, index) =>
                                                <li id={`color${strategy.color.split('#')[1]}`} key={index}>{strategy.title}</li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                            {
                                gameState.gameInfo.hasSecondPlayer === true
                                    ? <div id="secondPlayer">
                                        <h2>Drugi igrač</h2>
                                        <div className="PieWithInfo">
                                            <PieChart
                                                animate={true}
                                                data={[
                                                    { title: 'One', value: 10, color: '#E38627' },
                                                    { title: 'Two', value: 15, color: '#C13C37' },
                                                    { title: 'Three', value: 20, color: '#6A2135' },
                                                ]
                                                }
                                            />
                                            <ul>
                                                <li>
                                                    One
                                                </li>
                                                <li>
                                                    Two
                                                </li>
                                                <li>
                                                    Three
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    : null
                            }
                        </div>
                    </>
                    : <Loading />
            }
        </div >
    )
}
