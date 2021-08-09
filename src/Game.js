import React from 'react'

export default function Game() {
    return (
        <div className="Game">

            <h1>
                Dilema zatvorenika
            </h1>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <form className="PlayGameForm">
                <label htmlFor="1">A</label>
                <input type="radio" id="1" name="Strategy" value="A"></input>
                <label htmlFor="2">B</label>
                <input type="radio" id="2" name="Strategy" value="B"></input>
                <input type="submit" value="Odigraj"></input>
            </form>
        </div>
    );
}
