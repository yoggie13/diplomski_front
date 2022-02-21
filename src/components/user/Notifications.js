import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserServices from '../../services/UserServices';
import Loading from '../Loading';

export default function Notification({ user }) {
    const [loadingState, setLoadingState] = useState(false);
    const [notificationState, setNotificationState] = useState(false);

    useEffect(() => {
        setLoadingState(true);
        GetNotifications();
    }, []);

    var GetNotifications = async () => {
        var res = await UserServices.GetNotifications(user.id);

        if (res.status === 200) {
            res.json()
                .then(response => {
                    setNotificationState(response);
                    setLoadingState(false);
                })
        }
        else {
            console.log("error");
            setLoadingState(false);
        }
    }

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