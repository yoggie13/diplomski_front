import React from 'react';
import { useEffect } from 'react';
import successGif from '../assets/successv3.gif'
import '../assets/styles/Success.css'

export default function SuccessAnimation({ setSuccessState }) {

    useEffect(() => {
        setTimeout(() => {
            setSuccessState(false)
        }, 2000);
    }, [])
    return (
        <div className='Success'>
            <img src={successGif} />
        </div>
    )
}
