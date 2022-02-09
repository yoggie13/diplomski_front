import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

export default function Notification({ user }) {
    const [loadingState, setLoadingState] = useState(false);
    const [notificationState, setNotificationState] = useState(false);

    useEffect(() => {
        setLoadingState(true);
        fetch(
            `http://localhost:46824/api/user/notifications/${user.id}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else
                    throw new Error();
            })
            .then(response => {
                setNotificationState(response);
                setLoadingState(false);
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            });
    }, []);

    return (
        loadingState
            ? <Loading />
            : notificationState !== false
                ? <div>
                    <h1>Obaveštenja</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Naslov</th>
                                <th>Tekst</th>
                                <th>Link do igre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                notificationState.map((notification, index) =>
                                    <tr key={index}>
                                        <td>{notification.subject}</td>
                                        <td>{notification.text}</td>
                                        <td id="center">
                                            <Link to={`game/${notification.gameID}`}>
                                                <i id={notification.gameID} className="fas fa-chevron-right"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                : <p>Trenutno nemate nikakvih notifikacija</p>
    )
}