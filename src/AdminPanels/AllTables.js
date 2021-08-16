import React from 'react'
import Scoreboard from '../Scoreboard';
import { useState, useEffect } from 'react';
import Loading from '../Loading';

export default function AllTables() {
    const [state, setState] = useState({ groups: [], counter: 1 });
    const [loadingState, setLoadingState] = useState(true);


    useEffect(() => {
        setLoadingState(true);
        fetch(
            'http://localhost:46824/api/admin/groups',
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
                setState({
                    ...state,
                    groups: response
                });
                setLoadingState(false)
            })
            .catch(error => {
                console.log(error);
                setLoadingState(false);
            })
    }, [])

    const handleNextClick = e => {
        e.preventDefault();

        setState({ ...state, counter: state.counter + 1 });
    }
    return (
        loadingState === true
            ? <Loading />
            :
            <div className="AllTables">
                {
                    state.groups.length > 0
                        ? <>
                            <Scoreboard admin={true} group={state.groups[state.counter - 1].id} />
                            <div className="tableMover">
                                <p>{state.counter} od {state.groups.length}</p>
                                <i className="fas fa-chevron-right" onClick={handleNextClick}></i>
                            </div>
                        </>
                        : null
                }
            </div>
    )
}
