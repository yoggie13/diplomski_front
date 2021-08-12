import React from 'react'
import { useState } from 'react'
export default function StrategyInput({ player }) {
    var numberOfStrategies = 1;
    return (
        <div className="StrategyInput" id="firstplayerstrategies">
            <h2>Strategije {player === 1 ? "prvog" : "drugog"} igrača</h2>
            <label htmlFor={`${player}.${numberOfStrategies}`}>{numberOfStrategies}. strategija</label>
            <input type="text" id={`${player}.1`} />
            <i className="fas fa-plus"></i>
            <div className="pageMover">
                <p>Pređi na sledećeg igrača</p>
                <i className="fas fa-chevron-right fa-lg"></i>
            </div>

        </div>
    )
}
