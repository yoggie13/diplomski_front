import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Loading from '../Loading';
import GameServices from '../../services/GameServices';

export default function Payoffs() {

    useEffect(() => {
        document.title = "Unos isplata | Teorija igara"
    }, []);

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

    let history = useHistory();
    let game = useParams();
    let gameID = parseInt(game.id);

    useEffect(() => {
        setLoadingState(true);
        GetGameInfo();
    }, [])

    const GetGameInfo = async () => {
        const res = await GameServices.GetGameForPayoffs(gameID);

        if (res.status === 200) {
            res.json()
                .then(response => {
                    setGameState({
                        ...gameState,
                        gameName: response.name,
                        gameText: response.text,
                        gameStrategies: response.strategies
                    })
                    setLoadingState(false);
                });
        }
        else {
            console.log("error");
            setLoadingState(false);

        }

    }

    const handleClick = async (e) => {
        var Payoffs = [];

        var k = 0;
        for (let i = 0; i <= gameState.gameStrategies.length / 2 - 1; i++) {
            for (let j = gameState.gameStrategies.length / 2; j < gameState.gameStrategies.length; j++) {
                Payoffs.push({
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

        var res = await GameServices.InsertPayoffs(gameID, Payoffs);

        if (res.status === 200) {
            alert("Sačuvano");
            history.push('/allGames');
            setLoadingState(false);
        }

        else {
            alert("Čuvanje nije uspelo, pokušajte ponovo");
            setLoadingState(false)
            return "error";
        }
    }

    return (
        <div className="Rewards">
            {
                loadingState
                    ? <Loading />
                    : <>
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
            }
        </div>
    )
}
