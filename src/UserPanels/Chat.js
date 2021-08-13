import React from 'react'
import { useState } from 'react';

export default function Chat() {
    const [state, setstate] = useState({ renderChat: false });

    const handleClick = e => {
        e.preventDefault();

        setstate({ renderChat: !state.renderChat });
    }
    return (
        <div className="Chat">
            {
                state.renderChat === true
                    ? <div id="chatOpened">
                        <div id="taskbar">
                            <i class="fas fa-times" onClick={handleClick}></i>
                        </div>
                        <hr></hr>
                        <div id="Messages">
                            <p className="opponent">Ovo je prva poruka od strane protivnika koji preti baš opasno</p>
                            <p className="player">Ovo je prva poruka od našeg igrača koji se strahovito brani i zadaje kontra udarac</p>
                        </div>
                        <hr></hr>
                        <form id="sendMessage">
                            <textarea></textarea>
                            <i className="fas fa-paper-plane"></i>
                        </form>
                    </div>
                    : <i id="chatIcon" class="fas fa-comments fa-lg" onClick={handleClick}></i>
            }
        </div>
    )
}
