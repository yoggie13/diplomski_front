import React from 'react'
import { useState } from 'react';

export default function Chat({ messages, id, userID }) {
    const [state, setstate] = useState({ renderChat: false, message: { MessageText: "", PlayerOrOpponent: "Player" } });
    const [message, setMessageState] = useState({ MessageText: "", PlayerOrOpponent: "Player" });

    const handleClick = e => {
        e.preventDefault();

        setstate({ renderChat: !state.renderChat });
    }
    const sendMessage = e => {
        e.preventDefault();

        fetch(
            `http://localhost:46824/api/game/message/${id}/${userID}`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Message: message.MessageText
                })
            })
            .then(res => {
                if (res.status == 200)
                    messages.push(message);
                setMessageState({ ...message, MessageText: "" });
            })
            .catch(error => {
                console.log(error)
            }
            );
    }


    const changeMessage = e => {
        e.preventDefault();

        setMessageState({ ...message, MessageText: e.target.value });
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
                            <textarea name="message" value={message.MessageText} onChange={changeMessage}></textarea>
                            <i className="fas fa-paper-plane" onClick={sendMessage}></i>
                        </form>
                    </div>
                    : <i id="chatIcon" className="fas fa-comments fa-lg" onClick={handleClick}></i>
            }
        </div>
    )
}
