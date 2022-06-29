import { Checkbox, Radio } from '@material-ui/core';
import QuestionIconsArray from './QuestionIconsArray';
import '../../assets/styles/Answers.css'

export default function Answers({ getAnswerState, setAnswersState, getType, updateType }) {

    const handleChoiceCheck = (e) => {
        var answers = [...getAnswerState()];

        if (e === 0)
            answers.forEach(a => a.Right = true);
        else
            answers.forEach(a => a.Right = false);

        setAnswersState(answers)
        updateType(e);
    }

    const changeCheck = (e, index) => {
        e.preventDefault();
        var answers = [...getAnswerState()];

        if (getType() === 1) {
            answers.forEach(a => a.Right = false);
            answers[index].Right = true;
        }
        else if (getType() === 2) {
            answers[index].Right = !answers[index].Right
        }

        setAnswersState(answers)
    }

    const changeText = (e, index) => {
        e.preventDefault();

        var answers = [...getAnswerState()];
        answers[index].Text = e.target.value;

        setAnswersState(answers)
    }
    const deleteAnswer = (e, index) => {
        e.preventDefault();

        var answers = [...getAnswerState()];

        var removed = false;
        for (let i = 0; i < answers.length; i++) {
            if (i < index)
                continue;
            else if (removed)
                answers[i].ID--;
            else if (i === index && !removed) {
                answers.splice(i, 1);
                i--;
                removed = true;
            }
        }

        setAnswersState(answers)
    }
    const addNew = (e) => {
        e.preventDefault();

        var answers = [...getAnswerState()];
        answers.push(
            {
                ID: answers.length + 1,
                Text: "",
                Right: false
            })
        setAnswersState(answers)
    }

    return (
        <div className='Answers'>
            <QuestionIconsArray value={getType()} handleChoiceCheck={e => handleChoiceCheck(e)} />
            <table className='AnswersTable'>
                <thead>
                    <th id='center'>
                        Rb.
                    </th>
                    <th>
                        Odgovor
                    </th>
                    {
                        getType() === 1 || getType() === 2
                            ? <th id='center'>
                                Tačan?
                            </th>
                            : null
                    }
                </thead>
                <tbody>
                    {
                        getAnswerState().map((answer, index) =>
                            <tr>
                                <td id='center'>
                                    {answer.ID}.
                                </td>
                                <td>
                                    <input type='text' value={getAnswerState()[index].Text} onChange={e => changeText(e, index)} />
                                </td>
                                <td id='center'>
                                    {
                                        getType() === 1
                                            ? < Radio
                                                id={answer.id}
                                                key={index}
                                                checked={answer.Right}
                                                onClick={e => changeCheck(e, index)}
                                            />
                                            : getType() === 2
                                                ? <Checkbox
                                                    id={answer.id}
                                                    key={index}
                                                    checked={answer.Right}
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
