import React from 'react'
import { useState, useEffect } from 'react';
import Loading from '../Loading';

export default function Chat({ id, userID }) {
    const [state, setstate] = useState({ renderChat: false, messages: [] });
    const [message, setMessageState] = useState({ MessageText: "", PlayerOrOpponent: "Player" });
    const [loadingState, setLoadingState] = useState(true);


    const handleClick = e => {
        e.preventDefault();

        setstate({ renderChat: !state.renderChat });
    }

    useEffect(() => {

        if (state.renderChat === true) {
            setLoadingState(true);

            fetch(
                `http://localhost:46824/api/game/${id}/${userID}/messages`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(res => res.json())
                .then(response => {
                    setstate({ ...state, messages: response.messages })
                    setLoadingState(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoadingState(false);
                });
        }

    }, [state.renderChat])
    const sendMessage = e => {
        e.preventDefault();

        setLoadingState(true);

        fetch(
            `https://diplomskiapi20210828140836.azurewebsites.net/api/game/message/${id}/${userID}`,
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
                if (res.status == 200) {
                    var messagesFull = state.messages;
                    messagesFull.push(message);
                    setstate({ ...state, messages: messagesFull })
                    setMessageState({ ...message, MessageText: "" });
                    setLoadingState(false)
                }
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
                                loadingState === false
                                    ? state.messages.map((message, index) =>
                                        <p key={index + 1} className={message.playerOrOpponent}>{message.messageText}</p>
                                    )
                                    : <Loading />
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
