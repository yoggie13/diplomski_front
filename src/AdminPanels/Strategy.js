import React from 'react'

export default function Strategy({ player, numberOfStrategies, addNew }) {
    return (
        <div className="Strategy">
            <label htmlFor={`${player}.${numberOfStrategies}`}>{numberOfStrategies}. strategija</label>
            <input type="text" id={`${player}.${numberOfStrategies}`} />
            <i className="fas fa-plus" onClick={addNew}></i>
        </div>
    )
}
