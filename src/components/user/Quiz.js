import { Checkbox, Radio } from '@material-ui/core';
import React from 'react';

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
                    <div>
                        <h3>{question.id}</h3>
                        <p>{question.text}</p>
                        <div className='QuizInput'>
                            {getInput(question.type, index, question.answers)}
                        </div>
                    </div>
                )
            }
        </div >
    );
}
