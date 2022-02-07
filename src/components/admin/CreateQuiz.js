import React from 'react';
import Question from './Question';
import { useState } from 'react';

export default function CreateQuiz() {
    const [questionsState, setQuestionsState] = useState({
        arr: [
            {
                show: true,
                text: "",
                answers: {
                    type: null,
                    arr: [
                        {
                            id: 1,
                            text: "",
                            right: false
                        }
                    ]
                },
                points: 0,
                negativePoints: false
            }
        ]
    })
    const addNew = e => {
        e.preventDefault();
        var questions = questionsState.arr;

        questions.push({
            show: true,
            text: "",
            answers: {
                type: null,
                arr: [
                    {
                        id: 1,
                        text: "",
                        right: false
                    }
                ]
            },
            points: 0,
            negativePoints: false
        });

        changeShow(null, questions.length - 1)

        setQuestionsState({ ...questionsState, arr: questions });
    }

    const setPoints = (e, index) => {
        e.preventDefault();

        var questions = questionsState.arr;
        questions[index].points = e.target.value;

        setQuestionsState({ ...questionsState, arr: questions });
    }

    const handleText = (e, index) => {
        e.preventDefault();

        var questions = questionsState.arr;
        questions[index].text = e.target.value;

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

        setQuestionsState({ ...questionsState, questions });
    }
    const updateNegative = (index, value) => {
        questionsState.arr[index].negativePoints = value;
    }

    const updateAnswers = (index, answers) => {
        var questions = questionsState.arr;
        questions[index].answers = answers;
        setQuestionsState({ ...questionsState, arr: questions });
    }
    return (
        <div className='CreateQuiz'>
            <h1>Kreiranje kviza</h1>
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
                    console.log(questionsState)
                }
                }>Unesite kviz</button>
            </div>
        </div>
    )
}
