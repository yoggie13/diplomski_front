import React from 'react'

export default function CountdownTimer({ timerValue }) {

    const formatTimer = () => {
        var m = parseInt(Math.floor(timerValue / 60));
        var s = parseInt(Math.floor(timerValue % 60));

        if (m <= 0 && s <= 0)
            return "Vreme je isteklo!"

        return m + "min " + s + "s";
    }
    return (
        <div>
            <p>{formatTimer()}</p>
        </div>
    )
}
