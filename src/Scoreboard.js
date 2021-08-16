import React from 'react'
import { useState, useEffect } from 'react'

export default function Scoreboard({ admin = false, group }) {

    const [state, setState] = useState({ students: [], admin: admin })

    useEffect(() => {
        if (state.admin === false) {

            fetch(
                'http://localhost:46824/api/students/scoreboard/',
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:
                        JSON.stringify({
                            Email: "on20170077@student.fon.bg.ac.rs"
                        }
                        )
                })
                .then(res => res.json())
                .then(response => {
                    setState({
                        students: response
                    });
                })
                .catch(error => console.log(error))
        } else if (state.admin === true) {
            fetch(
                `http://localhost:46824/api/admin/scoreboard/${group}`,
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
                })
                .catch(error => console.log(error))
        }
    }, [])


    return (
        <div className="Scoreboard">
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