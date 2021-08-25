import React from 'react'
import { useState, useEffect } from 'react';
import Confirmation from './Confirmation';


export default function CreateGame({ changeRender }) {
    const [loadingState, setLoadingState] = useState(true);
    const [state, setstate] = useState({ page: 1 });
    const [gameState, setGameState] = useState({
        Type: 1, Name: "", Text: "", Strategies: [], NumberOfPlayers: 10, Chat: false, DueDate: Date.now()
    });
    const [gameTypes, setGameTypes] = useState({ types: [] });
    const [directionState, setDirectionState] = useState({
        back: [,
            "",
            "Vratite se na unos igre",
            "Vratite se na unos strategija"
        ],
        forward: [
            "Pređite na unos strategija",
            "Pređite na potvrdu igre",
            ""
        ]
    })
    const [strategiesState, setStrategiesState] = useState({
        firstPlayerStrategies: [
            {
                Text: "",
                FirstOrSecondPlayer: 1,
                Default: true
            },
            {
                Text: "",
                FirstOrSecondPlayer: 1,
                Default: false


            }
        ], secondPlayerStrategies: [
            {
                Text: "",
                FirstOrSecondPlayer: 2,
                Default: true
            },
            {
                Text: "",
                FirstOrSecondPlayer: 2,
                Default: false
            }
        ]
    })
    const [oneTwoState, setOneTwoState] = useState({ minLimit: 0, maxLimit: 0, default: 0, timesX: 0, minSum: 0 });

    useEffect(() => {
        setLoadingState(true)
        fetch(

            `http://localhost:46824/api/admin/game/types`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                if (res.status === 200)
                    return res.json()
                else if (res.status === 404)
                    return [];
            })
            .then(response => {
                setGameTypes({ types: response })
                setLoadingState(false);
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            })
    }, [])

    const handleNextPage = (e, number) => {
        localStorage.setItem("Game", JSON.stringify(gameState));

        if (typeof (e) != "number" && typeof (e) != "string") {
            e.preventDefault();
            var newPage = state.page + number;
        }
        if (newPage === 3) {
            if (gameState.Type < 5) {
                handleTypesOneTwo();
                return;
            }
            debugger;
            cleanEmptyStrategies()
                .then(() => {
                    var strategies = strategiesState.firstPlayerStrategies.concat(strategiesState.secondPlayerStrategies);
                    setGameState({
                        ...gameState,
                        Strategies: strategies
                    })
                    return strategies;
                })
                .then((response) => {
                    var game = gameState;
                    game.Strategies = response;
                    localStorage.setItem("Game", JSON.stringify(game));
                    return game;
                })
                .then((res) => {
                    var newPage = state.page + number;
                })

        }

        setstate({ page: newPage });
    }

    const handleTypesOneTwo = () => {

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
        if (gameState.Type === 3) {
            for (let i = oneTwoState.minLimit; i <= oneTwoState.maxLimit; i++) {
                if (i != oneTwoState.default) {
                    gameState.Strategies.push({
                        "Text": i + "",
                        "FirstOrSecondPlayer": 2
                    });
                }
                else {
                    gameState.Strategies.push({
                        "Text": i + "",
                        "FirstOrSecondPlayer": 2,
                        "Default": true
                    });
                }
            }
        }


        localStorage.setItem("Game", JSON.stringify(gameState));

        var newPage = state.page + 1;
        setstate({ page: newPage });
    }


    const getNumberOfPlayersPossible = e => {
        return <>
            {
                gameState.Type < 5 === false
                    ? <>
                        <option name="number" id="1" value="1">1</option>
                        <option name="number" id="2" value="2">2</option>
                    </>
                    : null
            }
            <option name="number" id="10" value="10">10</option>
        </>
    }
    const handleInput = (e, index, player) => {
        if (player === 1) {
            const strategies = strategiesState.firstPlayerStrategies;
            strategies[index].Text = e.target.value;
            setStrategiesState({ ...strategiesState, firstPlayerStrategies: strategies });
        } else if (player === 2) {
            const strategies = strategiesState.secondPlayerStrategies;
            strategies[index].Text = e.target.value;
            setStrategiesState({ ...strategiesState, secondPlayerStrategies: strategies });
        }

    }
    const cleanEmptyStrategies = async () => {
        const firstStrategies = strategiesState.firstPlayerStrategies;

        for (let i = 0; i < firstStrategies.length; i++) {
            if (firstStrategies[i].Text === undefined || firstStrategies[i].Text === null || firstStrategies[i].Text === "") {
                firstStrategies.splice(i, 1);
            }
        }
        setStrategiesState({ ...strategiesState, firstPlayerStrategies: firstStrategies });

        const secondStrategies = strategiesState.secondPlayerStrategies;

        for (let i = 0; i < secondStrategies.length; i++) {
            if (secondStrategies[i].Text === undefined || secondStrategies[i].Text === null || secondStrategies[i].Text === "") {
                secondStrategies.splice(i, 1);
            }
        }

        setStrategiesState({ ...strategiesState, secondPlayerStrategies: secondStrategies });

        return true;
    }



    const addNew = (e, player) => {
        e.preventDefault();

        if (player === 1) {
            const strategies = strategiesState.firstPlayerStrategies;
            strategies.push({
                Text: "",
                FirstOrSecondPlayer: 1
            });
            setStrategiesState({ ...strategiesState, firstPlayerStrategies: strategies });
        } else if (player === 2) {
            const strategies = strategiesState.secondPlayerStrategies;
            strategies.push({
                Text: "",
                FirstOrSecondPlayer: 2
            });;
            setStrategiesState({ ...strategiesState, secondPlayerStrategies: strategies });
        }
    }


    return (
        <div className="CreateGame">
            {
                state.page < 3
                    ? <>
                        <h1>Kreiraj igru</h1>
                        <form className="CreateGameForm">
                            {
                                state.page === 1
                                    ? <>
                                        <label htmlFor="typeofgame">Tip igre*</label>
                                        <select required id="typeofgame" value={gameState.Type} onChange={e => setGameState({ ...gameState, Type: parseInt(e.target.value) })}>
                                            {
                                                gameTypes.types.map((type, index) =>
                                                    <option key={index} id={index + 1} value={index + 1}>{type}</option>
                                                )
                                            }
                                        </select>
                                        <label htmlFor="gamename">Naziv igre*</label>
                                        <input required id="gamename" type="text" value={gameState.Name} onChange={e => setGameState({ ...gameState, Name: e.target.value })} />
                                        <label htmlFor="text">Opis igre*</label>
                                        <textarea required id="text" value={gameState.Text} onChange={e => setGameState({ ...gameState, Text: e.target.value })}></textarea>
                                        <label htmlFor="noofplayers">Broj igrača*</label>
                                        <select required id="noofplayers" value={gameState.NumberOfPlayers} onChange={e => setGameState({ ...gameState, NumberOfPlayers: parseInt(e.target.value) })}>
                                            {getNumberOfPlayersPossible()}
                                        </select>
                                        <input required type="datetime-local" value={gameState.DueDate} onChange={e => setGameState({ ...gameState, DueDate: e.target.value })} />
                                        <div><label htmlFor="chatCheck">Da li je potrebna mogućnost komunikacije</label>
                                            <input type="checkbox" id="chatCheck" value={gameState.Chat} onChange={e => setGameState({ ...gameState, Chat: (e.target.value === "true") })} />
                                        </div>
                                    </>
                                    : state.page === 2
                                        ? gameState.Type < 5
                                            ? <>
                                                <label htmlFor="range1">Od</label>
                                                <input id="range1" type="number" value={oneTwoState.minLimit} onChange={e => setOneTwoState({ ...oneTwoState, minLimit: parseInt(e.target.value) })} />
                                                <label htmlFor="range2">Do</label>
                                                <input id="range2" type="number" value={oneTwoState.maxLimit} onChange={e => setOneTwoState({ ...oneTwoState, maxLimit: parseInt(e.target.value) })} />

                                                <>
                                                    <label htmlFor="defaultNumber">Default vrednost</label>
                                                    <small>Vrednost koja će se odigrati automatski, nakon isteka vremena, ako student ne odigra</small>
                                                    <input id="defaultNumber" type="number" value={oneTwoState.default} onChange={e => setOneTwoState({ ...oneTwoState, default: parseInt(e.target.value) })} />
                                                </>


                                            </>
                                            :
                                            <div id="strategyInputWrapper">
                                                <div className="StrategyInput" id="firstPlayerStrategies">
                                                    <h2>Strategije prvog igrača</h2>
                                                    {
                                                        strategiesState.firstPlayerStrategies.map((strategy, index) => {
                                                            return <div className="Strategy">
                                                                <div>
                                                                    <label htmlFor={index}>{index + 1}. strategija</label>
                                                                    <input id={index} value={strategy.Text} onChange={e => handleInput(e, index, 1)} type="text" />
                                                                </div>
                                                                <div >
                                                                    <label htmlFor={`defaultRadio${index}`}>Default:</label>
                                                                    <input type="radio" id={`defaultRadio${index}`} name="default1" value={index} checked={strategy.Default} />
                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                    < i className="fas fa-plus" onClick={e => addNew(e, 1)} ></i>

                                                </div >
                                                <div className="StrategyInput" id="secondPlayerStrategies">
                                                    <h2>Strategije drugog igrača</h2>
                                                    {
                                                        strategiesState.secondPlayerStrategies.map((strategy, index) => {
                                                            return <div className="Strategy">
                                                                <div>
                                                                    <label htmlFor={index}>{index + 1}. strategija</label>
                                                                    <input id={index} value={strategy.Text} onChange={e => handleInput(e, index, 2)} type="text" />
                                                                </div>
                                                                <div >
                                                                    <label htmlFor={`defaultRadio${index}`}>Default:</label>
                                                                    <input type="radio" id={`defaultRadio${index}`} name="default2" value={index} checked={strategy.Default} />
                                                                </div>

                                                            </div>
                                                        })
                                                    }
                                                    < i className="fas fa-plus" onClick={e => addNew(e, 2)}  ></i>

                                                </div >
                                            </div>
                                        : null
                            }
                        </form>
                    </>
                    : <Confirmation game={gameState} changeRender={changeRender} />
            }
            <div className="pageMover">
                {
                    state.page > 1
                        ? <div id="back">
                            <i className="fas fa-chevron-right fa-lg" id="chevron-left" onClick={(event) => handleNextPage(event, -1)}></i>
                            <p>{directionState.back[state.page - 1]}</p>
                        </div>
                        : null
                }
                {
                    state.page < 3
                        ? <div id="forward">
                            <p>{directionState.forward[state.page - 1]}</p>
                            <i className="fas fa-chevron-right fa-lg" onClick={e => handleNextPage(e, 1)}></i>
                        </div>
                        : null
                }
            </div>

        </div >
    )
}
