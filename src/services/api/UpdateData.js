import React from 'react';
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';

export default function UpdateData(data) {

    const [loadingState, setLoadingState] = useState(true);
    const [dataState, setDataState] = useState({ status: 0, data: [], error: "" });
    const API_URL = "https://teorijaigaradiplomski.azurewebsites.net/api";

    useEffect(() => {
        setLoadingState(true)

        fetch(
            `${API_URL}`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data })
            })
            .then(res => {
                setDataState({ ...dataState, status: res.status });
                return res.json();
            })
            .then(response => {
                setDataState({ ...dataState, data: response })
                setLoadingState(false)
            })
            .catch(errorResponse => {
                setDataState({ ...dataState, error: errorResponse.message })
                setLoadingState(false);
            })
    }, []);

    return loadingState ? <Loading /> : dataState;
}