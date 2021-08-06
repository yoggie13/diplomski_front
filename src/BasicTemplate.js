import React from 'react';
import ChangePassword from './ChangePassword';
import Header from './Header';
import Login from './Login';

export default function BasicTemplate({ LoginLogic }) {
    return (
        <div className="BasicTemplate">
            <Header />
            <Login LoginLogic={LoginLogic} />
        </div>
    )
}
