import React, { useEffect, useState } from 'react'
import '../../assets/styles/Attendance.css'
import AdminServices from '../../services/AdminServices';
import CountdownTimer from './CountdownTimer';

export default function Attendance() {
    const [attendanceList, setAttendanceList] = useState([]);
    const [newAttendance, setNewAttendance] = useState("");
    const [attendanceInfo, setAttendanceInfo] = useState();
    const [timer, setTimer] = useState(2);
    const [timerInterval, setTimerInterval] = useState();
    const [QR, setQR] = useState();

    const generateNewAttendance = async (e) => {
        e.preventDefault();
        if (!fieldInvalid(newAttendance)) {
            // var res = await AdminServices.GenerateNewAttendance(newAttendance);

            // if (res.status === 200) {
            //     res.json()
            //         .then(response => {
            //             console.log(response)
            //         })
            // } else {
            //     console.log(res);
            // }
            var att = {
                id: 1,
                name: "Termin 1",
                key: "123456"
            }
            setAttendanceInfo({
                id: 1,
                name: "Termin 1",
                key: "123456"
            })

            startTimer();
        } else {
            alert("Niste popunuili naziv termina")
        }
    }
    const fieldInvalid = (field) => {
        return field === "" || field === null || field === undefined
    }
    const startTimer = () => {
        setTimerInterval(setInterval(() => {
            if (timer > 0)
                setTimer((timer) => timer - 1)
        }, 1000));
    }
    useEffect(() => {
        if (timer <= 0 && timerInterval !== undefined)
            clearInterval(timerInterval);
    }, [timer, timerInterval])

    return (
        <div className='Attendance'>
            <h1>Registrovanje prisustva</h1>
            {
                attendanceInfo === undefined || attendanceInfo === null
                    ? <form className='AttendanceForm'>
                        <label htmlFor='attendance-name'>Uneti naziv termina: </label>
                        <input id='attendance-name' type='text'
                            value={newAttendance.Name}
                            onChange={e => {
                                e.preventDefault();
                                setNewAttendance(e.target.value)
                            }} />
                        <p id='attendance-date'>{new Date(Date.now()).toLocaleDateString("sr-RS")}</p>
                        <button onClick={e => generateNewAttendance(e)}>Kreiraj čas</button>
                    </form>
                    : <div className='AttendanceInfo'>
                        <div>
                            <p>{attendanceInfo.name}</p>
                            <p>{attendanceInfo.key}</p>
                            {
                                timer > 0
                                    ? <CountdownTimer timerValue={timer} />
                                    : <p>Vreme je isteklo!</p>
                            }
                        </div>
                        <img src={AdminServices.GetQRForAttendance(attendanceInfo.id, attendanceInfo.key)} />
                    </div>
            }
            <table>
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Naziv</th>
                        <th>Broj studenata</th>
                        <th>Prijava</th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                </tbody>
            </table>
        </div >
    )
}
