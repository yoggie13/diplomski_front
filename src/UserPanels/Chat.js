import React from 'react'
import { useState } from 'react';
import Loading from '../Loading';

export default function Chat({ messages, id, userID }) {
    const [state, setstate] = useState({ renderChat: false, message: { MessageText: "", PlayerOrOpponent: "Player" } });
    const [message, setMessageState] = useState({ MessageText: "", PlayerOrOpponent: "Player" });
    const [loadingState, setLoadingState] = useState(true);


    const handleClick = e => {
        e.preventDefault();

        setstate({ renderChat: !state.renderChat });
    }
    const sendMessage = e => {
        e.preventDefault();

        setLoadingState(true);

        fetch(
            `https://diplomskiapi20210828005205.azurewebsites.net/api/game/message/${id}/${userID}`,
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
                setLoadingState(false)
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            });
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
                                    <p key={index + 1} className={message.PlayerOrOpponent}>{message.messageText}</p>
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
