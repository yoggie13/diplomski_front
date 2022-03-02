import React from 'react'
import { useState, useEffect } from 'react';
import {
    Link,
    useHistory
} from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import GameServices from '../../services/GameServices.js'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function Create() {

    useEffect(() => {
        document.title = "Kreiraj igru | Teorija igara"
    }, []);

    const [loadingState, setLoadingState] = useState(true);
    const [state, setstate] = useState({ page: 1 });
    const [gameState, setGameState] = useState({
        Model: 0,
        Name: "", Text: "",
        ChatEnabled: false,
        StartDate: "",
        DueDate: "",
        MultiStage: false,
        MultiStageNumber: 2
    });
    const [gameModels, setGameModels] = useState([]);

    const fieldsValid = () => {
        if (fieldInvalid(gameState.Model))
            return false
        if (fieldInvalid(gameState.Name))
            return false
        if (fieldInvalid(gameState.Text))
            return false
        if (fieldInvalid(gameState.DueDate))
            return false
        try {
            Date.parse(gameState.DueDate)
        }
        catch {
            return false;
        }

        return true;

    }
    const fieldInvalid = (field) => {
        return field === "" || field === null || field === undefined
    }

    let history = useHistory();

    useEffect(() => {
        setLoadingState(true);
        GetModels();
    }, [])

    const GetModels = async () => {
        var res = await GameServices.GetModels();

        if (res.status === 200) {
            res.json()
                .then(response => {
                    setGameModels(response);
                    setLoadingState(false);
                })
        }
        else {
            console.log(res.error);
            setLoadingState(false);
        }
    }
    const handleNextPage = (e) => {
        e.preventDefault();

        if (fieldsValid()) {
            if (gameState.Model !== gameModels.indexOf("Quiz")) {
                history.push('/create/game', { gameMainInfo: gameState, gameModels: gameModels });
            }
            else
                history.push('/create/quiz', { gameMainInfo: gameState });
        }
        else {
            alert("Niste popunili sve što je potrebno");
        }
    }

    return (
        <div className="CreateGame">
            <>
                <h1>Kreiraj igru</h1>
                <form className="CreateGameForm">
                    <label htmlFor="typeofgame">Tip igre*</label>
                    <select required id="typeofgame" value={gameState.Model} onChange={e => setGameState({ ...gameState, Model: parseInt(e.target.value) })}>
                        {
                            gameModels.map((model, index) =>
                                <option key={index} id={index} value={index}>{model}</option>
                            )
                        }
                    </select>
                    <label htmlFor="gamename">Naziv igre*</label>
                    <input required id="gamename" type="text" value={gameState.Name} onChange={e => setGameState({ ...gameState, Name: e.target.value })} />
                    <label htmlFor="text">Opis igre*</label>
                    <textarea required id="text" value={gameState.Text} onChange={e => setGameState({ ...gameState, Text: e.target.value })}></textarea>
                    <label htmlFor='startDate'>Datum početka igre</label>
                    <input id='startDate' required type="datetime-local" value={gameState.StartDate} onChange={e => setGameState({ ...gameState, StartDate: e.target.value })} />
                    <label htmlFor='dueDate'>Datum kraja igre</label>
                    <input id='dueDate' required type="datetime-local" value={gameState.DueDate} onChange={e => setGameState({ ...gameState, DueDate: e.target.value })} />
                    {
                        gameState.Model !== gameModels.indexOf("Quiz")
                            ? <>
                                <div>
                                    <label htmlFor='multiStageCheck'>Da li želite da igra bude višeetapna?</label>
                                    <Checkbox
                                        id='multiStageCheck'
                                        checked={gameState.MultiStage}
                                        onClick={e => setGameState({ ...gameState, MultiStage: !gameState.MultiStage })}
                                        color='secondary'
                                    />
                                </div>
                                {
                                    gameState.MultiStage
                                        ? <>
                                            <label htmlFor='msnumber'>Koliko iteracije želite da bude</label>
                                            <input id='msnumber' type='number' min={2} value={gameState.MultiStageNumber} onChange={e => setGameState({ ...gameState, MultiStageNumber: e.target.value })} />
                                        </>
                                        : null
                                }
                            </>
                            : null
                    }
                    {
                        gameState.Model >= gameModels.indexOf("Travellers Dilemma") && gameState.Model <= gameModels.indexOf("Split Steal")
                            ? <div><label htmlFor="chatCheck">Da li je potrebna mogućnost komunikacije</label>
                                <Checkbox
                                    id="chatCheck"
                                    checked={gameState.ChatEnabled}
                                    onClick={e => setGameState({ ...gameState, ChatEnabled: !gameState.ChatEnabled })}
                                    color={'secondary'}
                                />
                            </div>
                            : null
                    }
                </form>
            </>
            < div className="pageMover">
                <div id="forward">
                    <p>Pređite na unos detalja</p>
                    <i className="fas fa-chevron-right fa-lg" onClick={e => handleNextPage(e)}></i>
                </div>
            </div >
        </div>
    )
}