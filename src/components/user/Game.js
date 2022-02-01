import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Radio from '@material-ui/core/Radio';
import Chat from './Chat';
import Loading from '../Loading';

export default function Game({ userID }) {
    const [checkedStrategyState, setCheckedStrategyState] = useState();
    const [gameState, setGameState] = useState({ game: null });
    const [loadingState, setLoadingState] = useState(true);

    let { id } = useParams();

    let history = useHistory();

    useEffect(() => {
        document.title = "Odigraj igru | Teorija igara"
    }, []);

    const handleCheck = id => {
        setCheckedStrategyState(id);
    }

    const handleInput = event => {
        var number = event.target.value;
        if (event.target.value < parseInt(gameState.game.minValue))
            number = parseInt(gameState.game.minValue);
        if (event.target.value > parseInt(gameState.game.maxValue))
            number = parseInt(gameState.game.maxValue);
        setCheckedStrategyState(number)
    }

    const getStrategy = e => {
        if (gameState.game.type == 2 || gameState.game.type == 4) {
            return JSON.stringify({
                "number": parseInt(checkedStrategyState)
            })
        }
        else {
            return JSON.stringify({
                "Strategy": {
                    "ID": parseInt(checkedStrategyState)
                }
            })
        }
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
            .then(res => {
                if (res.status === 200)
                    return res.json();
                else if (res.status === 404) {
                    return false;
                }
            })
            .then(response => {
                if (!response) {
                    alert("Ta igra je izbrisana");
                    history.push('/activeGames');
                }
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

        if (checkedStrategyState === "" || checkedStrategyState === null || checkedStrategyState === undefined) {
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
                body: getStrategy()
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
                else if (res.status === 404) {
                    alert("Ta igra je izbrisana");
                    history.push('/activeGames');
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
        loadingState
            ? <Loading />
            : <div className="Game">
                <h1>
                    {gameState.game.name}
                </h1>
                <p>{gameState.game.text}</p>
                {
                    gameState.game.active
                        ? <form className="PlayGameForm">
                            {
                                gameState.game.type === 1 || gameState.game.type == 3
                                    ? <div id="radioButtons">
                                        {
                                            gameState.game.strategies.map((strategy) =>
                                                <>
                                                    <label key={`${strategy.strategyID}`} htmlFor={`${strategy.strategyID}`} onClick={e => handleCheck(`${strategy.strategyID}`)}>
                                                        <Radio
                                                            id={`${strategy.strategyID}`}
                                                            name="Strategy"
                                                            value={`${strategy.strategyID}`}
                                                            checked={checkedStrategyState === `${strategy.strategyID}`}
                                                            onChange={e => handleCheck(e.target.id)}
                                                            required={true}
                                                        />
                                                        {`${strategy.strategyName}`}
                                                    </label>
                                                </>
                                            )
                                        }
                                    </div>
                                    : <>
                                        <label htmlFor="numberInput">Unesite broj</label>
                                        <input type="number" id="numberInput" value={checkedStrategyState} onChange={handleInput} min={gameState.game.minValue} max={gameState.game.maxValue} />
                                    </>
                            }
                            <div className="ButtonsAlignRight">
                                <input type="submit" value="Odigraj" onClick={playAGame}></input>
                            </div>
                        </form>
                        : null
                }
                {
                    gameState.game.chat
                        ? < Chat id={id} userID={userID} />
                        : null
                }
            </div >
    );
}
