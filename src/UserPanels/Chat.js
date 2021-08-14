import React from 'react'
import { useState } from 'react';

export default function Chat({ messages }) {
    const [state, setstate] = useState({ renderChat: false, message: "", numberOfMessages: [1, 2] });

    const handleClick = e => {
        e.preventDefault();

        setstate({ renderChat: !state.renderChat });
    }
    const sendMessage = e => {
        e.preventDefault();


        setstate({ ...state, message: "" });
    }
    const changeMessage = e => {
        e.preventDefault();

        setstate({ ...state, message: e.target.value });
    }
    return (
        <div className="Chat">
            {
                state.renderChat === true
                    ? <div id="chatOpened">
                        <div id="taskbar">
                            <i className="fas fa-times" onClick={handleClick}></i>
                        </div>
                        <hr></hr>
                        <div id="Messages">
                            {
                                messages.map((message, index) =>
                                    <p key={index + 1} className={message.PlayerOrOpponent}>{message.MessageText}</p>
                                )
                            }
                        </div>
                        <hr></hr>
                        <form id="sendMessage">
                            <textarea name="message" value={state.message} onChange={changeMessage}></textarea>
                            <i className="fas fa-paper-plane" onClick={sendMessage}></i>
                        </form>
                    </div>
                    : <i id="chatIcon" className="fas fa-comments fa-lg" onClick={handleClick}></i>
            }
        </div>
    )
}
