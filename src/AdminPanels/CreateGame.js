import React from 'react'
import StrategyInput from '../StrategyInput';
import { useState } from 'react';

export default function CreateGame() {
    const handleNextClick = e => {
        e.preventDefault();
        return;
    }
    return (
        <div className="CreateGame">
            <h1>Kreiraj igru</h1>
            <form className="CreateGameForm">
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
                    <i className="fas fa-chevron-right fa-lg" onClick={handleNextClick}></i>
                </div>
                <StrategyInput player={1} />
                <StrategyInput player={2} />
            </form>
        </div >
    )
}
