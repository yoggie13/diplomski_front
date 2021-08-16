import React from 'react'
import { useState } from 'react'

export default function Strategy({ player, numberOfStrategies, addNew }) {
    const [state, setState] = useState({ strategy: "" })
    return (
        <div className="Strategy">
            <label htmlFor={`${player}.${numberOfStrategies}`}>{numberOfStrategies}. strategija</label>
            <input type="text" id={`${player}.${numberOfStrategies}`} value={state.strategy} onChange={e => setState({ ...state, strategy: e.target.value })} />
            <i className="fas fa-plus" onClick={addNew}></i>
        </div>
    )
}
