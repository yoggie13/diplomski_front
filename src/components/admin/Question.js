import React, { useRef, useState } from 'react';
import Answers from './Answers';
import { Checkbox } from '@material-ui/core';
import { useEffect } from 'react';

export default function Question({ question, index, handleText, closeQuestion, setPoints, updateAnswers, updateNegative, updateType }) {
    const [answersState, setAnswersState] = useState(question.Answers);

    const getAnswerState = () => {
        return answersState;
    }
    const [negativePoints, setNegativePoints] = useState(question.NegativePoints);

    useEffect(() => {
        updateAnswers(index, answersState);
    }, [answersState])

    useEffect(() => {
        updateNegative(index, negativePoints);
    }, [negativePoints])

    const getType = () => {
        return question.Type;
    }
    const updateQuestionType = e => {
        updateType(e, index);
    }

    const hiddenFileInput = useRef(null);
    const handleUploadClick = (e) => {
        hiddenFileInput.current.click();
    }
    const handleUpload = (e) => {
        console.log(e.target.files[0]);
    }

    return (
        <div className='Question'>
            <div className='QuestionHeader' onClick={e => {
                closeQuestion(e, index)
            }
            }>
                <i className="fas fa-chevron-right" id='chevron-down' ></i>
                <h2>{index + 1}. pitanje</h2>
            </div>
            <div className='QuestionBody'>
                {/* <i class="far fa-image fa-lg" id='image'></i> */}
                <label htmlFor='question-text'>Unesite tekst</label>
                <textarea id='question-text' value={question.Text} onChange={e => handleText(e, index)} />
                {/* <i class="fas fa-image" onClick={e => handleUploadClick(e)}></i> */}
                <input
                    // id='file-input'
                    type='file'
                // accept='image/*'
                // ref={hiddenFileInput}
                // onChange={handleUpload}
                />
                <Answers
                    getAnswerState={getAnswerState}
                    setAnswersState={setAnswersState}
                    getType={getType}
                    updateType={updateQuestionType} />
                <div id='question-positive-points'>
                    {
                        answersState === 'multi-choice'
                            ? <p>Koliko poena nose tačni odgovori</p>
                            : <p>Koliko poena nosi tačan odgovor</p>
                    }
                    <input type='number' value={question.Points} onChange={e => setPoints(e, index)} id='positive-points'></input>
                </div>
                <div id='question-negative-points'>
                    Da li pitanje ima negativne poene?
                    <Checkbox
                        id={'negative-points'}
                        checked={negativePoints}
                        name={'negative-points'}
                        onClick={e => {
                            e.preventDefault();
                            setNegativePoints(!negativePoints);
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
