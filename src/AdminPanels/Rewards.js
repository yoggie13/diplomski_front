import React from 'react'
import { useState, useEffect } from 'react';
import Loading from '../Loading';

export default function Rewards({ gameID, changeRender }) {
    const [gameState, setGameState] = useState({ gameName: "", gameText: "", gameStrategies: [] });
    const [loadingState, setLoadingState] = useState(true);
    const [rewardsState, setRewardsState] = useState({
        blocks: [
            [
                { payment: 0 },
                { payment: 0 }
            ], [
                { payment: 0 },
                { payment: 0 }
            ], [
                { payment: 0 },
                { payment: 0 }
            ], [
                { payment: 0 },
                { payment: 0 }
            ],
        ]
    })
    const handleInput = (e, i, j) => {

        var newBlocks = rewardsState.blocks;
        newBlocks[i][j].payment = e.target.value;
        setRewardsState({ blocks: newBlocks });
    }

    useEffect(() => {
        setLoadingState(true);
        fetch(
            `https://diplomskiapi20210828140836.azurewebsites.net/api/admin/game/creation/${gameID}`,
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
        ;

        var k = 0;
        for (let i = 0; i <= gameState.gameStrategies.length / 2 - 1; i++) {
            for (let j = gameState.gameStrategies.length / 2; j < gameState.gameStrategies.length; j++) {
                payments.push({
                    StrategyPlayerOneParentGameID: gameID,
                    StrategyPlayerOneID: gameState.gameStrategies[i].id,
                    StrategyPlayerTwoParentGameID: gameID,
                    StrategyPlayerTwoID: gameState.gameStrategies[j].id,
                    PaymentPlayerOne: parseInt(rewardsState.blocks[k][0].payment),
                    PaymentPlayerTwo: parseInt(rewardsState.blocks[k][1].payment)
                })
                k++;
            }
        }

        fetch(
            `https://diplomskiapi20210828140836.azurewebsites.net/api/admin/${gameID}/addPayments`,
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
                                    <input id="1.1.1" type="number" value={rewardsState.blocks[0][0].payment}
                                        onChange={e => handleInput(e, 0, 0)} />
                                    <input id="2.1.1" type="number" value={rewardsState.blocks[0][1].payment}
                                        onChange={e => handleInput(e, 0, 1)} />
                                </div>
                                <div id="AB" >
                                    <input id="1.1.2" type="number"
                                        value={rewardsState.blocks[1][0].payment}
                                        onChange={e => handleInput(e, 1, 0)} />
                                    <input id="2.2.1" type="number"
                                        value={rewardsState.blocks[1][1].payment}
                                        onChange={e => handleInput(e, 1, 1)} />
                                </div>
                                <div id="BA">
                                    <input id="1.2.1" type="number"
                                        value={rewardsState.blocks[2][0].payment}
                                        onChange={e => handleInput(e, 2, 0)} />
                                    <input id="2.1.1" type="number"
                                        value={rewardsState.blocks[2][1].payment}
                                        onChange={e => handleInput(e, 2, 1)} />
                                </div>
                                <div id="BB">
                                    <input id="1.2.2" type="number"
                                        value={rewardsState.blocks[3][0].payment}
                                        onChange={e => handleInput(e, 3, 0)} />
                                    <input id="2.2.2" type="number"
                                        value={rewardsState.blocks[3][1].payment}
                                        onChange={e => handleInput(e, 3, 1)} />
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
