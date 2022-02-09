import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Chat from './Chat';
import Loading from '../Loading';
import Game from './Game';
import Quiz from './Quiz';

export default function GameHolder({ userID }) {

    const [checkedStrategyState, setCheckedStrategyState] = useState();
    const [gameState, setGameState] = useState({ game: null });
    const [loadingState, setLoadingState] = useState(true);
    const [answersState, setAnswersState] = useState([]);

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
        if (gameState.game.type === 2 || gameState.game.type === 4) {
            return JSON.stringify({
                "number": parseInt(checkedStrategyState)
            })
        }
        else if (gameState.game.type === 0) {
            return JSON.stringify({
                "answers": answersState
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

                if (response.type === 0)
                    setDefaultAnswers(response);

                setLoadingState(false);
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            })

    }, [])

    const setDefaultAnswers = (response) => {
        var arr = [];

        response.questions.forEach(question => {
            var answer_data = question.type === 0
                ? { text: "" }
                : question.type === 1
                    ? { answer_id: null }
                    : {
                        answers: []
                    }
            arr.push({
                question_id: question.id,
                question_type: question.type,
                answer_data
            })
        });
        setAnswersState(arr);
    };

    const getAnswersState = () => {
        return answersState;
    }

    const handleAnswersChange = (e, index, id) => {
        e.preventDefault();
        var newAnswers = [...answersState];

        if (newAnswers[index].question_type === 0) {
            newAnswers[index].answer_data.text = e.target.value;
        }
        else if (newAnswers[index].question_type === 1) {
            newAnswers[index].answer_data.answer_id = id;
        }
        else if (newAnswers[index].question_type === 2) {
            for (let i = 0; i < newAnswers[index].answer_data.answers.length; i++) {
                if (newAnswers[index].answer_data.answers[i].answer_id === id) {
                    newAnswers[index].answer_data.answers.splice(i, 1);
                    setAnswersState(newAnswers);
                    return;
                }
            }
            newAnswers[index].answer_data.answers.push({
                answer_id: id
            });
        }
        setAnswersState(newAnswers);
    }

    const checkAnswerState = () => {
        return true;
    }
    const playAGame = e => {
        e.preventDefault();

        if (!checkAnswerState && (checkedStrategyState === "" || checkedStrategyState === null || checkedStrategyState === undefined)) {
            alert("Morate uneti ispravne odgovore");
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
                                gameState.game.type !== 0
                                    ? <Game
                                        gameState={gameState}
                                        checkedStrategyState={checkedStrategyState}
                                        handleCheck={handleCheck}
                                        handleInput={handleInput}
                                    />
                                    : <Quiz
                                        quizState={gameState.game.questions}
                                        handleAnswersChange={handleAnswersChange}
                                        getAnswersState={getAnswersState}
                                    />
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
