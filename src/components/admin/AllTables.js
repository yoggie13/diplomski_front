import React from 'react'
import { useState, useEffect } from 'react';
import Loading from '../Loading';
import Scoreboard from '../Scoreboard';

export default function AllTables() {
    const [groupState, setGroupState] = useState({ groups: [], counter: 1 });
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        document.title = "Tabele | Teorija igara"
    }, []);

    useEffect(() => {
        setLoadingState(true);
        fetch(
            'https://teorijaigaradiplomski.azurewebsites.net/api/admin/groups',
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                if (res.status === 200)
                    return res.json();
                else
                    throw new Error();
            })
            .then(response => {
                setGroupState({
                    ...groupState,
                    groups: response
                });
                setLoadingState(false)
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            })
    }, [])

    const handleArrowClick = (e, number) => {
        e.preventDefault();
        setGroupState({ ...groupState, counter: groupState.counter + number });
    }
    return (
        JSON.parse(localStorage.getItem("Admin")) === false
            ? <p>Prijavite se sa administratorskim nalogom da biste pristupili ovim opcijama</p>
            : loadingState
                ? <Loading />
                :
                <div className="AllTables">
                    {

                        groupState.groups.length > 0
                            ? <>
                                <Scoreboard admin={true} group={groupState.groups[groupState.counter - 1].id} />
                                <div className="tableMover">
                                    {
                                        groupState.counter > 1
                                            ? <i className="fas fa-chevron-right" id="chevron-left" onClick={e => handleArrowClick(e, -1)}></i>
                                            : null
                                    }
                                    <p>{groupState.counter} od {groupState.groups.length}</p>
                                    {
                                        groupState.counter < groupState.groups.length
                                            ? <i className="fas fa-chevron-right" onClick={e => handleArrowClick(e, 1)}></i>
                                            : null
                                    }
                                </div>
                            </>
                            : null
                    }
                </div>
    )
}
