import React from 'react';

export default function AllGames() {
    return (
        <div className="AllGames">
            <h1>Pregled igara</h1>
            <table>
                <thead>
                    <tr>
                        <th>Naziv igre</th>
                        <th>Broj igrača koji su odigrali</th>
                        <th>Aktivna</th>
                        <th>Više info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dilema zatvorenika</td>
                        <td>2</td>
                        <td>:check:</td>
                        <td><i className="fas fa-chevron-right fa-lg"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
