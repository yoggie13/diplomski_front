import React from 'react'
import StrategyInput from './StrategyInput';
import { useState } from 'react';
import Rewards from './Rewards';

function SaveGame() {

    fetch(
        'http://localhost:46824/api/admin/game',
        {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body:
                localStorage.getItem("Game")

        })
        .then(res => {
            if (res.status === 200) {
                alert("Sačuvano");
                localStorage.removeItem("Game");
            }
            else {
                throw new Error();
            }

        })
        .catch(error => {
            alert(error);
        });
}
export default function CreateGame({ changeRender }) {
    const [state, setstate] = useState({ page: 1 });
    const [gameState, setGameState] = useState({ Type: 1, Name: "", Text: "", Strategies: [], NumberOfPlayers: 10, DueDate: Date.now() });
    const [oneTwoState, setOneTwoState] = useState({ minLimit: 0, maxLimit: 0, default: 0 });

    const handleClick = (e, number) => {
        if (typeof (e) != "number" && typeof (e) != "string") {
            e.preventDefault();
            var newPage = state.page + number;
        }
        else if (typeof (e) === "string") {
            changeRender(e);
        }
        else
            newPage = state.page + e;

        localStorage.setItem("Game", JSON.stringify(gameState));
        setstate({ page: newPage });
    }
    const handleTypesOneTwo = e => {
        e.preventDefault();

        for (let i = oneTwoState.minLimit; i <= oneTwoState.maxLimit; i++) {
            if (i != oneTwoState.default) {
                gameState.Strategies.push({
                    "Text": i + "",
                    "FirstOrSecondPlayer": 1
                });
            }
            else {
                gameState.Strategies.push({
                    "Text": i + "",
                    "FirstOrSecondPlayer": 1,
                    "Default": true
                });
            }
        }

        localStorage.setItem("Game", JSON.stringify(gameState));

        SaveGame();
    }
    const getNumberOfPlayersPossible = e => {
        return <>
            {
                gameState.Type < 3 === false
                    ? <>
                        <option name="number" id="1" value="1">1</option>
                        <option name="number" id="2" value="2">2</option>
                    </>
                    : null
            }
            <option name="number" id="10" value="10">10</option>
        </>
    }

    return (
        <div className="CreateGame">
            <h1>Kreiraj igru</h1>
            <form className="CreateGameForm">
                {
                    state.page === 1
                        ? <>
                            <label htmlFor="typeofgame">Tip igre</label>
                            <select id="typeofgame" value={gameState.Type} onChange={e => setGameState({ Type: e.target.value })}>
                                <option name="number" id="1" value="1">The p-Beauty contest</option>
                                <option name="number" id="2" value="2">All-pay aukcije</option>
                                <option name="number" id="3" value="3">Dilema zatvorenika</option>
                            </select>
                            <label htmlFor="gamename">Naziv igre</label>
                            <input id="gamename" type="text" value={gameState.Name} onChange={e => setGameState({ ...gameState, Name: e.target.value })} />
                            <label htmlFor="text">Opis igre</label>
                            <textarea id="text" value={gameState.Text} onChange={e => setGameState({ ...gameState, Text: e.target.value })}></textarea>
                            <label htmlFor="noofplayers">Broj igrača</label>
                            <select id="noofplayers" value={gameState.NumberOfPlayers} onChange={e => setGameState({ NumberOfPlayers: e.target.value })}>
                                {getNumberOfPlayersPossible()}
                            </select>
                            <input type="datetime-local" value={gameState.DueDate} onChange={e => setGameState({ ...gameState, DueDate: e.target.value })} />
                            <div className="pageMover">
                                <p>Nastavi sa unosom strategija</p>
                                <i className="fas fa-chevron-right fa-lg" onClick={(event) => handleClick(event, 1)}></i>
                            </div>
                        </>
                        : state.page === 2
                            ? gameState.Type < 3
                                ? <>
                                    <label htmlFor="range1">Od</label>
                                    <input id="range1" type="number" value={oneTwoState.minLimit} onChange={e => setOneTwoState({ ...oneTwoState, minLimit: e.target.value })} />
                                    <label htmlFor="range2">Do</label>
                                    <input id="range2" type="number" value={oneTwoState.maxLimit} onChange={e => setOneTwoState({ ...oneTwoState, maxLimit: e.target.value })} />
                                    <label htmlFor="defaultNumber">Default vrednost</label>
                                    <small>Vrednost koja će se odigrati automatski, nakon isteka vremena, ako student ne odigra</small>
                                    <input id="defaultNumber" type="number" value={oneTwoState.default} onChange={e => setOneTwoState({ ...oneTwoState, default: e.target.value })} />
                                    <div className="pageMover">
                                        <i className="fas fa-chevron-right fa-lg" id="chevron-left" onClick={(event) => handleClick(event, -1)}></i>
                                        <input type="submit" value="Završi unos" onClick={handleTypesOneTwo} />
                                    </div>
                                </>
                                : <StrategyInput player={1} strategies={gameState.Strategies} changeRender={handleClick} />
                            : state.page === 3
                                ? <StrategyInput player={2} strategies={gameState.Strategies} changeRender={handleClick} />
                                : null
                }
            </form>
        </div >
    )
}
