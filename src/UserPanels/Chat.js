import React from 'react'

export default function Chat() {
    return (
        <div className="Chat">
            <div id="Messages">
                <p className="opponent">Prva poruka</p>
                <p className="player">Druga poruka</p>
            </div>
            <form id="sendMessage">
                <input type="text" />
                <input type="submit" value="Pošalji" />
            </form>
        </div>
    )
}
