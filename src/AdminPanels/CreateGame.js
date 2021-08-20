import React from 'react'
import { useState, useEffect } from 'react';


export default function CreateGame({ changeRender }) {
    const [state, setstate] = useState({ page: 1 });
    const [gameState, setGameState] = useState({
        Type: 1, Name: "", Text: "", Strategies: [], NumberOfPlayers: 10, DueDate: Date.now()
    });
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
    const [oneTwoState, setOneTwoState] = useState({ minLimit: 0, maxLimit: 0, default: 0 });

    const handleNextPage = (e, number) => {
        localStorage.setItem("Game", JSON.stringify(gameState));

        if (typeof (e) != "number" && typeof (e) != "string") {
            e.preventDefault();
            var newPage = state.page + number;
        }
        if (newPage === 3) {
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
                    changeRender("confirmation", res)
                })

        }


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

        changeRender("confirmation");
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
            <h1>Kreiraj igru</h1>
            <form className="CreateGameForm">
                {
                    state.page === 1
                        ? <>
                            <label htmlFor="typeofgame">Tip igre</label>
                            <select id="typeofgame" value={gameState.Type} onChange={e => setGameState({ ...gameState, Type: parseInt(e.target.value) })}>
                                <option name="number" id="1" value="1">The p-Beauty contest</option>
                                <option name="number" id="2" value="2">All-pay aukcije</option>
                                <option name="number" id="3" value="3">Dilema zatvorenika</option>
                            </select>
                            <label htmlFor="gamename">Naziv igre</label>
                            <input id="gamename" type="text" value={gameState.Name} onChange={e => setGameState({ ...gameState, Name: e.target.value })} />
                            <label htmlFor="text">Opis igre</label>
                            <textarea id="text" value={gameState.Text} onChange={e => setGameState({ ...gameState, Text: e.target.value })}></textarea>
                            <label htmlFor="noofplayers">Broj igrača</label>
                            <select id="noofplayers" value={gameState.NumberOfPlayers} onChange={e => setGameState({ ...gameState, NumberOfPlayers: parseInt(e.target.value) })}>
                                {getNumberOfPlayersPossible()}
                            </select>
                            <input type="datetime-local" value={gameState.DueDate} onChange={e => setGameState({ ...gameState, DueDate: e.target.value })} />

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
                                        <i className="fas fa-chevron-right fa-lg" id="chevron-left" onClick={(event) => handleNextPage(event, -1)}></i>
                                        <input type="submit" value="Završi unos" onClick={handleTypesOneTwo} />
                                    </div>
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
            <div className="pageMover">
                <p> Pređite na sledećeg igrača</p>
                <i className="fas fa-chevron-right fa-lg" onClick={e => handleNextPage(e, 1)}></i>
            </div>

        </div >
    )
}
