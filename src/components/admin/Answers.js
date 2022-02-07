import { Checkbox, Radio } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import QuestionIconsArray from './QuestionIconsArray';

export default function Answers({ getAnswerState, setAnswersState }) {

    const handleChoiceCheck = (e) => {
        var answers = getAnswerState().arr;
        answers.forEach(a => a.right = false);

        setAnswersState({ ...getAnswerState(), type: e, arr: answers })
    }

    const changeCheck = (e, index) => {
        e.preventDefault();
        var answers = getAnswerState().arr;

        if (getAnswerState().type === 'single-choice') {
            answers.forEach(a => a.right = false);
            answers[index].right = true;
        }
        else if (getAnswerState().type === 'multi-choice') {
            answers[index].right = !answers[index].right
        }

        setAnswersState({ ...getAnswerState(), arr: answers })
    }

    const changeText = (e, index) => {
        e.preventDefault();

        var answers = getAnswerState().arr;
        answers[index].text = e.target.value;

        setAnswersState({ ...getAnswerState(), arr: answers });
    }
    const deleteAnswer = (e, index) => {
        e.preventDefault();

        var answers = getAnswerState().arr;

        var removed = false
        for (let i = 0; i < answers.length; i++) {
            if (i < index)
                continue;
            else if (removed)
                answers[i].id--;
            else if (i === index && !removed) {
                answers.splice(i, 1);
                i--;
                removed = true;
            }
        }

        setAnswersState({ ...getAnswerState(), arr: answers });
    }
    const addNew = (e) => {
        e.preventDefault();

        var answers = getAnswerState().arr;

        answers.push(
            {
                id: answers.length + 1,
                text: "",
                right: false
            })
        setAnswersState({ ...getAnswerState(), arr: answers });

    }

    return (
        <div className='Answers'>
            <QuestionIconsArray value={getAnswerState().type} handleChoiceCheck={e => handleChoiceCheck(e)} />
            <table className='AnswersTable'>
                <thead>
                    <th id='center'>
                        Rb.
                    </th>
                    <th>
                        Odgovor
                    </th>
                    {
                        getAnswerState().type === 'single-choice' || getAnswerState().type === 'multi-choice'
                            ? <th id='center'>
                                Tačan?
                            </th>
                            : null
                    }
                </thead>
                <tbody>
                    {
                        getAnswerState().arr.map((answer, index) =>
                            <tr>
                                <td id='center'>
                                    {answer.id}.
                                </td>
                                <td>
                                    <input type='text' value={getAnswerState().arr[index].text} onChange={e => changeText(e, index)} />
                                </td>
                                <td id='center'>
                                    {
                                        getAnswerState().type === 'single-choice'
                                            ? < Radio
                                                id={answer.id}
                                                key={index}
                                                checked={answer.right}
                                                onClick={e => changeCheck(e, index)}
                                            />
                                            : getAnswerState().type === 'multi-choice'
                                                ? <Checkbox
                                                    id={answer.id}
                                                    key={index}
                                                    checked={answer.right}
                                                    onClick={e => changeCheck(e, index)}
                                                />
                                                : null
                                    }
                                </td>
                                <td><i class="fas fa-times" onClick={e => deleteAnswer(e, index)}></i></td>
                            </tr>
                        )}
                </tbody>
                <tfoot>
                    <tr>
                        <td id="center" colSpan={100}>
                            < i className="fas fa-plus" onClick={e => addNew(e)} ></i>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div >
    );
}
