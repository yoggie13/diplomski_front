import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCheckCircle, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

export default function QuestionIconsArray({ value, handleChoiceCheck }) {

  const options = [
    { value: "text", label: <>Tekst <FontAwesomeIcon icon={faKeyboard} id='text' /></> },
    { value: "single-choice", label: <>Jedan odgovor <FontAwesomeIcon icon={faCheckCircle} /></> },
    { value: "multi-choice", label: <>Više odgovora <FontAwesomeIcon icon={faCheckSquare} /></> },
  ]
  const getValue = () => {
    if (value === null)
      return undefined;

    return options.find(o => o.value === value);
  }
  return <div className='QuestionIconsArray'>
    <Select
      placeholder="Tip odgovora:"
      options={options}
      onChange={e => handleChoiceCheck(e.value)}
      value={getValue()}
    />
  </div>;
}
