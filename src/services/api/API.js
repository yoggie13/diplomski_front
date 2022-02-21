import React from 'react';

const url_main = "http://localhost:46824/api/";

export default class API {

    static GET = (url) => {
        return fetch(
            url_main + url,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    static POST = async (url, data) => {
        return fetch(
            url_main + url,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .catch(error => {
                console.log(error);
            })

    }
    static PUT = (url, data) => {
        return fetch(
            url_main + url,
            {
                method: "PUT",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .catch(error => {
                console.log(error);
            })
    }
    static DELETE = (url) => {
        return fetch(
            url_main + url,
            {
                method: "DELETE",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .catch(error => {
                console.log(error);
            })
    }
}
