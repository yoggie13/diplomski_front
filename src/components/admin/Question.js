import React, { useRef, useState } from 'react';
import { Checkbox } from '@material-ui/core';
import { useEffect } from 'react';
import Answers from './Answers';
import Dropzone from '../Dropzone';
import '../../assets/styles/Question.css'

export default function Question({ question, index, handleText, closeQuestion, setPoints, updateAnswers, updateNegative, updateType, updateImage }) {
    const [answersState, setAnswersState] = useState(question.Answers);
    const [showUploadImage, setShowUploadImage] = useState(question.ImageUrl === null ? false : true);

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
                <label htmlFor='question-text'>Unesite tekst</label>
                <textarea id='question-text' value={question.Text} onChange={e => handleText(e, index)} />
                {
                    showUploadImage
                        ? <Dropzone
                            index={index}
                            setImage={updateImage}
                            setShowUploadImageState={setShowUploadImage}
                            ImageName={question.ImageName}
                        />
                        : <div className='ImageButton' onClick={e => {
                            e.preventDefault();
                            setShowUploadImage(true);
                        }}>
                            <p>Dodaj sliku</p>
                            <i className="fas fa-image fa-lg" ></i>
                        </div>
                }
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
