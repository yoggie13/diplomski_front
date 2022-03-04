import React, { useState } from 'react';
import { useEffect } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';

import Loading from '../Loading';
import AdminServices from '../../services/AdminServices';

export default function Dashboard() {

    const [loadingState, setLoadingState] = useState(true);
    const [dataState, setDataState] = useState();

    useEffect(() => {
        document.title = "Dashboard | Teorija igara";
        setLoadingState(true);
        GetData();
    }, []);

    const GetData = async () => {

        const res = await AdminServices.GetDashboard();

        if (res.status === 200) {
            res.json()
                .then(response => {
                    setDataState(response);
                    setLoadingState(false);
                })
        }
        else {
            console.log("error");
            setLoadingState(false);
        }
    }
    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    return (
        <>
            {
                loadingState
                    ? <Loading />
                    : <div>
                        <h1>Dashboard</h1>
                        <h2>Aktivnost u igrama</h2>
                        <div className='Chart'>
                            <CanvasJSChart options={{
                                title: {
                                    text: ""
                                },
                                data: [
                                    {
                                        type: "line",
                                        dataPoints: dataState.gamesPlayed
                                    }
                                ]
                            }} />
                        </div>
                        <div>
                            <h2>
                                Najaktivniji studenti
                            </h2>
                            {
                                dataState.mostActiveStudents.length > 0
                                    ? <table className='ResultsTable'>
                                        <thead>
                                            <tr>
                                                <th>Indeks</th>
                                                <th>Ime</th>
                                                <th>Broj odigranih igara</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataState.mostActiveStudents.map(result =>
                                                    <tr>
                                                        <td>{result.studentID}</td>
                                                        <td>{result.studentName}</td>
                                                        <td>{result.timesPlayed}</td>
                                                    </tr>
                                                )}
                                        </tbody>
                                    </table>
                                    : <p>Niko još nije odigrao ništa</p>
                            }
                        </div>
                        <div>
                            <h2>
                                Studenti sa najviše poena
                            </h2>
                            {
                                dataState.mostPointsStudents.length > 0
                                    ? <table className='ResultsTable'>
                                        <thead>
                                            <tr>
                                                <th>Indeks</th>
                                                <th>Ime</th>
                                                <th>Broj poena</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataState.mostPointsStudents.map(result =>
                                                    <tr>
                                                        <td>{result.studentID}</td>
                                                        <td>{result.studentName}</td>
                                                        <td>{result.points}</td>
                                                    </tr>
                                                )}
                                        </tbody>
                                    </table>
                                    : <p>Niko još nije odigrao ništa</p>
                            }
                        </div>
                    </div>
            }
        </>
    )
}
