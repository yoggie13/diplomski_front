import { Checkbox, Radio } from '@material-ui/core';
import React from 'react';
import '../../assets/styles/Quiz.css'

export default function Quiz({ quizState, getAnswersState, handleAnswersChange }) {

    const getInput = (type, id, answers, answer_id) => {
        if (type === 0)
            return <input type='text'
                value={getAnswersState()[id].answer_data.text}
                onChange={e => handleAnswersChange(e, id)}
            />
        else if (type === 1) {
            return answers.map(answer =>
                <div>
                    <Radio
                        id={answer.id}
                        value={answer.text}
                        checked={getAnswersState()[id].answer_data.answer_id === answer.id}
                        onClick={e => handleAnswersChange(e, id, answer.id)}
                    />
                    {answer.text}
                </div>
            )
        }
        else if (type === 2)
            return answers.map(answer =>
                <div>
                    <Checkbox
                        id={answer.id}
                        value={answer.text}
                        checked={getAnswersState()[id].answer_data.answers.some(a => a.answer_id === answer.id)}
                        onClick={e => handleAnswersChange(e, id, answer.id)}
                    />
                    {answer.text}
                </div>
            )

        return null
    }

    return (
        <div>
            {
                quizState.map((question, index) =>
                    <div className='QuizQuestion'>
                        <h3>{question.id + ". " + question.text}</h3>
                        <div className='ImageHolder'>
                            <img src={question.imageUrl} />
                        </div>
                        <div className='QuizInput'>
                            {getInput(question.type, index, question.answers)}
                        </div>
                        <small>Pitanje vredi: <b>{question.points} poena</b></small>
                        {
                            question.negativePoints
                                ? <>
                                    <br>
                                    </br>
                                    <small>*Pitanje ima negativne poene</small>
                                </>
                                : null
                        }
                    </div>
                )
            }
        </div >
    );
}
