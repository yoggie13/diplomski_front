import React from 'react'
import { useState, useEffect } from 'react';
import Loading from '../Loading';

export default function Rewards({ gameID, changeRender }) {
    const [gameState, setGameState] = useState({ gameName: "", gameText: "", gameStrategies: [] });
    const [loadingState, setLoadingState] = useState(true);
    const [rewardsState, setRewardsState] = useState({
        firstBlockFirst: 0,
        firstBlockSecond: 0,
        secondBlockFirst: 0,
        secondBlockSecond: 0,
        thirdBlockFirst: 0,
        thirdsBlockSecond: 0,
        fourthBlockFirst: 0,
        fourthBlockSecond: 0
    })

    useEffect(() => {
        setLoadingState(true);
        fetch(
            `http://localhost:46824/api/admin/game/creation/${gameID}`,
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
                    ...gameState,
                    gameName: response.name,
                    gameText: response.text,
                    gameStrategies: response.strategies
                })
                setLoadingState(false)
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            })

    }, [])

    const handleClick = e => {
        var payments = [];
        var rewards = Object.values(rewardsState);

        for (let i = 0; i <= gameState.gameStrategies.length / 2 - 1; i++) {
            for (let j = gameState.gameStrategies.length / 2; j < gameState.gameStrategies.length; j++) {
                payments.push({
                    StrategyPlayerOneParentGameID: gameID,
                    StrategyPlayerOneID: gameState.gameStrategies[i].id,
                    StrategyPlayerTwoParentGameID: gameID,
                    StrategyPlayerTwoID: gameState.gameStrategies[j].id,
                    PaymentsPlayerOne: parseInt(rewards[i * 2]),
                    PaymentsPlayerTwo: parseInt(rewards[i * 2 + 1])
                })
            }
        }

        fetch(
            `http://localhost:46824/api/admin/${gameID}/addPayments`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payments)
            })
            .then(res => {
                if (res.status === 200) {
                    alert("Sačuvano");
                    changeRender("allgames");
                    setLoadingState(false);
                }
                else {
                    throw new Error();
                }

            })
            .catch(error => {
                alert("Čuvanje nije uspelo, pokušajte ponovo");
                setLoadingState(false)
                return "error";
            });
    }

    return (
        <div className="Rewards">
            {
                loadingState === false

                    ? <>
                        <h1>{gameState.gameName}</h1>
                        <p>{gameState.gameText}</p>
                        <h2>Isplate</h2>
                        <form>
                            <div id="RewardMatrix">
                                <p id="A1">{
                                    gameState.gameStrategies[0].text
                                }</p>
                                <p id="B1">{
                                    gameState.gameStrategies[1].text
                                }</p>
                                <p id="A2">{
                                    gameState.gameStrategies[2].text
                                }</p>
                                <p id="B2">{
                                    gameState.gameStrategies[3].text
                                }</p>
                                <div id="AA">
                                    <input id="1.1.1" type="number" value={rewardsState.firstBlockFirst}
                                        onChange={e => (setRewardsState({ ...rewardsState, firstBlockFirst: e.target.value }))} />
                                    <input id="2.1.1" type="number" value={rewardsState.firstBlockSecond}
                                        onChange={e => (setRewardsState({ ...rewardsState, firstBlockSecond: e.target.value }))} />
                                </div>
                                <div id="AB" >
                                    <input id="1.1.2" value={rewardsState.secondBlockFirst}
                                        onChange={e => (setRewardsState({ ...rewardsState, secondBlockFirst: e.target.value }))} type="number" />
                                    <input id="2.2.1" type="number" value={rewardsState.secondBlockSecond}
                                        onChange={e => (setRewardsState({ ...rewardsState, secondBlockSecond: e.target.value }))} />
                                </div>
                                <div id="BA">
                                    <input id="1.2.1" type="number"
                                        value={rewardsState.thirdBlockFirst}
                                        onChange={e => (setRewardsState({ ...rewardsState, thirdBlockFirst: e.target.value }))} />
                                    <input id="2.1.1" type="number" value={rewardsState.thirdsBlockSecond}
                                        onChange={e => (setRewardsState({ ...rewardsState, thirdsBlockSecond: e.target.value }))} />
                                </div>
                                <div id="BB">
                                    <input id="1.2.2" type="number" value={rewardsState.fourthBlockFirst}
                                        onChange={e => (setRewardsState({ ...rewardsState, fourthBlockFirst: e.target.value }))} />
                                    <input id="2.2.2" type="number"
                                        value={rewardsState.fourthBlockSecond}
                                        onChange={e => (setRewardsState({ ...rewardsState, fourthBlockSecond: e.target.value }))} />
                                </div>
                            </div>
                            <input type="submit" value="Unesi isplate" onClick={e => handleClick(e)} />
                        </form>
                    </>
                    : <Loading />
            }
        </div>
    )
}
