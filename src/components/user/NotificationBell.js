import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NotificationBell({ user }) {

    const [notifCounterState, setNotifCounterState] = useState(0);
    const [updateCounterState, setUpdateCounterState] = useState(false);

    useEffect(() => {
        callApi();
    });

    useEffect(() => {
        callApi()
    }, [updateCounterState]);

    (async function () {
        setInterval(() => { setUpdateCounterState(!updateCounterState) }, 120000);
    })();

    const callApi = () => {
        fetch(
            `http://localhost:46824/api/user/countnotif/${user.id}`,
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
                setNotifCounterState(response);
            })
            .catch(error => {
                console.log(error);
            });
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
