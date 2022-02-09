import React from 'react';
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function CreateGame() {
    var gameMainInfo = useLocation().state.gameMainInfo;
    const [gameState, setGameState] = useState(gameMainInfo);
    const [strategiesState, setStrategiesState] = useState({
        firstPlayerStrategies: [
            {
                Text: "a",
                FirstOrSecondPlayer: 1,
                Default: true
            },
            {
                Text: "b",
                FirstOrSecondPlayer: 1,
                Default: false
            }
        ], secondPlayerStrategies: [
            {
                Text: "a",
                FirstOrSecondPlayer: 2,
                Default: true
            },
            {
                Text: "b",
                FirstOrSecondPlayer: 2,
                Default: false
            }
        ]
    })
    const [oneTwoState, setOneTwoState] = useState({ MinValue: 0, MaxValue: 0, DefaultValue: 0, timesX: 0, minSum: 0 });

    let history = useHistory();

    // const handleNextPage = (e, number) => {
    //     localStorage.setItem("Game", JSON.stringify(gameState));

    //     if (typeof (e) != "number" && typeof (e) != "string") {
    //         e.preventDefault();
    //         var newPage = state.page + number;
    //     }
    //     if (newPage === 3) {
    //         if (gameState.Model > 1 && gameState.Model < 5) {
    //             handleRange();
    //             return;
    //         }
    //         cleanEmptyStrategies()
    //             .then(() => {
    //                 var strategies = strategiesState.firstPlayerStrategies.concat(strategiesState.secondPlayerStrategies);
    //                 setGameState({
    //                     ...gameState,
    //                     Strategies: strategies
    //                 })
    //                 return strategies;
    //             })
    //             .then((response) => {
    //                 var game = gameState;
    //                 game.Strategies = response;
    //                 localStorage.setItem("Game", JSON.stringify(game));
    //                 return game;
    //             })
    //             .then((res) => {
    //                 var newPage = state.page + number;
    //             })

    //     }
    //     setstate({ page: newPage });
    // }

    const fieldInvalid = (field) => {
        return field === "" || field === null || field === undefined
    }
    const arrayInvalid = (arr) => {
        return arr === undefined || arr === null || arr.length <= 0
    }
    const fieldsValid = () => {

        var Exception = {};

        if (arrayInvalid(strategiesState.firstPlayerStrategies))
            return false

        if (arrayInvalid(strategiesState.secondPlayerStrategies))
            return false

        try {
            strategiesState.firstPlayerStrategies.forEach(strategy => {
                if (fieldInvalid(strategy.Text) || fieldInvalid(strategy.FirstOrSecondPlayer) || fieldInvalid(strategy.Default)) {
                    throw Exception;
                }
            })

            strategiesState.firstPlayerStrategies.forEach(strategy => {
                if (fieldInvalid(strategy.Text) || fieldInvalid(strategy.FirstOrSecondPlayer) || fieldInvalid(strategy.Default))
                    throw Exception;
            })
        }
        catch {
            return false;
        }

        return true
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
    const setDefaultStrategy = (player, index) => {

        var strategies = [];

        if (player === 1) {
            strategies = strategiesState.firstPlayerStrategies;
        } else {
            strategies = strategiesState.secondPlayerStrategies;
        }

        if (strategies[index].Default)
            return;
        for (let i = 0; i < strategies.length; i++) {
            if (strategies[i].Default) {
                strategies[i].Default = false;
            }
        }
        strategies[index].Default = true;

        if (player === 1) {
            setStrategiesState({ ...strategiesState, firstPlayerStrategies: strategies });
        } else {
            setStrategiesState({ ...strategiesState, secondPlayerStrategies: strategies });
        }
    }
    const handleNextPage = e => {
        e.preventDefault();

        if (fieldsValid())
            history.push('/confirmation', { game: gameMainInfo, strategies: strategiesState, range: oneTwoState });
        else
            alert("Niste sve popunili kako treba");
    }
    const handlePreviousPage = e => {
        e.preventDefault();
        history.goBack();
    }
    return (
        <div>
            <h1>Unos strategija</h1>
            <form>{
                gameState.Model > 1 && gameState.Model < 5
                    ? <div className='RangeGameInput'>
                        <label htmlFor="range1">Od
                            <input id="range1" type="number" value={oneTwoState.MinValue} onChange={e => setOneTwoState({ ...oneTwoState, MinValue: parseInt(e.target.value) })} />
                        </label>
                        <label htmlFor="range2">Do
                            <input id="range2" type="number" value={oneTwoState.MaxValue} onChange={e => setOneTwoState({ ...oneTwoState, MaxValue: parseInt(e.target.value) })} />
                        </label>
                        <>
                            <label htmlFor="defaultNumber">Default vrednost
                                <input id="defaultNumber" type="number" id='full-width' value={oneTwoState.DefaultValue} onChange={e => setOneTwoState({ ...oneTwoState, DefaultValue: parseInt(e.target.value) })} />
                            </label>
                            <small>Vrednost koja će se odigrati automatski, nakon isteka vremena, ako student ne odigra</small>
                        </>
                    </div>
                    :
                    <div>
                        <div id="strategyInputWrapper">
                            <div className="StrategyInput" id="firstPlayerStrategies">
                                <h2>Strategije prvog igrača</h2>
                                {
                                    strategiesState.firstPlayerStrategies.map((strategy, index) => {
                                        return <div className="Strategy">
                                            <div>
                                                <label htmlFor={index}>{index + 1}. strategija</label>
                                                <input id={index}
                                                    type="text"
                                                    key={index}
                                                    value={strategy.Text}
                                                    onChange={e => handleInput(e, index, 1)} />
                                            </div>
                                            <div >
                                                <label htmlFor={`defaultRadio${index}`}>Def:</label>
                                                <Radio
                                                    id={`defaultRadio${index}`}
                                                    name="default2"
                                                    key={index}
                                                    value={index}
                                                    checked={strategy.Default}
                                                    onClick={e => setDefaultStrategy(1, index)}
                                                />
                                            </div>
                                        </div>
                                    })
                                }
                                {/* < i className="fas fa-plus" onClick={e => addNew(e, 1)} ></i> */}
                            </div >
                            <div className="StrategyInput" id="secondPlayerStrategies">
                                {
                                    gameState.Model === 1
                                        ? <h2>Strategije grupe</h2>
                                        : <h2>Strategije drugog igrača</h2>
                                }
                                {
                                    strategiesState.secondPlayerStrategies.map((strategy, index) => {
                                        return <div className="Strategy">
                                            <div>
                                                <label htmlFor={index}>{index + 1}. strategija</label>
                                                <input id={index}
                                                    type="text"
                                                    key={index}
                                                    value={strategy.Text}
                                                    onChange={e => handleInput(e, index, 2)} />
                                            </div>
                                            <div >
                                                <label htmlFor={`defaultRadio${index}`}>Def:</label>
                                                <Radio
                                                    id={`defaultRadio${index}`}
                                                    name="default2"
                                                    key={index}
                                                    value={index}
                                                    checked={strategy.Default}
                                                    onClick={e => setDefaultStrategy(2, index)}
                                                />
                                            </div>
                                        </div>
                                    })
                                }
                                {/* < i className="fas fa-plus" onClick={e => addNew(e, 2)}  ></i> */}
                            </div >
                        </div>
                    </div>
            }
            </form >
            < div className="pageMover">
                <div id="back">
                    <i className="fas fa-chevron-right fa-lg" id="chevron-left" onClick={e => handlePreviousPage(e)}></i>
                    <p>Povratak na unos osnovnih podataka</p>
                </div>
                <div id="forward">
                    <p>Pređite nа potvrdu</p>
                    <i className="fas fa-chevron-right fa-lg" onClick={e => handleNextPage(e)} ></i>
                </div >
            </div >
        </div >
    )
}
