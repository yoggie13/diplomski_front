import React from 'react';
import { useState } from 'react';

export default function AllGames() {
    const [state, setstate] = useState({ active: false });
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
                        <td id="center">{
                            state.active === true
                                ? <i class="fas fa-check-circle"></i>
                                : <i class="fas fa-times-circle"></i>
                        }
                        </td>
                        <td id="center"><i className="fas fa-chevron-right"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
