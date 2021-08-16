import React from 'react'
import { useState, useEffect } from 'react';
import Chat from './Chat';
import Loading from '../Loading';


export default function Game({ id, userID }) {
    const [state, setstate] = useState({ checkedRadioButtonID: "radio_4" });
    const [gameState, setGameState] = useState({ name: "", text: "", strategies: [], chat: false, messages: [], active: false });
    const [loadingState, setLoadingState] = useState(true);

    const handleCheck = event => {
        setstate({ checkedRadioButtonID: event.target.id });
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
                    name: response.Name,
                    text: response.Text,
                    strategies: response.Strategies,
                    chat: response.Chat,
                    messages: response.Messages
                });
                setLoadingState(false);
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            })

    }, [])

    return (
        loadingState === true
            ? <Loading />
            :
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
                        ? < Chat messages={gameState.messages} id={id} userID={userID} />
                        : null
                }
            </div >
    );
}
