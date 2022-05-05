import React from 'react'
import { Link } from 'react-router-dom'
import NotificationBell from './user/NotificationBell'

export default function PanelHeader({ user, openNotifications }) {
    return (
        <div className='PanelHeader'>
            <NotificationBell user={user} openNotifications={openNotifications} />
            <Link to="/profile">
                <i className="fas fa-user-circle fa-2x"></i>
            </Link>
        </div>
    )
}
