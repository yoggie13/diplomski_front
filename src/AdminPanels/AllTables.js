import React from 'react'
import Scoreboard from '../Scoreboard';
import { useState } from 'react';

export default function AllTables() {
    const [state, setstate] = useState({ groupID: 1 });
    const handleNextClick = e => {
        e.preventDefault();

        setstate({ groupID: state.groupID + 1 });
    }
    return (
        <div className="AllTables">
            <Scoreboard group={state.groupID} />
            <div className="tableMover">
                <p>{state.groupID} od 12</p>
                <i className="fas fa-chevron-right" onClick={handleNextClick}></i>
            </div>
        </div>
    )
}
