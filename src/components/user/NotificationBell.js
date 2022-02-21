import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserServices from '../../services/UserServices';

export default function NotificationBell({ user }) {

    const [notifCounterState, setNotifCounterState] = useState(0);
    const [updateCounterState, setUpdateCounterState] = useState(false);

    useEffect(() => {
        GetNotificationsCount();
    });

    useEffect(() => {
        GetNotificationsCount()
    }, [updateCounterState]);

    (async function () {
        setInterval(() => { setUpdateCounterState(!updateCounterState) }, 120000);
    })();

    console.log(notifCounterState)
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
        <Link to="/notifications">
            <div className="notificationDiv">
                <i className="fas fa-bell fa-lg"></i>
                {
                    notifCounterState !== 0
                        ? <small className='notificationCount'>{notifCounterState}</small>
                        : null
                }
            </div>
        </Link>
    )
}
