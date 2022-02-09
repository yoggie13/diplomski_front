import React from 'react';
import Question from './Question';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../Loading';

export default function CreateQuiz() {

    let history = useHistory();
    var gameMainInfo = useLocation().state.gameMainInfo;
    const [loadingState, setLoadingState] = useState(false);

    const [questionsState, setQuestionsState] = useState({
        arr: [
            {
                ID: 1,
                show: true,
                Text: "",
                Type: null,
                Answers: [
                    {
                        ID: 1,
                        Text: "",
                        Right: false
                    }
                ],
                Points: 0,
                NegativePoints: false
            }
        ]
    })

    const saveQuiz = () => {
        gameMainInfo.Questions = questionsState.arr;

        setLoadingState(true);

        fetch(
            'http://localhost:46824/api/game/create',
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify({
                        "game": gameMainInfo,
                    })
            })
            .then(res => {
                if (res.status === 200) {
                    alert("Sačuvano");
                    localStorage.removeItem("Game");
                    return res.json();
                }
                else {
                    throw new Error();
                }
            })
            .then(response => {
                history.push('/allGames');
                setLoadingState(false);
            }).catch(error => {
                console.log(error);
                setLoadingState(false);
            })

    }
    const addNew = e => {
        e.preventDefault();
        var questions = questionsState.arr;

        questions.push({
            show: true,
            ID: questions.length + 1,
            Text: "",
            Type: null,
            Answers: [
                {
                    ID: 1,
                    Text: "",
                    Right: false
                }
            ],
            Points: 0,
            NegativePoints: false
        });

        changeShow(null, questions.length - 1)

        setQuestionsState({ ...questionsState, arr: questions });
    }

    const setPoints = (e, index) => {
        e.preventDefault();

        var questions = questionsState.arr;
        questions[index].Points = e.target.value;

        setQuestionsState({ ...questionsState, arr: questions });
    }

    const handleText = (e, index) => {
        e.preventDefault();

        var questions = questionsState.arr;
        questions[index].Text = e.target.value;

        setQuestionsState({ ...questionsState, arr: questions });
    }

    const changeShow = (e = null, index) => {
        if (e !== null)
            e.preventDefault();

        var questions = questionsState.arr;
        questions.forEach(question => question.show = false);

        questions[index].show = true;

        setQuestionsState({ ...questionsState, arr: questions });
    }

    const closeQuestion = (e, index) => {
        e.preventDefault()

        var questions = questionsState.arr;

        questions[index].show = false;

        setQuestionsState({ ...questionsState, arr: questions });
    }
    const updateNegative = (index, value) => {
        questionsState.arr[index].NegativePoints = value;
    }

    const updateAnswers = (index, answers) => {
        var questions = questionsState.arr;
        questions[index].Answers = answers;
        setQuestionsState({ ...questionsState, arr: questions });
    }
    const updateType = (e, index) => {
        var questions = questionsState.arr;
        questions[index].Type = e;

        setQuestionsState({ ...questionsState, arr: questions });
    }
    return (
        <div className='CreateQuiz'>
            <h1>Kreiranje kviza</h1>
            {
                loadingState
                    ? <Loading />
                    : <>
                        <form className='CreateQuizForm'>
                            {
                                questionsState.arr.map((question, index) =>
                                    question.show
                                        ? <Question
                                            question={question}
                                            index={index}
                                            handleText={handleText}
                                            closeQuestion={closeQuestion}
                                            setPoints={setPoints}
                                            updateAnswers={updateAnswers}
                                            updateNegative={updateNegative}
                                            updateType={updateType}
                                        />
                                        : <div className='ClosedQuestion' onClick={e => changeShow(e, index)}>
                                            <i className="fas fa-chevron-right"></i>
                                            <h2>{index + 1}. pitanje</h2>
                                        </div>
                                )
                            }
                        </form>
                        < i className="fas fa-plus fa-2x" id="CreateQuizIcon" onClick={e => addNew(e)} ></i>
                        <div className="ButtonsAlignRight">
                            <button id="createQuizButton" onClick={e => {
                                e.preventDefault();
                                saveQuiz();
                            }
                            }>Unesite kviz</button>
                        </div>
                    </>
            }
        </div>
    )
}
