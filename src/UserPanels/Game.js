import React from 'react'
import { useState, useEffect } from 'react';
import Chat from './Chat';


export default function Game() {
    const [state, setstate] = useState({ checkedRadioButtonID: "radio_4" });
    const [gameState, setGameState] = useState({ name: "", text: "", strategies: [] });

    const handleCheck = event => {
        setstate({ checkedRadioButtonID: event.target.id });
    }

    useEffect(() => {
        fetch(
            'https://localhost:44370/api/game/20170077/7',
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(response => {
                // setGameState({ name: response.name, text: response.text, strategies: response.strategies });
                console.log(response);
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="Game">

            <h1>
                {state.name}
            </h1>

            <p>{state.text}</p>

            <form className="PlayGameForm">
                <div id="radioButtons">
                    <input type="radio" id="radio_1" name="Strategy" value="A"
                        checked={state.checkedRadioButtonID === "radio_1"}
                        onChange={handleCheck}></input>
                    <label htmlFor="radio_1">A
                    </label>
                    <input type="radio" id="radio_2" name="Strategy" value="B"
                        checked={state.checkedRadioButtonID === "radio_2"}
                        onChange={handleCheck}></input>
                    <label htmlFor="radio_2">B
                    </label>
                    <input type="radio" id="radio_3" name="Strategy" value="C"
                        checked={state.checkedRadioButtonID === "radio_3"}
                        onChange={handleCheck}></input>
                    <label htmlFor="radio_3">C
                    </label>
                    <input type="radio" id="radio_4" name="Strategy" value="D"
                        checked={state.checkedRadioButtonID === "radio_4"}
                        onChange={handleCheck}></input>
                    <label htmlFor="radio_4">D
                    </label>
                </div>
                <input type="submit" value="Odigraj"></input>
            </form>
            <Chat />
        </div >
    );
}
