import React from 'react'
import { useState, useEffect } from 'react';
import Chat from './Chat';


export default function Game({ id }) {
    const [state, setstate] = useState({ checkedRadioButtonID: "radio_4" });
    const [gameState, setGameState] = useState({ name: "", text: "", strategies: [], chat: false, messages: [], active: false });

    const handleCheck = event => {
        setstate({ checkedRadioButtonID: event.target.id });
    }

    useEffect(() => {
        fetch(
            `http://localhost:46824/api/game/20170077/${id}`,
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
                    name: response.Name,
                    text: response.Text,
                    strategies: response.Strategies,
                    chat: response.Chat,
                    messages: response.Messages
                });
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="Game">

            <h1>
                {gameState.name}
            </h1>

            <p>{gameState.text}</p>

            <form className="PlayGameForm">
                <div id="radioButtons">
                    {
                        gameState.strategies.map((strategy) =>
                            <>
                                <input type="radio" id={`radio_${strategy.StrategyID}`} name="Strategy" value={`${strategy.StrategyName}`}
                                    checked={state.checkedRadioButtonID === `${strategy.StrategyID}`}
                                    onChange={handleCheck}></input>
                                <label key={`${strategy.StrategyID}`} htmlFor={`radio_${strategy.StrategyID}`}>{`${strategy.StrategyName}`}
                                </label>
                            </>
                        )
                    }
                </div>
                {
                    gameState.active === true
                        ? <input type="submit" value="Odigraj"></input>
                        : null
                }
            </form>
            {
                gameState.chat === true
                    ? < Chat messages={gameState.messages} />
                    : null
            }
        </div >
    );
}
