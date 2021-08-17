import React from 'react'
import { useState, useEffect } from 'react';
import Chat from './Chat';
import Loading from '../Loading';

export default function Game({ id, userID }) {
    const [state, setstate] = useState({ checkedStrategy: "" });
    const [gameState, setGameState] = useState({ game: null });
    const [loadingState, setLoadingState] = useState(true);

    const handleCheck = event => {
        setstate({ ...state, checkedStrategy: event.target.id });
    }
    const handleInput = event => {
        var number = event.target.value;
        if (event.target.value < parseInt(gameState.game.strategies[0].strategyName))
            number = parseInt(gameState.game.strategies[0].strategyName);
        if (event.target.value > parseInt(gameState.game.strategies[gameState.game.strategies.length - 1].strategyName))
            number = parseInt(gameState.game.strategies[gameState.game.strategies.length - 1].strategyName);

        setstate({ checkedStrategy: number })
    }

    const getStrategyID = e => {
        return gameState.game.type < 3 ? (parseInt(state.checkedStrategy) + 1) : parseInt(state.checkedStrategy)
    }


    useEffect(() => {

        setLoadingState(true)
        fetch(

            `http://localhost:46824/api/game/${userID}/${id}`,
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
                    ...gameState, game: response
                });
                setLoadingState(false);
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            })

    }, [])

    const playAGame = e => {
        e.preventDefault();

        if (state.checkedStrategy === "" || state.checkedStrategy === null) {
            alert("Morate uneti ispravnu strategiju");
            return;
        }
        setLoadingState(true);

        fetch(
            `http://localhost:46824/api/game/${id}/${userID}`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ID: getStrategyID()
                })
            })
            .then(res => {
                if (res.status === 200) {
                    alert("Sačuvano");
                    setGameState(gameState => ({
                        game: {
                            ...gameState.game,
                            active: false
                        }
                    }))
                } else if (res.status === 409) {
                    alert("Već ste uneli odgovor na ovu igru");
                }
                else {
                    alert("Nije uspelo")
                }
                setLoadingState(false);

            })
            .catch(error => {
                alert("Nije uspelo");
                setLoadingState(false);
            })
    }

    return (
        loadingState === true
            ? <Loading />
            :
            <div className="Game">
                {console.log(state.checkedStrategy)}

                <h1>
                    {gameState.game.name}
                </h1>

                <p>{gameState.game.text}</p>
                {
                    gameState.game.active === true
                        ? <form className="PlayGameForm">
                            {
                                gameState.game.type > 2
                                    ? <div id="radioButtons">
                                        {
                                            gameState.game.strategies.map((strategy) =>
                                                <>
                                                    <label key={`${strategy.strategyID}`} htmlFor={`${strategy.strategyID}`}>
                                                        <input type="radio" id={`${strategy.strategyID}`} name="Strategy" value={`${strategy.strategyID}`}
                                                            checked={state.checkedStrategy === `${strategy.strategyID}`}
                                                            onChange={handleCheck}></input>
                                                        {`${strategy.strategyName}`}
                                                    </label>
                                                </>
                                            )
                                        }
                                    </div>
                                    : <>
                                        <label htmlFor="numberInput">Unesite broj</label>
                                        <input type="number" id="numberInput" value={state.checkedStrategy} onChange={handleInput} min={gameState.game.strategies[0].strategyName} max={gameState.game.strategies[gameState.game.strategies.length - 1].strategyName} />
                                    </>
                            }

                            <input type="submit" value="Odigraj" onClick={playAGame}></input>

                        </form>
                        : null
                }
                {
                    gameState.chat === true
                        ? < Chat messages={gameState.game.messages} id={id} userID={userID} />
                        : null
                }
            </div >
    );
}
