import React from 'react'
import StrategyInput from './StrategyInput';
import { useState } from 'react';
import Rewards from './Rewards';


export default function CreateGame({ changeRender }) {
    const [state, setstate] = useState({ typeOfGame: 2, page: 1 });

    const handleClick = (e, number) => {
        console.log(e)
        if (typeof (e) != "number" && typeof (e) != "string") {
            e.preventDefault();
            var newPage = state.page + number;
        }
        else if (typeof (e) === "string") {
            changeRender(e);
        }
        else
            newPage = state.page + e;

        setstate({ page: newPage });
    }

    return (
        <div className="CreateGame">
            <h1>Kreiraj igru</h1>
            <form className="CreateGameForm">
                {console.log(state.page)}

                {
                    state.page === 1
                        ? <>
                            <label htmlFor="typeofgame">Tip igre</label>
                            <select id="typeofgame">
                                <option name="number" id="1" value="1">The p-Beauty contest</option>
                                <option name="number" id="2" value="2">Dilema zatvorenika</option>
                            </select>
                            <label htmlFor="gamename">Naziv igre</label>
                            <input id="gamename" type="text" />
                            <label htmlFor="gamedescription">Opis igre</label>
                            <textarea id="gamedescription"></textarea>
                            <label htmlFor="noofplayers">Broj igrača</label>
                            <select id="noofplayers">
                                <option name="number" id="1" value="1">1</option>
                                <option name="number" id="2" value="2">2</option>
                                <option name="number" id="10" value="10">10</option>
                            </select>
                            <div className="pageMover">
                                <p>Nastavi sa unosom strategija</p>
                                <i className="fas fa-chevron-right fa-lg" onClick={(event) => handleClick(event, 1)}></i>
                            </div>
                        </>
                        : state.page === 2
                            ? state.typeOfGame < 3
                                ? <>
                                    <label htmlFor="range1">Od</label>
                                    <input id="range1" type="number" />
                                    <label htmlFor="range2">Do</label>
                                    <input id="range2" type="number" />
                                </>
                                : <StrategyInput player={1} changeRender={handleClick} />
                            : state.page === 3
                                ? <StrategyInput player={2} changeRender={handleClick} />
                                : null
                }
            </form>
        </div >
    )
}
