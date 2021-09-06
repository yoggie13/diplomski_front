import React from 'react'
import { useState, useEffect } from 'react';
import Chat from './Chat';
import Loading from '../Loading';
import Radio from '@material-ui/core/Radio';
import { useHistory, useParams } from 'react-router';


export default function Game({ userID }) {
    const [state, setstate] = useState({ checkedStrategy: "" });
    const [gameState, setGameState] = useState({ game: null });
    const [loadingState, setLoadingState] = useState(true);

    let { id } = useParams();
    let history = useHistory();

    const handleCheck = id => {
        console.log(id)
        setstate({ ...state, checkedStrategy: id });
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

        if (gameState.game.type < 5) {
            for (let i = 0; i < gameState.game.strategies.length; i++) {
                if (gameState.game.strategies[i].strategyName === state.checkedStrategy) {
                    return gameState.game.strategies[i].strategyID;
                }
            }

        }
        else {

            return parseInt(state.checkedStrategy);
        }
    }


    useEffect(() => {

        setLoadingState(true)
        fetch(

            `https://diplomskiapi20210828140836.azurewebsites.net/api/game/${userID}/${id}`,
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
                if (response === false) {
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

        if (state.checkedStrategy === "" || state.checkedStrategy === null || state.checkedStrategy === undefined) {
            alert("Morate uneti ispravnu strategiju");
            return;
        }
        setLoadingState(true);

        fetch(
            `https://diplomskiapi20210828140836.azurewebsites.net/api/game/${id}/${userID}`,
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
                                gameState.game.type >= 4
                                    ? <div id="radioButtons">
                                        {
                                            gameState.game.strategies.map((strategy) =>
                                                <>
                                                    <label key={`${strategy.strategyID}`} htmlFor={`${strategy.strategyID}`} onClick={e => handleCheck(`${strategy.strategyID}`)}>

                                                        <Radio
                                                            id={`${strategy.strategyID}`}
                                                            name="Strategy"
                                                            value={`${strategy.strategyID}`}
                                                            checked={state.checkedStrategy === `${strategy.strategyID}`}
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
                                        <input type="number" id="numberInput" value={state.checkedStrategy} onChange={handleInput} min={gameState.game.strategies[0].strategyName} max={gameState.game.strategies[gameState.game.strategies.length - 1].strategyName} />
                                    </>
                            }
                            <div className="ButtonsAlignRight">
                                <input type="submit" value="Odigraj" onClick={playAGame}></input>
                            </div>
                        </form>
                        : null
                }
                {
                    gameState.game.chat === true
                        ? < Chat messages={gameState.game.messages} id={id} userID={userID} />
                        : null
                }
            </div >
    );
}
