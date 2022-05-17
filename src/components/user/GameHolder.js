import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Chat from './Chat';
import Loading from '../Loading';
import Game from './Game';
import Quiz from './Quiz';
import GameServices from '../../services/GameServices'
import SuccessAnimation from '../SuccessAnimation';

export default function GameHolder({ userID }) {

    const [checkedStrategyState, setCheckedStrategyState] = useState();
    const [gameState, setGameState] = useState({ game: null });
    const [loadingState, setLoadingState] = useState(true);
    const [answersState, setAnswersState] = useState([]);
    const [successState, setSuccessState] = useState(false);

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
            return {
                "number": parseInt(checkedStrategyState)
            }
        }
        else if (gameState.game.type === 0) {
            return {
                "answers": answersState
            }
        }
        else {
            return {
                "Strategy": {
                    "ID": parseInt(checkedStrategyState)
                }
            }
        }
    }
    const fieldInvalid = (field) => {
        return field === "" || field === null || field === undefined
    }
    const arrayInvalid = (arr) => {
        return arr === undefined || arr === null || arr.length <= 0
    }
    const fieldsValid = () => {
        var Exception = {};
        try {
            if (gameState.game.type === 0) {
                answersState.forEach(answer => {
                    if (answer.question_type === 0) {
                        if (fieldInvalid(answer.answer_data.text))
                            throw Exception;
                    }
                    else if (answer.question_type === 1) {
                        if (fieldInvalid(answer.answer_data.answer_id))
                            throw Exception;
                    }
                    else if (answer.question_type === 2) {
                        if (arrayInvalid(answer.answer_data.answers))
                            throw Exception;
                        answer.answer_data.answers.forEach(ans => {
                            if (fieldInvalid(ans.answer_id))
                                throw Exception
                        })
                    }
                })
            }
            else if (gameState.game.type === 1 || gameState.game.type === 3) {
                if (fieldInvalid(checkedStrategyState))
                    return false;
            } else if (gameState.game.type === 2 || gameState.game.type === 4) {

                if (fieldInvalid(checkedStrategyState))
                    return false;

                if (parseInt(checkedStrategyState) < parseInt(gameState.game.minValue))
                    return false;

                if (parseInt(checkedStrategyState) > parseInt(gameState.game.maxValue))
                    return false;
            }
        }
        catch {
            return false;
        }
        return true;
    }
    useEffect(() => {
        setLoadingState(true)
        GetGame();
    }, [id])

    const GetGame = async () => {
        var res = await GameServices.GetGame(id, userID);

        if (res.status === 200) {
            res.json()
                .then(response => {
                    if (!response) {
                        alert("Ta igra je izbrisana");
                        history.push('/games');
                    }
                    setGameState({
                        ...gameState, game: response
                    });

                    if (response.type === 0)
                        setDefaultAnswers(response);

                    setLoadingState(false);
                })
        }
        else {
            console.log("error")
            setLoadingState(false);
        }
    }

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

    const playAGame = async (e) => {
        e.preventDefault();
        setLoadingState(true);

        if (fieldsValid()) {
            var res = await GameServices.PlayGame(id, userID, getStrategy())

            if (res.status === 200) {
                setSuccessState(true);
                setTimeout(() => {
                    setGameState(gameState => ({
                        game: {
                            ...gameState.game,
                            active: false
                        }
                    }))
                    setLoadingState(false);
                    GetGame();
                }, 2000);
            } else if (res.status === 409) {
                alert("Već ste uneli odgovor na ovu igru");
                setLoadingState(false);
            }
            else if (res.status === 404) {
                alert("Ta igra je izbrisana");
                setLoadingState(false);
                history.push('/games');
            }
            else {
                alert("Nije uspelo");
                setLoadingState(false);
            }
        }
        else {
            alert("Niste uneli sve što je potrebno")
            setLoadingState(false)
        }
    }

    return (
        <>
            {
                successState
                    ? <SuccessAnimation setSuccessState={setSuccessState} />
                    : loadingState
                        ? <Loading />
                        : <div className="Game">
                            <h1>
                                {gameState.game.name}
                            </h1>
                            <p>{gameState.game.text}</p>
                            {
                                gameState.game.prevInteraction !== undefined
                                    ? <p id='prevInteraction'>{gameState.game.prevInteraction}</p>
                                    : null
                            }
                            {
                                gameState.game !== undefined
                                    ? <p id='prevInteraction'>{gameState.game.answer}</p>
                                    : null
                            }
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
                        </div>
            }
        </>
    );
}
