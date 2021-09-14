import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { useState, useEffect } from 'react'
import Loading from '../Loading';
import { map } from 'async';
import { useHistory, useParams } from 'react-router';

function formatDate(dueDate) {
    var splitDate = dueDate.split('-');
    var dayAndTime = splitDate[2].split('T');

    return `${dayAndTime[0]}.${splitDate[1]}.${splitDate[0]} - ${dayAndTime[1]}`

}
function checkDate(dueDate) {
    return Date.parse(dueDate) > Date.now();
}
export default function GameDashboard() {
    const [gameState, setGameState] = useState([{ game: [] }]);
    const [loadingState, setLoadingState] = useState(true);
    const [refreshState, setRefreshState] = useState(true);

    let gameID = useParams();
    let history = useHistory();
    const [apiState, setApiState] = useState(gameID === {} ? "dashboard" : `game/${gameID.id}`)


    useEffect(() => {

        if (refreshState === true) {

            setLoadingState(true);
            fetch(

                `https://diplomskiapi20210828140836.azurewebsites.net/api/admin/${apiState}`,
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
                    setGameState({
                        ...gameState, game: response
                    });
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

    const finishGame = e => {
        e.preventDefault();

        setLoadingState(true);

        fetch(
            `https://diplomskiapi20210828140836.azurewebsites.net/api/admin/game/${gameState.game.id}/finish`,
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
            `https://diplomskiapi20210828140836.azurewebsites.net/api/admin/game/${gameState.game.id}`,
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
                    history.push('/dashboard');
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
            JSON.parse(localStorage.getItem("Admin")) === false
                ? <p>Prijavite se sa administratorskim nalogom da biste pristupili ovim opcijama</p>
                : loadingState === true
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
                            <div className="ButtonsAlignRight" id="dashboardButtons">
                                {
                                    checkDate(gameState.game.dueDate) === true
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
