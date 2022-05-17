import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserServices from '../../services/UserServices';
import Loading from '../Loading';

export default function Notifications({ user }) {
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

    function formatDate(dueDate) {
        var d = new Date(dueDate);
        return d.toLocaleDateString('sr');
    }

    return (
        <div className='Notifications'>
            {
                loadingState
                    ? <Loading />
                    : notificationState !== false
                        ? notificationState.map((notification, index) =>
                            <Link to={`/game/${notification.gameID}`}>
                                <div key={index}>
                                    <h4>{notification.subject}</h4>
                                    <p>{notification.text}</p>
                                    <small>{formatDate(notification.date)}</small>
                                </div>
                            </Link>
                        )
                        : <p>Trenutno nemate nikakvih notifikacija</p>
            }
        </div>
    )
}