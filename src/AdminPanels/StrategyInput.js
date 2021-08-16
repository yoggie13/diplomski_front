import React from 'react'
import { useState } from 'react'
import Strategy from './Strategy';
export default function StrategyInput({ player, changeRender }) {
    const [state, setState] = useState({ numberOfStrategies: [1] });
    const handleNextClick = (e, number) => {
        e.preventDefault();

        if (state.player === 1) {
            if (localStorage.getItem("firstStrategies") === null)
                setState({ numberOfStrategies: [1] });
        }
        else if (state.player === 2) {
            if (localStorage.getItem("secondStrategies") === null)
                setState({ numberOfStrategies: [1] });
        }
        changeRender(player === 1 ? number : "rewards");
    }
    const handlePreviousClick = (e, number) => {
        e.preventDefault();

        if (state.player === 1) {
            if (localStorage.getItem("firstStrategies") === null)
                setState({ numberOfStrategies: [1] });
        }
        else if (state.player === 2) {
            if (localStorage.getItem("secondStrategies") === null)
                setState({ numberOfStrategies: [1] });
        }

        changeRender(-1);
    }
    const addNew = e => {
        e.preventDefault();
        var newNumber = state.numberOfStrategies;
        newNumber.push(newNumber.length + 1);

        setState({ numberOfStrategies: newNumber });
    }

    return (
        <div className="StrategyInput" id="firstplayerstrategies">
            <h2>Strategije {player === 1 ? "prvog" : "drugog"} igrača</h2>
            {
                state.numberOfStrategies.map((number) =>
                    <Strategy key={number} player={player} numberOfStrategies={number} addNew={addNew} />)
            }
            <div className="pageMover">
                <i className="fas fa-chevron-right fa-lg" id="chevron-left" onClick={(event) => handlePreviousClick(event, -1)}></i>
                <div className="next">
                    <p>{player === 1 ? "Pređi na sledećeg igrača" : "Pređi na unos isplata"}</p>
                    <i className="fas fa-chevron-right fa-lg" onClick={(event) => handleNextClick(event, 1)}></i>
                </div>
            </div>
        </div>
    )
}
