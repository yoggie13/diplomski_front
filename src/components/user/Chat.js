import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Loading from '../Loading';
import GameServices from '../../services/GameServices';
import '../../assets/styles/Chat.css'

export default function Chat({ id, userID }) {
    const [state, setstate] = useState({ renderChat: false, messages: [] });
    const [message, setMessageState] = useState({ messageText: "", playerOrOpponent: "Player" });
    const [loadingState, setLoadingState] = useState(true);

    const messagesEndRef = useRef(null);

    const handleClick = e => {
        e.preventDefault();

        setstate({ ...state, renderChat: !state.renderChat });
    }

    const scrollToBottom = (b) => {
        messagesEndRef.current.scrollIntoView({ behavior: b })
    }

    useEffect(() => {

        if (state.renderChat) {
            setLoadingState(true);
            GetMessages();
        }

    }, [state.renderChat])

    const GetMessages = async () => {
        var res = await GameServices.GetMessages(id, userID);

        if (res.status === 200) {
            res.json()
                .then(response => {
                    setstate({ ...state, messages: response.messages })
                    setLoadingState(false);
                    scrollToBottom("smooth");
                })
        }
        else {
            console.log("error");
            setLoadingState(false);
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        if (message.messageText === null || message.messageText.match(/^ *$/) !== null) {
            alert("Morate uneti tekst");
            return;
        }

        setLoadingState(true);

        var res = await GameServices.SendMessage(id, userID, {
            Message: message.messageText
        });

        if (res.status === 200) {
            var messagesFull = state.messages;
            messagesFull.push(message);
            setstate({ ...state, messages: messagesFull })
            setMessageState({ ...message, messageText: "" });
            setLoadingState(false);
            scrollToBottom("auto");
        }
        else {
            console.log('error');
            setLoadingState(false);
        }
    }

    const changeMessage = e => {
        e.preventDefault();

        if (e.target.value.endsWith('\n'))
            sendMessage(e);
        else
            setMessageState({ ...message, messageText: e.target.value });
    }

    return (
        <div className="Chat">
            {
                state.renderChat
                    ? <div id="chatOpened">
                        <div id="taskbar" onClick={handleClick}>
                            <small>Anonimni chat</small>
                            <i className="fas fa-times" onClick={handleClick}></i>
                        </div>
                        <hr></hr>
                        <div id="Messages">
                            {
                                loadingState
                                    ? <Loading />
                                    : state.messages.map((message, index) =>
                                        <p key={index + 1} id={`message${index}`} className={message.playerOrOpponent}>{message.messageText}</p>
                                    )
                            }
                            <div ref={messagesEndRef} />
                        </div>
                        <hr></hr>
                        <form id="sendMessage">
                            <textarea name="message" value={message.messageText} onChange={changeMessage}></textarea>
                            <i className="fas fa-paper-plane" onClick={sendMessage}></i>
                        </form>
                    </div>
                    : <i id="chatIcon" className="fas fa-comments fa-lg" onClick={handleClick}></i>
            }
        </div>
    )
}
