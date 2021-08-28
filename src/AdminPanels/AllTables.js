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
            'https://diplomskiapi20210828140836.azurewebsites.net/api/admin/groups',
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

    const handleArrowClick = (e, number) => {
        e.preventDefault();

        setState({ ...state, counter: state.counter + number });
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
                                {
                                    state.counter > 1
                                        ? <i className="fas fa-chevron-right" id="chevron-left" onClick={e => handleArrowClick(e, -1)}></i>
                                        : null
                                }
                                <p>{state.counter} od {state.groups.length}</p>
                                {
                                    state.counter < state.groups.length
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
