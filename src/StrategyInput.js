import React from 'react'
import { useState } from 'react'
export default function StrategyInput({ player, changeRender }) {
    var numberOfStrategies = 1;
    const handleClick = e => {
        e.preventDefault();

        changeRender(player === 1 ? e : "rewards");
    }

    return (
        <div className="StrategyInput" id="firstplayerstrategies">
            <h2>Strategije {player === 1 ? "prvog" : "drugog"} igrača</h2>
            <label htmlFor={`${player}.${numberOfStrategies}`}>{numberOfStrategies}. strategija</label>
            <input type="text" id={`${player}.1`} />
            <i className="fas fa-plus"></i>
            <div className="pageMover">
                <p>{player === 1 ? "Pređi na sledećeg igrača" : "Pređi na unos isplata"}</p>
                <i className="fas fa-chevron-right fa-lg" onClick={handleClick}></i>
            </div>

        </div>
    )
}
