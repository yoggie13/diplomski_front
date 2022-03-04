import React from 'react'
import { useState, useEffect } from 'react';
import Loading from '../Loading';
import Scoreboard from '../Scoreboard';
import AdminServices from '../../services/AdminServices';

export default function AllTables() {
    const [groupState, setGroupState] = useState({ groups: [], counter: 1 });
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        document.title = "Tabele | Teorija igara"
    }, []);

    useEffect(() => {
        setLoadingState(true);
        GetGroups();
    }, [])

    const GetGroups = async () => {
        const res = await AdminServices.GetGroups();
        if (res.status === 200) {
            res.json()
                .then(response => {
                    setGroupState({
                        ...groupState,
                        groups: response
                    });
                    setLoadingState(false);
                })
        }
    }

    const handleArrowClick = (e, number) => {
        e.preventDefault();

        var log = groupState.counter + number;

        setGroupState({ ...groupState, counter: log });
    }
    return (
        loadingState
            ? <Loading />
            : <div className="AllTables">
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
