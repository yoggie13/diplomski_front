import React from 'react'
import { useState, useEffect } from 'react'
import Loading from './Loading';

export default function Scoreboard({ admin = false, userID = null, group, handleLoading }) {

    const [state, setState] = useState({ students: [], admin: admin })
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        document.title = "Tabela | Teorija igara"
    }, []);

    useEffect(() => {
        setLoadingState(true);
        if (state.admin === false) {

            fetch(
                `https://teorijaigaradiplomski.azurewebsites.net/api/students/scoreboard/${userID}`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(res => res.json())
                .then(response => {
                    setState({
                        students: response
                    });
                    setLoadingState(false);

                })
                .catch(error => {
                    console.log(error)
                    setLoadingState(false);

                })
        }
        else {

            fetch(
                `https://teorijaigaradiplomski.azurewebsites.net/api/admin/scoreboard/${group}`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(res => res.json())
                .then(response => {
                    setState({
                        students: response
                    });
                    setLoadingState(false);

                })
                .catch(error => {
                    console.log(error)
                    setLoadingState(false);

                })
        }
    }, [group])


    return (
        loadingState
            ? <Loading />
            : <div className="Scoreboard">
                <h1>Scoreboard</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Mesto</th>
                            <th>Ime i prezime</th>
                            <th>Indeks</th>
                            <th>Broj poena</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state.students.map((student, index) =>
                                <tr key={index + 1}>
                                    <td>{index + 1}.</td>
                                    <td>{student.studentName}</td>
                                    <td>{student.studentID}</td>
                                    <td>{student.pointsTotal}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
    )
}