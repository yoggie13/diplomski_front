import React from 'react';
import Question from './Question';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../Loading';
import GameServices from '../../services/GameServices.js'
import SuccessAnimation from '../SuccessAnimation';

export default function CreateQuiz() {

    let history = useHistory();
    var loc = useLocation()
    var gameMainInfo = loc.state.gameMainInfo;

    const getQuestions = () => {
        if (loc.state.questions !== undefined && loc.state.questions !== null)
            return loc.state.questions

        return {
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
                    ImageUrl: null,
                    ImageName: null,
                    Points: 0,
                    NegativePoints: false
                }
            ]
        }
    }
    const [loadingState, setLoadingState] = useState(false);
    const [successState, setSuccessState] = useState(false);
    const [questionsState, setQuestionsState] = useState(getQuestions())
    const fieldInvalid = (field) => {
        return field === "" || field === null || field === undefined
    }
    const arrayInvalid = (arr) => {
        return arr === undefined || arr === null || arr.length <= 0
    }
    const fieldsValid = () => {
        var Exception = {}
        try {
            questionsState.arr.forEach(question => {
                if (fieldInvalid(question.ID) || fieldInvalid(question.Text) || fieldInvalid(question.Type)
                    || fieldInvalid(question.Points) || fieldInvalid(question.NegativePoints) || arrayInvalid(question.Answers))
                    throw Exception;
                question.Answers.forEach(answer => {
                    if (fieldInvalid(answer.ID) || fieldInvalid(answer.Text) || fieldInvalid(answer.Right))
                        throw Exception;
                })
            })
        }
        catch {
            return false;
        }
        return true;
    }

    const saveQuiz = async () => {
        setLoadingState(true);

        if (fieldsValid()) {
            gameMainInfo.Questions = questionsState.arr;

            var res = await GameServices.InsertGame({
                "game": gameMainInfo,
            })

            if (res.status === 200) {
                setSuccessState(true)
                setTimeout(() => history.push('/allGames'), 2000)
                setLoadingState(false);
            }
            else {
                throw new Error();
            }
        }
        else {
            alert("Niste popunili sve što treba");
        }
        setLoadingState(false);
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
            ImageUrl: null,
            ImageName: null,
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
    const updateNegative = (index, value = false) => {
        questionsState.arr[index].NegativePoints = value;
    }


    const updateImage = (index, image) => {

        var questions = questionsState.arr;

        if (image === null) {
            questions[index].ImageUrl = null;
        }
        else {
            questions[index].ImageUrl = image.url;
            questions[index].ImageName = image.name;
        }
        setQuestionsState({ ...questionsState, arr: questions });
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
    const handlePreviousPage = (e) => {
        e.preventDefault();
        history.push('create', { gameMainInfo: gameMainInfo, questions: questionsState });
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
                                            updateImage={updateImage}
                                        />
                                        : <div className='ClosedQuestion' onClick={e => changeShow(e, index)}>
                                            <i className="fas fa-chevron-right"></i>
                                            <h2>{index + 1}. pitanje</h2>
                                        </div>
                                )
                            }
                        </form>
                        < i className="fas fa-plus fa-2x" id="CreateQuizIcon" onClick={e => addNew(e)} ></i>
                        < div className="pageMover">
                            <div id="back">
                                <i className="fas fa-chevron-right fa-lg" id="chevron-left" onClick={e => handlePreviousPage(e)}></i>
                                <p>Povratak na unos osnovnih podataka</p>
                            </div>
                            <div id="forward">
                                <button id="createQuizButton" onClick={e => {
                                    e.preventDefault();
                                    saveQuiz();
                                }
                                }>Unesite kviz</button>
                            </div >
                        </div >
                    </>
            }
            {
                successState
                    ? <SuccessAnimation setSuccessState={setSuccessState} />
                    : null
            }
        </div>
    )
}
