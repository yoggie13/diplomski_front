import React from 'react'
import { useState, useEffect } from 'react'
import AdminServices from '../services/AdminServices';
import UserServices from '../services/UserServices';
import Loading from './Loading';

export default function Scoreboard({ admin = false, userID = null, group, handleLoading }) {

    const [studentsState, setStudentsState] = useState([])
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        document.title = "Tabela | Teorija igara"
    }, []);

    useEffect(() => {
        setLoadingState(true);
        GetScoreboard();
    }, [group])

    const GetScoreboard = async () => {
        var res;

        if (admin)
            res = await AdminServices.GetScoreboard(group);
        else
            res = await UserServices.GetScoreboard(userID);

        if (res.status === 200) {
            res.json()
                .then(response => {
                    setStudentsState(response);
                    setLoadingState(false);
                })
        }

        else {
            console.log("error")
            setLoadingState(false);
        }
    }
    return (
        <div className="Scoreboard">
            {
                loadingState
                    ? <Loading />
                    : <>
                        <h1>Scoreboard</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mesto</th>
                                    <th id='left'>Indeks</th>
                                    <th id='left'>Ime i prezime</th>
                                    <th>Broj poena</th>
                                    <th>Odigranih igara</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentsState.map((student, index) =>
                                        <tr key={index + 1}>
                                            <td>{index + 1}.</td>
                                            <td id='left'>{student.studentID}</td>
                                            <td id='left'>{student.studentName}</td>
                                            <td>{student.pointsTotal}</td>
                                            <td>{student.countTotal}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </>
            }
        </div>
    )
}