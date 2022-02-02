import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router';
// import { PieChart } from 'react-minimal-pie-chart';
import CanvasJSReact from '../../assets/canvasjs.react';
import Loading from '../Loading';

function formatDate(dueDate) {
    var splitDate = dueDate.split('-');
    var dayAndTime = splitDate[2].split('T');

    return `${dayAndTime[0]}.${splitDate[1]}.${splitDate[0]} - ${dayAndTime[1]}`
}
function checkDate(dueDate) {
    return Date.parse(dueDate) > Date.now();
}

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function GameDashboard() {

    useEffect(() => {
        document.title = "Dashboard | Teorija igara"
    }, []);

    const [gameState, setGameState] = useState({});
    const [dataState, setDataState] = useState({ optionsFirst: {}, optionsSecond: false });
    const [loadingState, setLoadingState] = useState(true);
    const [refreshState, setRefreshState] = useState(true);

    let gameID = useParams();
    let history = useHistory();
    const [apiState, setApiState] = useState(gameID.id === undefined ? "dashboard" : `game/${gameID.id}`)

    useEffect(() => {
        if (refreshState) {
            setLoadingState(true);
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
                    setGameState(response);
                    createOptions(response);
                    setRefreshState(false);
                    setLoadingState(false);
                })
                .catch(error => {
                    console.log(error);
                    setRefreshState(false);
                    setLoadingState(false);
                })
        }
    }, [refreshState])

    const createOptions = response => {
        const optionsOne = {
            title: {
                text: "Odigrane strategije"
            },
            data: [
                {
                    type: response.firstPlayerStrategies.length > 5 ? "column" : "pie",
                    dataPoints: response.firstPlayerStrategies
                }
            ]
        }
        var optionsTwo = false;
        if (response.hasOwnProperty('secondPlayerStrategies'))
            optionsTwo = {
                title: {
                    text: "Odigrane strategije"
                },
                data: [
                    {
                        type: response.firstPlayerStrategies.length > 5 ? "column" : "pie",
                        dataPoints: response.secondPlayerStrategies
                    }
                ]
            }
        setDataState({ ...dataState, optionsFirst: optionsOne, optionsSecond: optionsTwo });
    }

    const finishGame = e => {
        e.preventDefault();

        setLoadingState(true);

        fetch(
            `http://localhost:46824/api/game/${gameState.id}/finish`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                if (res.status === 200) {
                    alert("Igra završena");
                    setRefreshState(true);
                    setLoadingState(false);

                    return;
                }
                else {
                    alert(res.statusText)
                }
                setLoadingState(false);

            })
            .catch(error => {
                alert("Nije uspelo");
                setLoadingState(false);
            })

    }
    const deleteGame = e => {
        setLoadingState(true);

        fetch(
            `http://localhost:46824/api/game/${gameState.id}`,
            {
                method: "DELETE",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                if (res.status === 200) {
                    alert("Igra obrisana");
                    gameID.id = undefined;
                    setApiState("dashboard");
                    history.push('/allGames');
                    setRefreshState(true);
                    setLoadingState(false);
                    return;
                }
                else {
                    alert(res.statusText)
                }
            })
            .catch(error => {
                alert("Nije uspelo");
                setLoadingState(false);
            })
    }

    return (
        <div className="GameDashboard">{
            loadingState
                ? <Loading />
                : gameState !== false
                    ? <>
                        <h1>Dashboard</h1>
                        <h2>{gameState.name}</h2>
                        <p>{gameState.text}</p>
                        <div id="text">
                            <div id="stats">
                                <div className="statWrap">
                                    <p>Broj igrača koji su odigrali:</p>
                                    <p className="result">{gameState.playersPlayed}</p>
                                </div>
                                <div className="statWrap">
                                    <p>Datum isteka:</p>
                                    <p className="result">{formatDate(gameState.dueDate)}</p>
                                </div>
                                {
                                    gameState.finalValue != null
                                        ? <div className="statWrap">
                                            <p>Trenutna konačna vrednost:</p>
                                            <p className="result">{gameState.finalValue}</p>
                                        </div>
                                        : null
                                }
                            </div>
                            <hr></hr>
                        </div>
                        <div className='Charts'>
                            <div id='firstPlayer'>
                                <h2>Prvi igrač</h2>
                                <div className="Chart">
                                    <CanvasJSChart options={dataState.optionsFirst} />
                                </div>
                            </div>
                            {
                                dataState.optionsSecond !== false
                                    ? <div id='secondPlayer'>
                                        <h2>Drugi igrač</h2>
                                        <div className="Chart">
                                            <CanvasJSChart options={dataState.optionsSecond} />
                                        </div>
                                    </div>
                                    : null
                            }
                        </div>
                        <div className="ButtonsAlignRight" id="dashboardButtons">
                            {
                                checkDate(gameState.dueDate)
                                    ? <button id="finishGame" onClick={e => finishGame(e)}>Završite igru</button>
                                    : null
                            }
                            <button id="deleteGame" onClick={e => deleteGame(e)}>Obrišite igru</button>
                        </div>
                    </>
                    : <p>Trenutno nema aktivnih igara</p>
        }
        </div >
    )
}
