import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserServices from '../../services/UserServices';
import Notifications from './Notifications';

export default function NotificationBell({ user, openNotifications }) {

    const [notifCounterState, setNotifCounterState] = useState(0);
    const [updateCounterState, setUpdateCounterState] = useState(true);

    useEffect(() => {
        GetNotificationsCount()
    }, [updateCounterState]);

    (async function () {
        setInterval(() => { setUpdateCounterState(!updateCounterState) }, 300000);
    })();

    const GetNotificationsCount = async () => {
        var res = await UserServices.GetNotificationsCount(user.id);

        if (res.status === 200) {
            res.json()
                .then(response => {
                    setNotifCounterState(response);
                })
        }
        else
            console.log("error");
    }

    return (
        <>
            {
                openNotifications
                    ? <Notifications user={user} />
                    : null
            }
            <div className="notificationDiv">
                <i className="fas fa-bell fa-lg"></i>
                {
                    notifCounterState !== 0
                        ? <small className='notificationCount'>{notifCounterState}</small>
                        : null
                }
            </div>

        </>
    )
}
